import { Heading, Stack, VStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useFecthGroupDetailsQuery } from '../../api/hooks/groupQueryHooks'
import { GroupRoles } from '../../api/model/group.model'
import { PageHeading } from '../../components/commons/PageHeading'
import { isValidId } from '../../util/core-util-functions'
import { PATHS } from '../../util/paths'
import { ErrorPage } from '../error/ErrorPage'
import { GroupDetailsSkeleton } from './components/GroupDeatilsSkeleton'
import { GroupOptionsButton } from './components/GroupOptionsButton'
import { UserList } from './components/UserList'

export const GroupDetailsPage = () => {
  const { groupId } = useParams()
  const { t, i18n } = useTranslation()
  const { isLoading, data: group, error, refetch } = useFecthGroupDetailsQuery(+groupId!!)

  if (!groupId || !isValidId(groupId)) {
    return <ErrorPage backPath={PATHS.GROUPS} status={404} title={t('groupDetailsPage.notFound')} />
  }

  if (error) {
    return <ErrorPage status={error.statusCode} title={error.message} />
  }

  if (isLoading) {
    return <GroupDetailsSkeleton />
  }

  if (!group) {
    return <ErrorPage status={404} title={t('groupDetailsPage.notFound2')} messages={[t('groupDetailsPage.notFound2Message')]} />
  }

  const pendingUsers = group.members.filter((m) => m.role === GroupRoles.PENDING)
  const notPendingUsers = group.members.filter((m) => m.role !== GroupRoles.PENDING)

  return (
    <>
      <Helmet title={group.name} />
      <PageHeading title={group.name} />
      <Stack direction={['column-reverse', 'row']} justifyContent="space-between" mb={3}>
        <VStack alignItems="flex-start" spacing={3}>
          <Heading size="md">
            {t('groupDetailsPage.created')}: {new Date(group.createdAt).toLocaleDateString(i18n.language)}
          </Heading>
          {
            <Heading size="md">
              {t('groupDetailsPage.role')}: {t(group.currentUserRole)}
            </Heading>
          }
        </VStack>
        <VStack justify={['center', 'flex-end']} align="flex-end">
          <GroupOptionsButton group={group} refetchDetails={refetch} />
        </VStack>
      </Stack>
      {[GroupRoles.ADMIN, GroupRoles.OWNER].includes(group.currentUserRole) && (
        <>
          <Heading size="lg" mb={2}>
            {t('groupDetailsPage.pendingMembers')} ({pendingUsers.length})
          </Heading>
          <UserList users={pendingUsers} group={group} pending={true} refetchDetails={refetch} />
        </>
      )}
      <Heading size="lg" mb={2}>
        {t('groupDetailsPage.members')} ({notPendingUsers.length})
      </Heading>
      <UserList users={notPendingUsers} group={group} pending={false} refetchDetails={refetch} />
    </>
  )
}
