import { Button, Checkbox, Flex, FormControl, FormErrorMessage, FormLabel, Input, Text, useToast, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { FormProvider, useForm } from 'react-hook-form'
import { FaArrowLeft } from 'react-icons/fa'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { useCreateConsultationMutation, useEditConsultationMutation } from '../../api/hooks/consultationMutationHooks'
import { useFetchConsultationbDetailsQuery } from '../../api/hooks/consultationQueryHooks'
import { KonziError } from '../../api/model/error.model'
import { PageHeading } from '../../components/commons/PageHeading'
import { getStatusString } from '../../components/editor/editorUtils'
import { MarkdownEditor } from '../../components/editor/MarkdownEditor'
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from '../../util/constants'
import { generateToastParams } from '../../util/generateToastParams'
import { PATHS } from '../../util/paths'
import { ErrorPage } from '../error/ErrorPage'
import { GroupPreview } from '../groups/types/groupPreview'
import { RequestPreview } from '../requests/types/requestPreview'
import { ConsultationDateForm } from './components/ConsultationDateForm'
import { LoadingEditConsultation } from './components/LoadingEditConsultation'
import { PresentersSelector } from './components/selector/PresentersSelector'
import { RequestSelector } from './components/selector/RequestSelector'
import { SubjectSelector } from './components/selector/SubjectSelector'
import { TargetGroupSelector } from './components/selector/TargetGroupSelector'
import { CreateConsultation, CreateConsultationForm } from './types/createConsultation'

type Props = {
  newConsultation?: boolean
}

type ConsultationFormState = {
  request?: RequestPreview
  group?: GroupPreview
}

export const EditConsultationPage = ({ newConsultation }: Props) => {
  const { state, key } = useLocation()
  const { request, group } = (state as ConsultationFormState) || {}
  const toast = useToast()
  const navigate = useNavigate()
  const consultationId = parseInt(useParams<{ consultationId: string }>().consultationId ?? '-1')
  const { isLoading, data: consultation, error } = useFetchConsultationbDetailsQuery(consultationId)
  const { isLoggedIn, loggedInUser, loggedInUserLoading } = useAuthContext()

  const { mutate: createConsultation, isLoading: createLoading } = useCreateConsultationMutation()
  const { mutate: updateConsultation, isLoading: editLoading } = useEditConsultationMutation(consultationId)

  const createCons = (formData: CreateConsultation) => {
    createConsultation(formData, {
      onSuccess: (consultation) => {
        toast({ title: 'Konzultáció sikeresen létrehozva!', status: 'success' })
        navigate(`${PATHS.CONSULTATIONS}/${consultation.id}`)
      },
      onError: (e: KonziError) => {
        toast(generateToastParams(e))
      }
    })
  }

  const editCons = (formData: CreateConsultation) => {
    updateConsultation(formData, {
      onSuccess: (consultation) => {
        toast({ title: 'Konzultáció sikeresen módosítva!', status: 'success' })
        navigate(`${PATHS.CONSULTATIONS}/${consultation.id}`)
      },
      onError: (e: KonziError) => {
        toast(generateToastParams(e))
      }
    })
  }

  const form = useForm<CreateConsultationForm>({
    defaultValues: consultation
      ? {
          name: consultation.name,
          location: consultation.location,
          descMarkdown: consultation.descMarkdown,
          startDate: new Date(consultation.startDate),
          endDate: new Date(consultation.endDate),
          subject: consultation.subject,
          presenters: consultation.presentations,
          targetGroups: consultation.targetGroups,
          request: consultation.request ? { ...consultation.request, subject: consultation.subject } : undefined,
          fulfillRequest: !!consultation?.request
        }
      : { targetGroups: [], presenters: [], startDate: new Date(), endDate: new Date(), fulfillRequest: !!request },
    mode: 'all'
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    resetField,
    formState: { errors, isValid, isSubmitted }
  } = form

  const onSubmit = handleSubmit((data) => {
    const formData: CreateConsultation = {
      name: data.name,
      location: data.location,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      descMarkdown: data.descMarkdown,
      subjectId: data.subject.id,
      presenterIds: data.presenters.map((p) => p.id),
      targetGroupIds: data.targetGroups.map((g) => g.id),
      requestId: data.fulfillRequest ? data.request?.id : null
    }
    newConsultation ? createCons(formData) : editCons(formData)
  })

  useEffect(() => {
    if (consultation && !watch('name')) {
      setValue('name', consultation.name)
      setValue('location', consultation.location)
      setValue('descMarkdown', consultation.descMarkdown)
      setValue('presenters', consultation.presentations)
      setValue('subject', consultation.subject)
      setValue('targetGroups', consultation.targetGroups)
      setValue('startDate', new Date(consultation.startDate))
      setValue('endDate', new Date(consultation.endDate))
      setValue('request', consultation.request ? { ...consultation.request, subject: consultation.subject } : undefined)
      setValue('fulfillRequest', !!consultation.request)
    }
  }, [consultation])

  useEffect(() => {
    if (group) {
      setValue('targetGroups', [group])
    }
    if (request) {
      setValue('subject', request.subject)
      setValue('request', request)
    }
  }, [])

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
      {(!consultation ||
        !(
          loggedInUser.isAdmin ||
          consultation.owner.id === loggedInUser.id ||
          consultation.presentations.some((p) => p.id === loggedInUser.id)
        )) &&
      !newConsultation ? (
        <ErrorPage status={403} title="Nincs jogod" messages={['A konzit csak a tulajdonosa szerkesztheti']} />
      ) : (
        <>
          <Helmet title={newConsultation ? 'Új konzultáció' : `${consultation?.name ?? 'Névtelen konzi'} szerkesztése`} />
          <PageHeading title={newConsultation ? 'Új konzultáció létrehozása' : `${consultation?.name ?? 'Névtelen konzi'} szerkesztése`} />
          <VStack alignItems="flex-start">
            <FormControl isInvalid={!!errors.name} isRequired>
              <FormLabel>Konzultáció neve</FormLabel>
              <Input
                type="text"
                {...register('name', {
                  required: { value: true, message: 'Név nem lehet üres!' },
                  maxLength: {
                    value: MAX_TITLE_LENGTH,
                    message: 'Név túl hosszú! ' + getStatusString(watch('name'), MAX_TITLE_LENGTH)
                  }
                })}
                placeholder="Digit vizsgára készülés"
              />
              {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.location} isRequired>
              <FormLabel>Helyszín</FormLabel>
              <Input
                type="text"
                {...register('location', {
                  required: { value: true, message: 'Helyszín nem lehet üres!' },
                  maxLength: {
                    value: MAX_TITLE_LENGTH,
                    message: 'Helyszín túl hosszú! ' + getStatusString(watch('location'), MAX_TITLE_LENGTH)
                  }
                })}
                placeholder="SCH-1317"
                width="30%"
                minWidth="150px"
              />
              {errors.location && <FormErrorMessage>{errors.location.message}</FormErrorMessage>}
            </FormControl>
            <Checkbox hidden {...register('fulfillRequest')} />
            <Checkbox
              colorScheme="brand"
              onChange={(e) => {
                setValue('fulfillRequest', e.target.checked)
                setValue('request', undefined, { shouldValidate: true })
                resetField('subject')
                setValue('subject', watch('subject'), { shouldValidate: true })
              }}
            >
              Kérés teljesítése
            </Checkbox>
            <Text textAlign="justify">
              Amennyiben valakinek a konzi kérését valósítod meg, pipáld be a fenti dobozt, majd válaszd ki a kérést. Így értesítést fognak
              kapni azok a felhasználók, akik támogatták a kérést. Konzi kérés kiválasztása meghatározza a konzi tárgyát is.
            </Text>
            <FormProvider {...form}>
              {watch('fulfillRequest') ? <RequestSelector /> : <SubjectSelector />}
              <PresentersSelector />
              <ConsultationDateForm prevStartDate={consultation && new Date(consultation.startDate)} />
              <TargetGroupSelector />
              <FormControl>
                <FormLabel>Leírás</FormLabel>
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
            <Button
              leftIcon={<FaArrowLeft />}
              onClick={() => {
                if (key !== 'default') {
                  navigate(-1)
                } else {
                  navigate(PATHS.CONSULTATIONS)
                }
              }}
            >
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
              {newConsultation ? 'Létrehozás' : 'Mentés'}
            </Button>
          </Flex>
        </>
      )}
    </>
  )
}
