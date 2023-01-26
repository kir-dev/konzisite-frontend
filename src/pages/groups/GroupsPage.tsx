import { Button, Flex, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useFecthGroupListQuery } from '../../api/hooks/groupQueryHooks'
import { GroupRoles } from '../../api/model/group.model'
import { ErrorPage } from '../error/ErrorPage'
import { GroupList } from './components/GroupList'

export const GroupsPage = () => {
  const { isLoading, data: groups, error, refetch } = useFecthGroupListQuery()
  if (error) {
    return <ErrorPage backPath={'/'} status={error.statusCode} title={error.message} />
  }

  return (
    <>
      <Heading size="xl" textAlign="center" mb={3}>
        Csoportok
      </Heading>
      <Flex justify="flex-end">
        <Button as={Link} to="/groups/new" colorScheme="brand">
          Új csoport létrehozása
        </Button>
      </Flex>

      <GroupList
        groups={groups?.filter((g) => g.currentUserRole !== GroupRoles.NONE)}
        title="Saját csoportok"
        noGroupsMessage="Még nem vagy csoport tagja sem!"
        loading={isLoading}
        refetchList={refetch}
      />
      <GroupList
        groups={groups?.filter((g) => g.currentUserRole === GroupRoles.NONE)}
        title="Többi csoport"
        noGroupsMessage="Nincs több csoport"
        loading={isLoading}
        refetchList={refetch}
      />
    </>
  )
}
