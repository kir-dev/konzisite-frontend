import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Textarea, useToast, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCreateConsultationMutation } from '../../api/hooks/consultationMutationHooks'
import { KonziError } from '../../api/model/error.model'
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
import { currentUser, testConsultationDetails } from './demoData'
import { ConsultationDetails, Presentation } from './types/consultationDetails'

type Props = {
  newConsultation?: boolean
}

export const EditConsultationPage = ({ newConsultation }: Props) => {
  const toast = useToast()
  const navigate = useNavigate()
  const mutation = useCreateConsultationMutation()

  const submit = () => {
    mutation.mutate(
      {
        name,
        location,
        startDate,
        endDate,
        descMarkdown: description,
        subjectId: subject!!.id,
        presenterIds: presentations.map((p) => p.id),
        targetGroupIds: targetGroups.map((g) => g.id)
      },
      {
        onSuccess: () => {
          toast({ title: 'Konzultáció sikeresen létrehozva', status: 'success' })
          navigate('/consultations')
        },
        onError: (e: KonziError) => {
          toast(generateToastParams(e))
        }
      }
    )
  }

  const [loading, setLoading] = useState(!newConsultation)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState<string | undefined>('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [subject, setSubject] = useState<SubjectModel | undefined>(undefined)
  const [presentations, setPresentations] = useState<Presentation[]>([])
  const [targetGroups, setTargetGroups] = useState<GroupModel[]>([])
  const [consultation, setConsultation] = useState<ConsultationDetails | undefined>(undefined)
  const consultationId = parseInt(useParams<{ consultationId: string }>().consultationId ?? '-1')

  let nameError = name == ''
  let locationError = location == ''
  let startDateError = newConsultation
    ? startDate.getTime() <= new Date().getTime()
    : startDate.getTime() < Math.min(consultation?.startDate?.getTime() ?? 0, new Date().getTime())
  let endDateError = endDate.getTime() <= startDate.getTime()
  let subjectError = subject == undefined
  let presentationsError = presentations.length == 0

  const errorCount = [nameError, locationError, startDateError || endDateError, subjectError, presentationsError].filter((e) => e).length

  if (errorCount > 2) {
    nameError = false
    locationError = false
    startDateError = false
    endDateError = false
    subjectError = false
    presentationsError = false
  }

  useEffect(() => {
    setTimeout(() => {
      const c = testConsultationDetails.find((c) => c.id === consultationId)
      if (!c) {
        setLoading(false)
        setConsultation(undefined)
        return
      }
      setConsultation(c)
      setName(c.name)
      setLocation(c.location)
      setDescription(c.descMarkdown)
      setStartDate(c.startDate)
      setEndDate(c.endDate)
      setSubject(c.subject)
      setPresentations(c.presentations)
      setTargetGroups(c.targetGroups)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) return <LoadingEditConsultation />
  else
    return (
      <>
        {(consultation === undefined || consultation.owner.id !== currentUser.id) && !newConsultation ? (
          consultation === undefined ? (
            <ErrorPage title="Nincs ilyen konzultáció" messages={['A konzi amit keresel már nem létezik, vagy nem is létezett']} />
          ) : (
            <ErrorPage title="Nincs jogod" messages={['A konzit csak a tulajdonosa szerkesztheti']} />
          )
        ) : (
          <>
            <Helmet title={newConsultation ? 'Új konzultáció' : consultation?.name} />
            <Heading size="xl" textAlign="center" mb={3}>
              {newConsultation ? 'Új konzultáció létrehozása' : `${consultation?.name ?? 'Névtelen konzi'} szerkesztése`}
            </Heading>
            <VStack>
              <FormControl isInvalid={nameError} isRequired>
                <FormLabel>Konzultáció neve</FormLabel>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Digit vizsgára készülés" />
                <FormErrorMessage>Név nem lehet üres</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={locationError} isRequired>
                <FormLabel>Helyszín</FormLabel>
                <Input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="SCH-1317"
                  width="30%"
                  minWidth="150px"
                />
                <FormErrorMessage>Helyszín nem lehet üres</FormErrorMessage>
              </FormControl>
              <SubjectSelector subjectError={subjectError} subject={subject} setSubject={setSubject} />
              <PresentersSelector
                presentations={presentations}
                setPresentations={setPresentations}
                presentationsError={presentationsError}
              />
              <ConsultationDateForm
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                startDateError={startDateError}
                endDateError={endDateError}
              />
              <FormControl>
                <FormLabel>Leírás (markdown)</FormLabel>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
              </FormControl>
              <TargetGroupSelector targetGroups={targetGroups} setTargetGroups={setTargetGroups} />
            </VStack>
            <Button mt={3} colorScheme="brand" onClick={submit} isDisabled={errorCount !== 0}>
              {newConsultation ? 'Létrehozás' : 'Mentés'}
            </Button>
          </>
        )}
      </>
    )
}
