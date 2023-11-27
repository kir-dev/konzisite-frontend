import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, useToast, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { useCreateRequestMutation, useEditRequestMutation } from '../../api/hooks/requestMutationHooks'
import { useFecthRequestDetailsQuery } from '../../api/hooks/requestQueryHooks'
import { KonziError } from '../../api/model/error.model'
import { PageHeading } from '../../components/commons/PageHeading'
import { getStatusString } from '../../components/editor/editorUtils'
import { MarkdownEditor } from '../../components/editor/MarkdownEditor'
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from '../../util/constants'
import { generateToastParams } from '../../util/generateToastParams'
import { PATHS } from '../../util/paths'
import { LoadingEditConsultation } from '../consultations/components/loading/LoadingEditConsultation'
import { SubjectSelector } from '../consultations/components/selector/SubjectSelector'
import { ErrorPage } from '../error/ErrorPage'
import { RequestDateForm } from './components/RequestDateForm'
import { CreateRequest, CreateRequestForm } from './types/createRequest'

type Props = {
  newRequest?: boolean
}

export const EditRequestPage = ({ newRequest }: Props) => {
  const toast = useToast()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isLoggedIn, loggedInUser, loggedInUserLoading } = useAuthContext()
  const requestId = parseInt(useParams<{ requestId: string }>().requestId ?? '-1')

  const { mutate: createRequest, isLoading: createLoading } = useCreateRequestMutation()
  const { mutate: updateRequest, isLoading: editLoading } = useEditRequestMutation(requestId)

  const { isLoading, data: request, error } = useFecthRequestDetailsQuery(requestId)

  const createRequestFromForm = (formData: CreateRequest) => {
    createRequest(formData, {
      onSuccess: (request) => {
        toast({ title: t('requestEditPage.createdSuccess'), status: 'success' })
        navigate(`${PATHS.REQUESTS}/${request.id}`)
      },
      onError: (e: KonziError) => {
        toast(generateToastParams(e, t))
      }
    })
  }

  const updateRequestFromForm = (formData: CreateRequest) => {
    updateRequest(formData, {
      onSuccess: (request) => {
        toast({ title: t('requestEditPage.createdSuccess'), status: 'success' })
        navigate(`${PATHS.REQUESTS}/${request.id}`)
      },
      onError: (e: KonziError) => {
        toast(generateToastParams(e, t))
      }
    })
  }

  const form = useForm<CreateRequestForm>({
    defaultValues: request
      ? {
          name: request.name,
          descMarkdown: request.descMarkdown,
          expiryDate: new Date(request.expiryDate),
          subject: request.subject
        }
      : { expiryDate: new Date() },
    mode: 'all'
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitted }
  } = form

  const onSubmit = handleSubmit((data) => {
    const formData = {
      name: data.name,
      descMarkdown: data.descMarkdown,
      expiryDate: data.expiryDate,
      subjectId: data.subject.id
    }
    newRequest ? createRequestFromForm(formData) : updateRequestFromForm(formData)
  })

  useEffect(() => {
    if (request && !watch('name')) {
      setValue('name', request.name)
      setValue('descMarkdown', request.descMarkdown)
      setValue('subject', request.subject)
      setValue('expiryDate', new Date(request.expiryDate))
    }
  }, [request])

  if (error) {
    return <ErrorPage status={error.statusCode} title={error.message} />
  }

  if (isLoading || loggedInUserLoading) {
    return <LoadingEditConsultation />
  }

  if (!loggedInUser || !isLoggedIn) {
    return <ErrorPage status={401} />
  }

  return (
    <>
      {(!request || !(loggedInUser.isAdmin || request.initializer.id === loggedInUser.id)) && !newRequest ? (
        <ErrorPage status={403} title={t('requestEditPage.noAccess')} messages={[t('requestEditPage.onlyAuthor')]} />
      ) : (
        <>
          <Helmet
            title={
              newRequest
                ? t('requestEditPage.newRequest')
                : t('requestEditPage.editRequest', { name: request?.name ?? t('requestEditPage.untitledRequest') })
            }
          />
          <PageHeading
            title={newRequest ? t('requestEditPage.createNewRequest') : `${request?.name ?? 'Névtelen konzi kérés'} szerkesztése`}
          />
          <VStack>
            <FormControl isInvalid={!!errors.name} isRequired>
              <FormLabel>{t('requestEditPage.title')}</FormLabel>
              <Input
                type="text"
                {...register('name', {
                  required: { value: true, message: t('requestEditPage.titleNotEmpty') },
                  maxLength: {
                    value: MAX_TITLE_LENGTH,
                    message: t('requestEditPage.titleTooLong') + getStatusString(watch('name'), MAX_TITLE_LENGTH)
                  }
                })}
                placeholder={t('requestEditPage.titlePlaceholder')}
              />
              {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
            </FormControl>
            <FormProvider {...form}>
              <SubjectSelector />
              <RequestDateForm />
              <FormControl>
                <FormLabel>{t('requestEditPage.desc')}</FormLabel>
                <MarkdownEditor
                  formDetails={{
                    id: 'descMarkdown',
                    promptText: '',
                    maxChar: MAX_DESCRIPTION_LENGTH
                  }}
                  textAreaHeight="8rem"
                  previewHeight="12rem"
                />
              </FormControl>
            </FormProvider>
          </VStack>
          <Flex mt={1} justify="space-between">
            <Button leftIcon={<FaArrowLeft />} as={Link} to={newRequest ? PATHS.REQUESTS : `${PATHS.REQUESTS}/${requestId}`}>
              {t('requestEditPage.back')}
            </Button>
            <Button
              isLoading={createLoading || editLoading}
              colorScheme="brand"
              onClick={() => {
                onSubmit()
              }}
              isDisabled={!isValid && isSubmitted}
            >
              {newRequest ? t('requestEditPage.create') : t('requestEditPage.save')}
            </Button>
          </Flex>
        </>
      )}
    </>
  )
}
