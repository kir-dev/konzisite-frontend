import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, useToast, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { useCreateConsultationMutation, useEditConsultationMutation } from '../../api/hooks/consultationMutationHooks'
import { useFetchConsultationbDetailsQuery } from '../../api/hooks/consultationQueryHooks'
import { KonziError } from '../../api/model/error.model'
import { RemarkEditor } from '../../components/editor/RemarkEditor'
import { Helmet } from 'react-helmet-async'
import { GroupModel } from '../../api/model/group.model'
import { SubjectModel } from '../../api/model/subject.model'
import { generateToastParams } from '../../util/generateToastParams'
import { ErrorPage } from '../error/ErrorPage'
import { ConsultationDateForm } from './components/ConsultationDateForm'
import { LoadingEditConsultation } from './components/LoadingEditConsultation'
import { PresentersSelector } from './components/PresentersSelector'
import { SubjectSelector } from './components/SubjectSelector'
import { TargetGroupSelector } from './components/TargetGroupSelector'
import { CreateConsultation, CreateConsultationForm } from './types/createConsultation'

type Props = {
  newConsultation?: boolean
}

export const EditConsultationPage = ({ newConsultation }: Props) => {
  const toast = useToast()
  const navigate = useNavigate()
  const { loggedInUser, loggedInUserLoading } = useAuthContext()
  const consultationId = parseInt(useParams<{ consultationId: string }>().consultationId ?? '-1')

  const { mutate: createConsultation } = useCreateConsultationMutation()
  const { mutate: updateConsultation } = useEditConsultationMutation(consultationId)

  const { isLoading, data: consultation, error } = useFetchConsultationbDetailsQuery(consultationId)

  const createCons = (formData: CreateConsultation) => {
    createConsultation(formData, {
      onSuccess: (consultation) => {
        toast({ title: 'Konzultáció sikeresen létrehozva!', status: 'success' })
        navigate(`/consultations/${consultation.id}`)
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
        navigate(`/consultations/${consultation.id}`)
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
          targetGroups: consultation.targetGroups
        }
      : { targetGroups: [], presenters: [] },
    mode: 'all'
  })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid }
  } = form

  const onSubmit = handleSubmit((data) => {
    const formData = {
      name: data.name,
      location: data.location,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      descMarkdown: data.descMarkdown,
      subjectId: data.subject.id,
      presenterIds: data.presenters.map((p) => p.id),
      targetGroupIds: data.targetGroups.map((g) => g.id)
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
    }
  }, [consultation])

  if (consultationId != -1 && error) {
    return <ErrorPage backPath={'/'} status={error.statusCode} title={error.message} />
  }

  if (isLoading || loggedInUserLoading) {
    return <LoadingEditConsultation />
  }

  if (loggedInUser === undefined) {
    return <ErrorPage status={401} />
  }

  return (
    <>
      {(consultation === undefined ||
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
          <Heading size="xl" textAlign="center" mb={3}>
            {newConsultation ? 'Új konzultáció létrehozása' : `${consultation?.name ?? 'Névtelen konzi'} szerkesztése`}
          </Heading>
          <VStack>
            <FormControl isInvalid={!!errors.name} isRequired>
              <FormLabel>Konzultáció neve</FormLabel>
              <Input type="text" {...register('name', { required: true })} placeholder="Digit vizsgára készülés" />
              {errors.name && <FormErrorMessage>Név nem lehet üres</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.location} isRequired>
              <FormLabel>Helyszín</FormLabel>
              <Input type="text" {...register('location', { required: true })} placeholder="SCH-1317" width="30%" minWidth="150px" />
              {errors.location && <FormErrorMessage>Helyszín nem lehet üres</FormErrorMessage>}
            </FormControl>
            <FormProvider {...form}>
              <SubjectSelector />
            </FormProvider>
            <FormProvider {...form}>
              <PresentersSelector />
            </FormProvider>
            <FormProvider {...form}>
              <ConsultationDateForm />
            </FormProvider>
            <FormControl>
              <FormLabel>Leírás</FormLabel>
              <FormProvider {...form}>
                <RemarkEditor
                  formDetails={{
                    id: 'descMarkdown',
                    promptText: '',
                    maxChar: 500
                  }}
                  textAreaHeight="8rem"
                  previewHeight="12rem"
                />
              </FormProvider>
            </FormControl>
            <FormProvider {...form}>
              <TargetGroupSelector />
            </FormProvider>
          </VStack>
          <Button
            mt={3}
            colorScheme="brand"
            onClick={() => {
              onSubmit()
            }}
            //isDisabled={!isValid}
          >
            {newConsultation ? 'Létrehozás' : 'Mentés'}
          </Button>
        </>
      )}
    </>
  )
}
