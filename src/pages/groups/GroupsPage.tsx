import { Flex, Input, InputGroup, InputLeftElement, InputRightElement, useToast } from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { useCreateGroupMutation, useFecthGroupListMutation } from '../../api/hooks/groupMutationHooks'
import { KonziError } from '../../api/model/error.model'
import { GroupRoles } from '../../api/model/group.model'
import { PageHeading } from '../../components/commons/PageHeading'
import { generateToastParams } from '../../util/generateToastParams'
import { ErrorPage } from '../error/ErrorPage'
import { GroupEditModalButton } from './components/GroupEditModalButton'
import { GroupList } from './components/GroupList'

export const GroupsPage = () => {
  const createGroupMutation = useCreateGroupMutation()

  const toast = useToast()
  const {
    isLoading,
    data: groups,
    mutate: fetchGroups,
    reset,
    error
  } = useFecthGroupListMutation((e: KonziError) => {
    toast(generateToastParams(e))
  })

  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchGroups({ search: '' })
  }, [])

  const debouncedSearch = useRef(
    debounce((search: string) => {
      fetchGroups({ search })
    }, 400)
  ).current

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
          refetch={() => {
            setSearch('')
            fetchGroups({ search: '' })
          }}
        />
      </Flex>
      <InputGroup my={5}>
        <InputLeftElement h="100%">
          <FaSearch />
        </InputLeftElement>
        <Input
          autoFocus
          placeholder="Keresés..."
          size="lg"
          onChange={(e) => {
            setSearch(e.target.value)
            debouncedSearch(e.target.value)
          }}
          value={search}
        />
        <InputRightElement h="100%">
          <FaTimes
            onClick={() => {
              setSearch('')
              fetchGroups({ search: '' })
            }}
            cursor="pointer"
          />
        </InputRightElement>
      </InputGroup>
      <GroupList
        groups={groups?.filter((g) => g.currentUserRole !== GroupRoles.NONE)}
        title="Saját csoportok"
        noGroupsMessage="Még nem vagy egy csoport tagja sem!"
        loading={isLoading}
        refetchList={() => fetchGroups({ search })}
      />
      <GroupList
        groups={groups?.filter((g) => g.currentUserRole === GroupRoles.NONE)}
        title="Többi csoport"
        noGroupsMessage="Nincs több csoport"
        loading={isLoading}
        mt={8}
        refetchList={() => fetchGroups({ search })}
      />
    </>
  )
}
