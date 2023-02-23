import { Button, Flex, Heading, Text, useToast, VStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { useSupportRequestMutation, useUnsupportRequestMutation } from '../../api/hooks/requestMutationHooks'
import { useFetchRequestListQuery } from '../../api/hooks/requestQueryHooks'
import { KonziError } from '../../api/model/error.model'
import { generateToastParams } from '../../util/generateToastParams'
import { PATHS } from '../../util/paths'
import { LoadingConsultationList } from '../consultations/components/LoadingConsultationList'
import { ErrorPage } from '../error/ErrorPage'
import { RequestListItem } from './components/RequestListItem'

export const RequestListPage = () => {
  const { isLoading, data: requests, error, refetch } = useFetchRequestListQuery()
  const { loggedInUser, loggedInUserLoading } = useAuthContext()
  const toast = useToast()

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

  if (!loggedInUser && !loggedInUserLoading) {
    return <ErrorPage status={401} />
  }

  return (
    <>
      <Helmet title="Konzultáció kérések" />
      <Heading size="xl" textAlign="center" mb={3}>
        Konzultáció kérések
      </Heading>
      <Flex justify="flex-end">
        <Button as={Link} to={`${PATHS.REQUESTS}/new`} colorScheme="brand">
          Új konzi kérés
        </Button>
      </Flex>
      {requests && requests.length === 0 ? (
        <Text>Nincsenek kérések!</Text>
      ) : (
        <VStack alignItems="stretch" mt={3}>
          {isLoading || loggedInUserLoading || !loggedInUser ? (
            <LoadingConsultationList />
          ) : (
            requests?.map((r) => (
              <RequestListItem
                user={loggedInUser}
                request={r}
                key={r.id}
                rightSmallText={`${r.supporterCount + 1} ember kérte | ${r.consultationCount} konzi`}
                support={supportRequest}
                unsupport={unsupportRequest}
              />
            ))
          )}
        </VStack>
      )}
    </>
  )
}
