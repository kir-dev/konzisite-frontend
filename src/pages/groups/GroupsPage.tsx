import { Button, Heading } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { GroupRoles } from '../../api/model/group.model'
import { groupModule } from '../../api/modules/group.module'
import { ErrorPage } from '../error/ErrorPage'
import { GroupList } from './components/GroupList'

export const GroupsPage = () => {
  const { isLoading, data: groups, error, refetch } = useQuery('fetchGroups', () => groupModule.fetchGroups(), { retry: false })
  const navigate = useNavigate()

  //TODO
  if (error) {
    const err = error as AxiosError<{ message: string }>
    return (
      <ErrorPage
        backPath={'/'}
        status={err?.response?.status}
        title={err?.response?.data.message}
        messages={['VALAMI HIBA sadsa']}
      ></ErrorPage>
    )
  }

  return (
    <>
      <Heading size="xl" textAlign="center" mb={3}>
        Csoportok
      </Heading>
      <Button as={Link} to="/groups/new" colorScheme="brand">
        Új csoport létrehozása
      </Button>
      <GroupList
        groups={groups?.filter((g) => g.currentUserRole !== GroupRoles.NONE)}
        title="Saját csoportok"
        noGroupsMessage="Még nem vagy csoport tagja sem!"
        loading={isLoading}
        refetch={refetch}
      />
      <GroupList
        groups={groups?.filter((g) => g.currentUserRole === GroupRoles.NONE)}
        title="Többi csoport"
        noGroupsMessage="Nincs több csoport"
        loading={isLoading}
        refetch={refetch}
      />
    </>
  )
}
