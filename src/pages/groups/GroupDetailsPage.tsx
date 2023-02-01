import { Heading, Stack, VStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { useFecthGroupDetailsQuery } from '../../api/hooks/groupQueryHooks'
import { GroupRoles } from '../../api/model/group.model'
import { translateGroupRole } from '../../util/translateGroupRole'
import { ErrorPage } from '../error/ErrorPage'
import { GroupDetailsSkeleton } from './components/GroupDeatilsSkeleton'
import { GroupOptionsButton } from './components/GroupOptionsButton'
import { UserList } from './components/UserList'

export const GroupDetailsPage = () => {
  const { groupId } = useParams()
  if (groupId === undefined) {
    return <ErrorPage />
  }
  const { isLoading, data: group, error, refetch } = useFecthGroupDetailsQuery(+groupId)

  if (error) {
    return <ErrorPage backPath={'/'} status={error.statusCode} title={error.error} messages={[error.message]}></ErrorPage>
  }

  if (isLoading) {
    return <GroupDetailsSkeleton />
  } else
    return (
      <>
        {group === undefined ? (
          <ErrorPage title="Nincs ilyen cspoort" messages={['A csoport amit keresel már nem létezik, vagy nem is létezett']} />
        ) : (
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
                  Függő tagok ({group.members.filter((m) => m.role === GroupRoles.PENDING).length})
                </Heading>
                <UserList
                  users={group.members.filter((m) => m.role === GroupRoles.PENDING)}
                  group={group}
                  pending={true}
                  refetchDetails={refetch}
                />
              </>
            )}
            <Heading size="lg" mb={2}>
              Tagok ({group.members.filter((m) => m.role !== GroupRoles.PENDING).length})
            </Heading>
            <UserList
              users={group.members.filter((m) => m.role !== GroupRoles.PENDING)}
              group={group}
              pending={false}
              refetchDetails={refetch}
            />
          </>
        )}
      </>
    )
}
