import { Box, Button, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { useEffect, useState } from 'react'
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'
import { ErrorPage } from '../error/ErrorPage'
import { LoadingConsultation } from './components/LoadingConsultation'
import { TargetGroupList } from './components/TargetGroupList'
import { UserList } from './components/UserList'
import { currentUser, testConsultationDetails } from './demoData'
import { ConsultationDetails } from './types/consultationDetails'

export const ConsultationDetailsPage = () => {
  const [loading, setLoading] = useState(true)
  const consultationId = parseInt(useParams<{ consultationId: string }>().consultationId ?? '-1')
  const [consultation, setConsultation] = useState<ConsultationDetails>()

  useEffect(() => {
    //setConsultations(axios.get<ConsultationFullDetails>("/consultations/id"))
    setTimeout(() => {
      setConsultation(testConsultationDetails.find((g) => g.id === consultationId))
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      {consultation === undefined ? (
        loading ? (
          <LoadingConsultation />
        ) : (
          <ErrorPage title="Nincs ilyen konzultáció" messages={['A konzultáció amit keresel már nem létezik, vagy nem is létezett']} />
        )
      ) : (
        <>
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
                  {consultation.startDate.toLocaleString('hu-HU', { timeStyle: 'short', dateStyle: 'short' })} -{' '}
                  {consultation.endDate.toLocaleTimeString('hu-HU', { timeStyle: 'short' })}
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
          {consultation.descMarkdown !== '' && (
            <Box shadow="md" borderRadius={8} borderWidth={1} p={4} width="100%" mb={2}>
              <ReactMarkdown components={ChakraUIRenderer()} children={consultation.descMarkdown} skipHtml />
            </Box>
          )}
          <Heading size="lg" mb={2}>
            Konzitartók ({consultation.presentations.length})
          </Heading>
          <UserList presentations={consultation.presentations} />
          <TargetGroupList groups={consultation.targetGroups} />
          <Heading size="lg" mt={2} mb={2}>
            Résztvevők ({consultation.participants.length})
          </Heading>
          <UserList presentations={consultation.participants} showRating={false} />
        </>
      )}
    </>
  )
}
