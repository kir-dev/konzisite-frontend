import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, useToast, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { FormProvider, useForm } from 'react-hook-form'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { useCreateRequestMutation, useEditRequestMutation } from '../../api/hooks/requestMutationHooks'
import { useFecthRequestDetailsQuery } from '../../api/hooks/requestQueryHooks'
import { KonziError } from '../../api/model/error.model'
import { PageHeading } from '../../components/commons/PageHeading'
import { MarkdownEditor } from '../../components/editor/MarkdownEditor'
import { generateToastParams } from '../../util/generateToastParams'
import { PATHS } from '../../util/paths'
import { LoadingEditConsultation } from '../consultations/components/LoadingEditConsultation'
import { SubjectSelector } from '../consultations/components/SubjectSelector'
import { ErrorPage } from '../error/ErrorPage'
import { RequestDateForm } from './components/RequestDateForm'
import { CreateRequest, CreateRequestForm } from './types/createRequest'

type Props = {
  newRequest?: boolean
}

export const EditRequestPage = ({ newRequest }: Props) => {
  const toast = useToast()
  const navigate = useNavigate()
  const { isLoggedIn, loggedInUser, loggedInUserLoading } = useAuthContext()
  const requestId = parseInt(useParams<{ requestId: string }>().requestId ?? '-1')

  const { mutate: createRequest, isLoading: createLoading } = useCreateRequestMutation()
  const { mutate: updateRequest, isLoading: editLoading } = useEditRequestMutation(requestId)

  const { isLoading, data: request, error } = useFecthRequestDetailsQuery(requestId)

  const createRequestFromForm = (formData: CreateRequest) => {
    createRequest(formData, {
      onSuccess: (request) => {
        toast({ title: 'Konzi kérés sikeresen létrehozva!', status: 'success' })
        navigate(`${PATHS.REQUESTS}/${request.id}`)
      },
      onError: (e: KonziError) => {
        toast(generateToastParams(e))
      }
    })
  }

  const updateRequestFromForm = (formData: CreateRequest) => {
    updateRequest(formData, {
      onSuccess: (request) => {
        toast({ title: 'Konzi kérés sikeresen módosítva!', status: 'success' })
        navigate(`${PATHS.REQUESTS}/${request.id}`)
      },
      onError: (e: KonziError) => {
        toast(generateToastParams(e))
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
        <ErrorPage status={403} title="Nincs jogod" messages={['A konzi kérést csak a kezdeményezője szerkesztheti']} />
      ) : (
        <>
          <Helmet title={newRequest ? 'Új konzi kérés' : `${request?.name ?? 'Névtelen konzi kérés'} szerkesztése`} />
          <PageHeading title={newRequest ? 'Új konzi kérés létrehozása' : `${request?.name ?? 'Névtelen konzi kérés'} szerkesztése`} />
          <VStack>
            <FormControl isInvalid={!!errors.name} isRequired>
              <FormLabel>Konzi kérés neve</FormLabel>
              <Input type="text" {...register('name', { required: true })} placeholder="Digit vizsga segítség" />
              {errors.name && <FormErrorMessage>Név nem lehet üres</FormErrorMessage>}
            </FormControl>
            <FormProvider {...form}>
              <SubjectSelector />
              <RequestDateForm />
              <FormControl>
                <FormLabel>Leírás</FormLabel>
                <MarkdownEditor
                  formDetails={{
                    id: 'descMarkdown',
                    promptText: '',
                    maxChar: 5000
                  }}
                  textAreaHeight="8rem"
                  previewHeight="12rem"
                />
              </FormControl>
            </FormProvider>
          </VStack>
          <Flex mt={1} justify="space-between">
            <Button leftIcon={<FaArrowLeft />} as={Link} to={newRequest ? PATHS.REQUESTS : `${PATHS.REQUESTS}/${requestId}`}>
              Vissza
            </Button>
            <Button
              isLoading={createLoading || editLoading}
              colorScheme="brand"
              onClick={() => {
                onSubmit()
              }}
              isDisabled={!isValid && isSubmitted}
            >
              {newRequest ? 'Létrehozás' : 'Mentés'}
            </Button>
          </Flex>
        </>
      )}
    </>
  )
}
