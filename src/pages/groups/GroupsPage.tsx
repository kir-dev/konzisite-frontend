import { Text } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  if (error) {
    return <ErrorPage status={error.statusCode} title={error.message} />
  }

  return (
    <>
      <Helmet title={t('groupListPage.title')} />
      <PageHeading title={t('groupListPage.title')}>
        <GroupEditModalButton
          buttonText={t('groupListPage.newGroup')}
          modalTitle={t('groupListPage.createGroup')}
          successMessage={t('groupListPage.groupCreated')}
          mutation={createGroupMutation}
          refetch={refetch}
        />
      </PageHeading>
      <Text mb={2} textAlign="justify">
        {t('groupListPage.groupDesc')}
      </Text>
      <GroupList
        groups={groups?.filter((g) => g.currentUserRole !== GroupRoles.NONE)}
        title={t('groupListPage.ownGroups')}
        noGroupsMessage={t('groupListPage.noOwnGroups')}
        loading={isLoading}
        refetchList={refetch}
      />
      <GroupList
        groups={groups?.filter((g) => g.currentUserRole === GroupRoles.NONE)}
        title={t('groupListPage.otherGroups')}
        noGroupsMessage={t('groupListPage.noOtherGroups')}
        loading={isLoading}
        mt={8}
        refetchList={refetch}
        searchBar={true}
      />
    </>
  )
}
