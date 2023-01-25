import { Button, Heading } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { GroupRoles } from '../../api/model/group.model'
import { groupModule } from '../../api/modules/group.module'
import { GroupList } from './components/GroupList'

export const GroupsPage = () => {
  const { isLoading, data: groups, error } = useQuery('fetchGroups', () => groupModule.fetchGroups())

  return (
    <>
      <Heading size="xl" textAlign="center" mb={3}>
        Csoportok
      </Heading>
      <Button as={Link} to="/groups/new" colorScheme="brand">
        Új csoport létrehozása
      </Button>
      <GroupList
        groups={groups?.filter((g) => g.currentUserRole != GroupRoles.NONE)}
        title="Saját csoportok"
        showOwner={true}
        loading={isLoading}
      />
      <GroupList groups={groups} title="Minden csoport" showJoinButton={true} loading={isLoading} />
    </>
  )
}
