import { Box, Button, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { Helmet } from 'react-helmet-async'
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'
import { useFecthConsultationbDetailsQuery } from '../../api/hooks/consultationQueryHooks'
import { ErrorPage } from '../error/ErrorPage'
import { LoadingConsultation } from './components/LoadingConsultation'
import { TargetGroupList } from './components/TargetGroupList'
import { UserList } from './components/UserList'
import { currentUser } from './demoData'

export const ConsultationDetailsPage = () => {
  const { consultationId } = useParams()
  const { isLoading, data: consultation, error, refetch } = useFecthConsultationbDetailsQuery(+consultationId!!)

  if (error) {
    return <ErrorPage backPath={'/'} status={error.statusCode} title={error.error} messages={[error.message]}></ErrorPage>
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
          <Heading size="md" as={Link} to={`/subjects/${consultation.subject.id}`} textAlign="center" mb={3}>
            {consultation.subject.name} ({consultation.subject.code})
          </Heading>
          <Stack direction={['column', 'row']} justifyContent="space-between" mb={3}>
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
            {consultation.owner.id === currentUser.id ? (
              <Button as={Link} to={`/consultations/${consultation.id}/edit`} colorScheme="brand">
                Szerkesztés
              </Button>
            ) : consultation.participants.some((p) => p.id === currentUser.id) ? (
              <Button colorScheme="red">Mégsem megyek</Button>
            ) : (
              <Button colorScheme="brand">Megyek</Button>
            )}
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
