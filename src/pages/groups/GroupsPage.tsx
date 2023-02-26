import { Text } from '@chakra-ui/react'
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
      <PageHeading title="Csoportok">
        <GroupEditModalButton
          buttonText="Új csoport"
          modalTitle="Csoport létrehozása"
          successMessage="Csoport sikeresen létrehozva"
          mutation={createGroupMutation}
          refetch={refetch}
        />
      </PageHeading>
      <Text mb={2} textAlign="justify">
        Ha szeretnél csak bizonyos hallgatóknak (például egy tankörnek) konzultációt tartani, először hozz létre egy csoportot. A
        csoportokba bárki jelentkezhet, de a jelentkezést a csoport tulajdonosának vagy valamelyik adminjának el kell fogadnia, mielőtt
        végleges lesz. Ha konzi létrehozása közben megadsz egy vagy több célcsoportot, akkor csak azok a felhasználók fogják látni a konzit,
        akik legalább az egyik célcsoportnak tagjai.
      </Text>
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
