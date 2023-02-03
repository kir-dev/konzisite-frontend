import { Heading, Stack, VStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { useFecthGroupDetailsQuery } from '../../api/hooks/groupQueryHooks'
import { GroupRoles } from '../../api/model/group.model'
import { PATHS } from '../../util/paths'
import { translateGroupRole } from '../../util/translateGroupRole'
import { ErrorPage } from '../error/ErrorPage'
import { GroupDetailsSkeleton } from './components/GroupDeatilsSkeleton'
import { GroupOptionsButton } from './components/GroupOptionsButton'
import { UserList } from './components/UserList'

export const GroupDetailsPage = () => {
  const { groupId } = useParams()
  const { isLoading, data: group, error, refetch } = useFecthGroupDetailsQuery(+groupId!!)

  if (groupId === undefined || isNaN(+groupId)) {
    return <ErrorPage backPath={PATHS.INDEX} status={404} title={'A csoport nem található!'} />
  }

  if (error) {
    return <ErrorPage backPath={PATHS.INDEX} status={error.statusCode} title={error.message} />
  }

  if (isLoading) {
    return <GroupDetailsSkeleton />
  }

  if (group === undefined) {
    return (
      <ErrorPage status={404} title="Nincs ilyen cspoort" messages={['A csoport amit keresel már nem létezik, vagy nem is létezett']} />
    )
  }

  const pendingUsers = group.members.filter((m) => m.role === GroupRoles.PENDING)
  const notPendingUsers = group.members.filter((m) => m.role !== GroupRoles.PENDING)

  return (
    <>
      <Helmet title={group.name} />
      <Heading textAlign="center" mb={3}>
        {group.name}
      </Heading>
      <Stack direction={['column-reverse', 'row']} justifyContent="space-between" mb={3}>
        <VStack alignItems="flex-start" spacing={3}>
          <Heading size="md">Létrehozva: {new Date(group.createdAt).toLocaleDateString('hu-HU')}</Heading>
          {<Heading size="md">Szerepköröd: {translateGroupRole[group.currentUserRole]}</Heading>}
        </VStack>
        <VStack justify={['center', 'flex-end']} align="flex-end">
          <GroupOptionsButton group={group} refetchDetails={refetch} />
        </VStack>
      </Stack>
      {[GroupRoles.ADMIN, GroupRoles.OWNER].includes(group.currentUserRole) && (
        <>
          <Heading size="lg" mb={2}>
            Függő tagok ({pendingUsers.length})
          </Heading>
          <UserList users={pendingUsers} group={group} pending={true} refetchDetails={refetch} />
        </>
      )}
      <Heading size="lg" mb={2}>
        Tagok ({notPendingUsers.length})
      </Heading>
      <UserList users={notPendingUsers} group={group} pending={false} refetchDetails={refetch} />
    </>
  )
}
