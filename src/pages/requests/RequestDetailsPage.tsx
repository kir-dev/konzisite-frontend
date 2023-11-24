import { Badge, Box, Button, Heading, HStack, Stack, Text, useToast, VStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { FaClock } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { useSupportRequestMutation, useUnsupportRequestMutation } from '../../api/hooks/requestMutationHooks'
import { useFecthRequestDetailsQuery } from '../../api/hooks/requestQueryHooks'
import { KonziError } from '../../api/model/error.model'
import { ConsultationListItem } from '../../components/commons/ConsultationListItem'
import Markdown from '../../components/commons/Markdown'
import { PageHeading } from '../../components/commons/PageHeading'
import { SubjectName } from '../../components/commons/SubjectName'
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
  const { t, i18n } = useTranslation()
  const { isLoading, data: request, error, refetch } = useFecthRequestDetailsQuery(+requestId!!)

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

  if (isLoading || loggedInUserLoading) {
    return <LoadingRequestDetails />
  }

  if (!request) {
    return <ErrorPage title={t('requestDetailsPage.notFound')} status={404} messages={[t('requestDetailsPage.notFoundDesc')]} />
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
        <SubjectName subject={request.subject} />
      </Heading>
      <Stack direction={['column-reverse', 'row']} justifyContent="space-between" mb={3}>
        <VStack alignItems="flex-start" spacing={3} flexGrow={1}>
          <HStack>
            <FaClock />
            <Text>{new Date(request.expiryDate).toLocaleDateString(i18n.language, { dateStyle: 'short' })}</Text>
            {new Date() > new Date(request.expiryDate) && <Badge colorScheme="red">{t('requestDetailsPage.expired')}</Badge>}
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
                  {t('requestDetailsPage.support')}
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
                  {t('requestDetailsPage.unsupport')}
                </Button>
              )}
              {!isOwner && (
                <Button colorScheme="brand" width="100%" as={Link} to={`${PATHS.CONSULTATIONS}/new?requestId=${request.id}`}>
                  {t('requestDetailsPage.fulfill')}
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
            {t('requestDetailsPage.consultations')} ({request.consultations.length})
          </Heading>
          <VStack alignItems="stretch" mb={6}>
            {request.consultations.map((c) => (
              <ConsultationListItem
                consultation={c}
                key={c.id}
                rightSmallText={t('home.presenters', {
                  count: c.presentations.length,
                  names: c.presentations.map((p) => p.fullName).join(', ')
                })}
              />
            ))}
          </VStack>
        </>
      )}
      <Heading size="lg" mb={2}>
        {t('requestDetailsPage.initiator')}
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
        {t('requestDetailsPage.supporters')} ({request.supporters.length})
      </Heading>
      {request.supporters.length > 0 ? (
        <UserList columns={2} users={request.supporters} isParticipant={false} showRating={false} refetch={refetch} />
      ) : (
        <Text textAlign="center" fontStyle="italic">
          {t('requestDetailsPage.noSupporters')}
        </Text>
      )}
    </>
  )
}
