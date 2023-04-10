import { Badge, Box, Button, Heading, HStack, Stack, Text, useToast, VStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { FaClock } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { useSupportRequestMutation, useUnsupportRequestMutation } from '../../api/hooks/requestMutationHooks'
import { useFecthRequestDetailsQuery } from '../../api/hooks/requestQueryHooks'
import { KonziError } from '../../api/model/error.model'
import { ConsultationListItem } from '../../components/commons/ConsultationListItem'
import Markdown from '../../components/commons/Markdown'
import { PageHeading } from '../../components/commons/PageHeading'
import { generateToastParams } from '../../util/generateToastParams'
import { PATHS } from '../../util/paths'
import { UserList } from '../consultations/components/UserList'
import { ErrorPage } from '../error/ErrorPage'
import { LoadingRequestDetails } from './components/LoadingRequestDetails'
import { RequestActions } from './components/RequestActions'

export const RequestDetailsPage = () => {
  const { requestId } = useParams()
  const { loggedInUser, loggedInUserLoading } = useAuthContext()
  const toast = useToast()

  const { isLoading, data: request, error, refetch } = useFecthRequestDetailsQuery(+requestId!!)

  const onError = (e: KonziError) => {
    toast(generateToastParams(e))
  }

  const generateOnSuccess = (message: string) => () => {
    toast({ title: message, status: 'success' })
    refetch()
  }

  const { mutate: supportRequest } = useSupportRequestMutation(generateOnSuccess('Támogatod a kérést!'), onError)
  const { mutate: unsupportRequest } = useUnsupportRequestMutation(generateOnSuccess('Már nem támogatod a kérést!'), onError)

  if (error) {
    return <ErrorPage status={error.statusCode} title={error.message} />
  }

  if (isLoading || loggedInUserLoading) {
    return <LoadingRequestDetails />
  }

  if (!request) {
    return (
      <ErrorPage
        title="Nem található a konzi kérés"
        status={404}
        messages={['A konzi kérés amit keresel nem létezik, vagy nincs jogosultságod megtekinteni.']}
      />
    )
  }

  if (!loggedInUser) {
    return <ErrorPage status={401} />
  }

  const isAdmin = loggedInUser.isAdmin
  const isOwner = request.initializer.id === loggedInUser.id
  const isSupporter = request.supporters.some((s) => s.id === loggedInUser.id)

  return (
    <>
      <Helmet title={request.name} />
      <PageHeading title={request.name} />
      <Heading size="md" justifyContent="center" textAlign="center" mb={3}>
        {request.subject.name} ({request.subject.code})
      </Heading>
      <Stack direction={['column-reverse', 'row']} justifyContent="space-between" mb={3}>
        <VStack alignItems="flex-start" spacing={3} flexGrow={1}>
          <HStack>
            <FaClock />
            <Text>{new Date(request.expiryDate).toLocaleDateString('hu-HU', { dateStyle: 'short' })}</Text>
            {new Date() > new Date(request.expiryDate) && <Badge colorScheme="red">Lejárt</Badge>}
          </HStack>
        </VStack>
        <VStack align="stretch">
          {new Date() < new Date(request.expiryDate) && (
            <>
              {!isOwner && !isSupporter && (
                <Button
                  w="100%"
                  colorScheme="brand"
                  onClick={() => {
                    supportRequest(request.id)
                  }}
                >
                  Támogatom
                </Button>
              )}
              {!isOwner && isSupporter && (
                <Button
                  w="100%"
                  colorScheme="red"
                  onClick={() => {
                    unsupportRequest(request.id)
                  }}
                >
                  Nem támogatom
                </Button>
              )}
              {!isOwner && (
                <Button colorScheme="brand" width="100%" as={Link} to={`${PATHS.CONSULTATIONS}/new?requestId=${request.id}`}>
                  Megtartom
                </Button>
              )}
            </>
          )}
          {(isOwner || isAdmin) && <RequestActions requestId={request.id} />}
        </VStack>
      </Stack>
      {request.descMarkdown && (
        <Box shadow="md" borderRadius={8} borderWidth={1} p={4} width="100%" mb={2}>
          <Markdown markdown={request.descMarkdown} />
        </Box>
      )}
      {request.consultations.length > 0 && (
        <>
          <Heading size="lg" mb={2}>
            Konzultációk ({request.consultations.length})
          </Heading>
          <VStack alignItems="stretch" mb={6}>
            {request.consultations.map((c) => (
              <ConsultationListItem
                consultation={c}
                key={c.id}
                rightSmallText={
                  c.presentations.length <= 3
                    ? `Konzitartó${c.presentations.length > 1 ? 'k' : ''}:
                ${c.presentations.map((p) => p.fullName).join(', ')}`
                    : `${c.presentations.length} konzitartó`
                }
              />
            ))}
          </VStack>
        </>
      )}
      <Heading size="lg" mb={2}>
        Kezdeményező
      </Heading>
      <UserList
        columns={1}
        users={[request.initializer]}
        isParticipant={false}
        showRating={false}
        showRatingButton={false}
        refetch={refetch}
      />
      <Heading size="lg" mt={2} mb={2}>
        Támogatók ({request.supporters.length})
      </Heading>
      {request.supporters.length > 0 ? (
        <UserList columns={2} users={request.supporters} isParticipant={false} showRating={false} refetch={refetch} />
      ) : (
        <Text textAlign="center" fontStyle="italic">
          Még nincs egy támogató se.
        </Text>
      )}
    </>
  )
}
