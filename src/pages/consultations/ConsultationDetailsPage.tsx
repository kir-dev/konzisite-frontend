import { Box, Button, Heading, HStack, Stack, Text, useToast, VStack } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { Helmet } from 'react-helmet-async'
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import {
  useDeleteConsultationMutation,
  useJoinConsultationMutation,
  useLeaveConsultationMutation
} from '../../api/hooks/consultationMutationHooks'
import { useFecthConsultationbDetailsQuery } from '../../api/hooks/consultationQueryHooks'
import { KonziError } from '../../api/model/error.model'
import { ConfirmDialogButton } from '../../components/commons/ConfirmDialogButton'
import { generateToastParams } from '../../util/generateToastParams'
import { ErrorPage } from '../error/ErrorPage'
import { LoadingConsultation } from './components/LoadingConsultation'
import { TargetGroupList } from './components/TargetGroupList'
import { UserList } from './components/UserList'

export const ConsultationDetailsPage = () => {
  const { consultationId } = useParams()
  const { loggedInUser } = useAuthContext()
  const { isLoading, data: consultation, error, refetch } = useFecthConsultationbDetailsQuery(+consultationId!!)

  const toast = useToast()
  const navigate = useNavigate()

  const onErrorFn = (e: KonziError) => {
    toast(generateToastParams(e))
  }

  const { mutate: joinConsultation } = useJoinConsultationMutation(() => {
    toast({ title: 'Csatlakoztál a konzultációhoz!', status: 'success' })
    refetch()
  }, onErrorFn)
  const { mutate: leaveConsultation } = useLeaveConsultationMutation(onErrorFn)

  const deleteConsultationMutation = useDeleteConsultationMutation(() => {
    toast({ title: 'Törölted a konzultációt!', status: 'success' })
    navigate('/consultations')
  }, onErrorFn)

  const deleteConsultation = () => {
    deleteConsultationMutation.mutate(+consultationId!!)
  }

  if (error) {
    return <ErrorPage backPath={'/'} status={error.statusCode} title={error.message} />
  }

  return (
    <>
      {consultation === undefined ? (
        isLoading ? (
          <LoadingConsultation />
        ) : (
          <ErrorPage title="Nincs ilyen konzultáció" messages={['A konzultáció amit keresel már nem létezik, vagy nem is létezett']} />
        )
      ) : (
        <>
          <Helmet title={consultation.name} />
          <Heading textAlign="center" mb={3}>
            {consultation.name}
          </Heading>
          <Heading size="md" as={Link} to={`/subjects/${consultation.subject.id}`} justifyContent="center" textAlign="center" mb={3}>
            {consultation.subject.name} ({consultation.subject.code})
          </Heading>
          <Stack direction={['column-reverse', 'row']} justifyContent="space-between" mb={3}>
            <VStack alignItems="flex-start" spacing={3} flexGrow={1}>
              <HStack>
                <FaMapMarkerAlt />
                <Text> {consultation.location} </Text>
              </HStack>
              <HStack>
                <FaClock />
                <Text>
                  {new Date(consultation.startDate).toLocaleString('hu-HU', { timeStyle: 'short', dateStyle: 'short' })} -{' '}
                  {new Date(consultation.endDate).toLocaleTimeString('hu-HU', { timeStyle: 'short' })}
                </Text>
              </HStack>
            </VStack>

            <VStack justify={['center', 'flex-end']} align="flex-end">
              {(consultation.owner.id === loggedInUser!!.id || loggedInUser!!.isAdmin) && (
                <Button width="100%" as={Link} to={`/consultations/${consultation.id}/edit`} colorScheme="brand">
                  Szerkesztés
                </Button>
              )}
              {(consultation.owner.id === loggedInUser!!.id || loggedInUser!!.isAdmin) && (
                <>
                  <ConfirmDialogButton
                    buttonColorSchene="red"
                    buttonText="Törlés"
                    buttonWidth="100%"
                    headerText="Konzultáció törlése"
                    bodyText="Biztos törölni szeretnéd a konzultációt?"
                    confirmButtonText="Törlés"
                    confirmAction={deleteConsultation}
                  />
                </>
              )}
              {consultation.participants.some((p) => p.id === loggedInUser!!.id) && (
                <Button
                  onClick={() => {
                    leaveConsultation(+consultationId!!, {
                      onSuccess: () => {
                        toast({ title: 'Kiléptél a konzultációból!', status: 'success' })
                        refetch()
                      }
                    })
                  }}
                  colorScheme="red"
                >
                  Mégsem megyek
                </Button>
              )}
              {!consultation.presentations.some((p) => p.id === loggedInUser!!.id) &&
                !consultation.participants.some((p) => p.id === loggedInUser!!.id) && (
                  <>
                    <Button
                      onClick={() => {
                        joinConsultation(+consultationId!!)
                      }}
                      colorScheme="brand"
                    >
                      Megyek
                    </Button>
                  </>
                )}
            </VStack>
          </Stack>
          {consultation.descMarkdown && (
            <Box shadow="md" borderRadius={8} borderWidth={1} p={4} width="100%" mb={2}>
              <ReactMarkdown components={ChakraUIRenderer()} children={consultation.descMarkdown} skipHtml />
            </Box>
          )}
          <Heading size="lg" mb={2}>
            Konzitartók ({consultation.presentations.length})
          </Heading>
          <UserList
            columns={1}
            presentations={consultation.presentations}
            showRatingButton={new Date(consultation.endDate).getTime() < new Date().getTime()}
          />
          <TargetGroupList groups={consultation.targetGroups} />
          <Heading size="lg" mt={2} mb={2}>
            Résztvevők ({consultation.participants.length})
          </Heading>
          <UserList columns={2} presentations={consultation.participants} showRating={false} />
        </>
      )}
    </>
  )
}
