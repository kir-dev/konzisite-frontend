import { Button, Text, useToast, VStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { useSupportRequestMutation, useUnsupportRequestMutation } from '../../api/hooks/requestMutationHooks'
import { useFetchRequestListQuery } from '../../api/hooks/requestQueryHooks'
import { KonziError } from '../../api/model/error.model'
import { PageHeading } from '../../components/commons/PageHeading'
import { generateToastParams } from '../../util/generateToastParams'
import { PATHS } from '../../util/paths'
import { LoadingConsultationList } from '../consultations/components/loading/LoadingConsultationList'
import { ErrorPage } from '../error/ErrorPage'
import { RequestListItem } from './components/RequestListItem'

export const RequestListPage = () => {
  const { isLoading, data: requests, error, refetch } = useFetchRequestListQuery()
  const { loggedInUser, loggedInUserLoading } = useAuthContext()
  const toast = useToast()
  const { t } = useTranslation()

  const onError = (e: KonziError) => {
    toast(generateToastParams(e, t))
  }

  const generateOnSuccess = (message: string) => () => {
    toast({ title: message, status: 'success' })
    refetch()
  }

  const { mutate: supportRequest } = useSupportRequestMutation(generateOnSuccess(t('requestListPage.supportSuccess')), onError)
  const { mutate: unsupportRequest } = useUnsupportRequestMutation(generateOnSuccess(t('requestListPage.unsupportSuccess')), onError)

  if (error) {
    return <ErrorPage status={error.statusCode} title={error.message} />
  }

  if (!loggedInUser && !loggedInUserLoading) {
    return <ErrorPage status={401} />
  }

  return (
    <>
      <Helmet title={t('requestListPage.requests')} />
      <PageHeading title={t('requestListPage.requests')}>
        <Button as={Link} to={`${PATHS.REQUESTS}/new`} colorScheme="brand">
          {t('requestListPage.newRequest')}
        </Button>
      </PageHeading>
      <Text mb={2} textAlign="justify">
        {t('requestListPage.requestDesc')}
      </Text>
      {requests && requests.length === 0 ? (
        <Text mt={3} fontStyle="italic" textAlign="center">
          {t('requestListPage.noRequests')}
        </Text>
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
                rightSmallText={`${t('home.requestors', { count: r.supporterCount || 0 })} | ${t('home.consultationsForRequest', {
                  count: r.consultationCount
                })}`}
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
