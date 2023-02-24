import {
  Avatar,
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
  useMediaQuery,
  useToast,
  VStack
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useJoinGroupMutation, useLeaveGroupMutation } from '../../../api/hooks/groupMutationHooks'
import { KonziError } from '../../../api/model/error.model'
import { GroupModel, GroupRoles } from '../../../api/model/group.model'
import { generateToastParams } from '../../../util/generateToastParams'
import { PATHS } from '../../../util/paths'
import { GroupPreview } from '../types/groupPreview'
import { GroupListSkeleton } from './GroupListSkeleton'

type Props = {
  title: string
  noGroupsMessage: string
  groups?: GroupPreview[]
  loading?: boolean
  mt?: number
  searchBar?: boolean
  refetchList: () => void
}

export const GroupList = ({ groups, title, noGroupsMessage, loading = false, mt = 0, refetchList, searchBar = false }: Props) => {
  const toast = useToast()
  const [search, setSearch] = useState('')
  const [largeScreen] = useMediaQuery('(min-width: 48em)')

  const onErrorFn = (e: KonziError) => {
    toast(generateToastParams(e))
  }
  const generateSuccessFn = (successMessage: string) => () => {
    toast({ title: successMessage, status: 'success' })
    refetchList()
  }

  const { mutate: joinGroup } = useJoinGroupMutation(generateSuccessFn('Csatlakoztál a csoporthoz!'), onErrorFn)
  const { mutate: leaveGroup } = useLeaveGroupMutation(onErrorFn)

  const undoJoin = (group: GroupModel) => {
    leaveGroup(group.id, {
      onSuccess: () => {
        toast({ title: 'Visszavontad a jelentkezésed!', status: 'success' })
        refetchList()
      }
    })
  }
  const filteredGroups = groups?.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()))

  if (loading) {
    return <GroupListSkeleton title={title} />
  } else {
    return (
      <>
        <Heading mb={4} mt={mt} size="lg">
          {title}
        </Heading>
        {searchBar && (
          <InputGroup mb={4}>
            <InputLeftElement h="100%">
              <FaSearch />
            </InputLeftElement>
            <Input
              autoFocus={largeScreen}
              placeholder="Keresés..."
              size="lg"
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              value={search}
            />
            <InputRightElement h="100%">
              <FaTimes
                onClick={() => {
                  setSearch('')
                }}
                cursor="pointer"
              />
            </InputRightElement>
          </InputGroup>
        )}
        {filteredGroups && filteredGroups.length === 0 ? (
          <Text textAlign="center" fontStyle="italic">
            {noGroupsMessage}
          </Text>
        ) : (
          <SimpleGrid columns={{ sm: 1, lg: 2 }} gap={4}>
            {filteredGroups?.map((g) => (
              <Box key={g.id} shadow="md" borderRadius={8} borderWidth={1}>
                <Stack as={Link} to={`${PATHS.GROUPS}/${g.id}`} direction={['column', 'row']} justify="space-between">
                  <HStack p={4}>
                    <Avatar size="md" name={g.name} src="" />
                    <VStack flexGrow={1} align="flex-start">
                      <Heading
                        isTruncated
                        maxWidth={
                          g.currentUserRole === GroupRoles.PENDING
                            ? { base: '15rem', sm: '8rem', m: '17rem', md: '26rem', lg: '10rem' }
                            : g.currentUserRole == GroupRoles.NONE
                            ? { base: '15rem', sm: '13rem', m: '22rem', md: '31rem', lg: '14rem' }
                            : { base: '15rem', sm: '22rem', m: '30rem', md: '40rem', lg: '25rem' }
                        }
                        size="md"
                      >
                        {g.name}
                      </Heading>

                      <HStack justify="space-between" align="center">
                        <Text>{g.memberCount} tag</Text>
                        {g.currentUserRole === GroupRoles.PENDING && <Badge colorScheme="red">Függőben</Badge>}
                      </HStack>
                    </VStack>
                  </HStack>
                  {(g.currentUserRole == GroupRoles.PENDING || g.currentUserRole == GroupRoles.NONE) && (
                    <VStack p={2} justifyContent="center">
                      {g.currentUserRole == GroupRoles.PENDING && (
                        <Button
                          colorScheme="red"
                          onClick={(e) => {
                            e.preventDefault()
                            undoJoin(g)
                          }}
                          width="100%"
                        >
                          Kérelem visszavonása
                        </Button>
                      )}
                      {g.currentUserRole == GroupRoles.NONE && (
                        <Button
                          colorScheme="brand"
                          onClick={(e) => {
                            e.preventDefault()
                            joinGroup(g.id)
                          }}
                          width="100%"
                        >
                          Csatlakozás
                        </Button>
                      )}
                    </VStack>
                  )}
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </>
    )
  }
}
