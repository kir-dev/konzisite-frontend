import { Flex, Heading } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { useCreateGroupMutation } from '../../api/hooks/groupMutationHooks'
import { useFecthGroupListQuery } from '../../api/hooks/groupQueryHooks'
import { GroupRoles } from '../../api/model/group.model'
import { ErrorPage } from '../error/ErrorPage'
import { GroupEditModalButton } from './components/GroupEditModalButton'
import { GroupList } from './components/GroupList'

export const GroupsPage = () => {
  const { isLoading, data: groups, error, refetch } = useFecthGroupListQuery()
  const createGroupMutation = useCreateGroupMutation()

  if (error) {
    return <ErrorPage status={error.statusCode} title={error.message} />
  }

  return (
    <>
      <Helmet title="Csoportok" />
      <Heading size="xl" textAlign="center" mb={3}>
        Csoportok
      </Heading>
      <Flex justify="flex-end">
        <GroupEditModalButton
          buttonText="Új csoport"
          modalTitle="Csoport létrehozása"
          successMessage="Csoport sikeresen létrehozva"
          mutation={createGroupMutation}
          refetch={refetch}
        />
      </Flex>

      <GroupList
        groups={groups?.filter((g) => g.currentUserRole !== GroupRoles.NONE)}
        title="Saját csoportok"
        noGroupsMessage="Még nem vagy egy csoport tagja sem!"
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
