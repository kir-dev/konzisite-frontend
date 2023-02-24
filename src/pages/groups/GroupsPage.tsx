import { Flex } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { useCreateGroupMutation } from '../../api/hooks/groupMutationHooks'
import { useFecthGroupListQuery } from '../../api/hooks/groupQueryHooks'
import { GroupRoles } from '../../api/model/group.model'
import { PageHeading } from '../../components/commons/PageHeading'
import { ErrorPage } from '../error/ErrorPage'
import { GroupEditModalButton } from './components/GroupEditModalButton'
import { GroupList } from './components/GroupList'

export const GroupsPage = () => {
  const createGroupMutation = useCreateGroupMutation()
  const { data: groups, isLoading, error, refetch } = useFecthGroupListQuery()

  if (error) {
    return <ErrorPage status={error.statusCode} title={error.message} />
  }

  return (
    <>
      <Helmet title="Csoportok" />
      <PageHeading title="Csoportok" />
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
        mt={8}
        refetchList={refetch}
        searchBar={true}
      />
    </>
  )
}
