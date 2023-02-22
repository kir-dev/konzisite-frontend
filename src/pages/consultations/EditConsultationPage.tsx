import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, useToast, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { FormProvider, useForm } from 'react-hook-form'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { useCreateConsultationMutation, useEditConsultationMutation } from '../../api/hooks/consultationMutationHooks'
import { useFetchConsultationbDetailsQuery } from '../../api/hooks/consultationQueryHooks'
import { KonziError } from '../../api/model/error.model'
import { PageHeading } from '../../components/commons/PageHeading'
import { MarkdownEditor } from '../../components/editor/MarkdownEditor'
import { generateToastParams } from '../../util/generateToastParams'
import { PATHS } from '../../util/paths'
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
  const { isLoggedIn, loggedInUser, loggedInUserLoading } = useAuthContext()
  const consultationId = parseInt(useParams<{ consultationId: string }>().consultationId ?? '-1')

  const { mutate: createConsultation, isLoading: createLoading } = useCreateConsultationMutation()
  const { mutate: updateConsultation, isLoading: editLoading } = useEditConsultationMutation(consultationId)

  const { isLoading, data: consultation, error } = useFetchConsultationbDetailsQuery(consultationId)

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
          targetGroups: consultation.targetGroups
        }
      : { targetGroups: [], presenters: [], startDate: new Date(), endDate: new Date() },
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
              <PresentersSelector />
              <ConsultationDateForm prevStartDate={consultation && new Date(consultation.startDate)} />
              <TargetGroupSelector />
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
            <Button
              leftIcon={<FaArrowLeft />}
              as={Link}
              to={newConsultation ? PATHS.CONSULTATIONS : `${PATHS.CONSULTATIONS}/${consultationId}`}
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
