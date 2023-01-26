import {
  Avatar,
  Badge,
  Box,
  Checkbox,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Stack,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaChevronDown, FaUserCheck, FaUserGraduate, FaUserInjured, FaUserSlash, FaUserTimes } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import {
  useApproveUserMutation,
  useDeclineUserMutation,
  useDemoteUserInGroupMutation,
  usePromoteUserInGroupMutation,
  useRemoveUserFromGroupMutation
} from '../../api/hooks/groupMutationHooks'
import { useFecthGroupDetailsQuery } from '../../api/hooks/groupQueryHooks'
import { KonziError } from '../../api/model/error.model'
import { GroupRoles } from '../../api/model/group.model'
import { generateToastParams } from '../../util/generateToastParams'
import { translateGroupRole } from '../../util/translateGroupRole'
import { ErrorPage } from '../error/ErrorPage'
import { GroupDetailsSkeleton } from './components/GroupDeatilsSkeleton'
import { GroupOptionsButton } from './components/GroupOptionsButton'

interface GroupMutationParams {
  groupId: number
  userId: number
}

export const GroupDetailsPage = () => {
  const [displayOnlyPending, setDisplayOnlyPending] = useState(false)
  const toast = useToast()

  const { groupId } = useParams()
  if (groupId === undefined) {
    return <ErrorPage />
  }
  const { isLoading, data: group, error, refetch } = useFecthGroupDetailsQuery(+groupId)

  const onErrorFn = (e: KonziError) => {
    toast(generateToastParams(e))
  }
  const generateSuccessFn = (successMessage: string) => () => {
    toast({ title: successMessage, status: 'success' })
    refetch()
  }

  const { mutate: approveUser } = useApproveUserMutation(generateSuccessFn('Felhasználó elfogadva'), onErrorFn)
  const { mutate: declineUser } = useDeclineUserMutation(generateSuccessFn('Felhasználó visszautasítva'), onErrorFn)
  const { mutate: promoteUser } = usePromoteUserInGroupMutation(generateSuccessFn('Felhasználó előléptetve'), onErrorFn)
  const { mutate: demoteUser } = useDemoteUserInGroupMutation(generateSuccessFn('Felhasználó visszaléptetve'), onErrorFn)
  const { mutate: removeFromGroup } = useRemoveUserFromGroupMutation(generateSuccessFn('Felhasználó eltávolítva'), onErrorFn)

  const { loggedInUser: currentUser } = useAuthContext()

  if (error) {
    return <ErrorPage backPath={'/'} status={error.statusCode} title={error.error} messages={[error.message]}></ErrorPage>
  }

  const membersToRender = group?.members.filter((u) => u.role === GroupRoles.PENDING || !displayOnlyPending)

  if (isLoading) {
    return <GroupDetailsSkeleton />
  } else
    return (
      <>
        {group === undefined ? (
          <ErrorPage title="Nincs ilyen cspoort" messages={['A csoport amit keresel már nem létezik, vagy nem is létezett']} />
        ) : (
          <>
            <Heading textAlign="center" mb={3}>
              {group.name}
            </Heading>
            <Stack direction={['column', 'row']} justifyContent="space-between" mb={3}>
              <VStack alignItems="flex-start" spacing={3}>
                <Heading size="md">Létrehozva: {new Date(group.createdAt).toLocaleDateString('hu-HU')}</Heading>
                {<Heading size="md">Szerepköröd: {translateGroupRole[group.currentUserRole]}</Heading>}
              </VStack>
              <Stack direction={['row', 'column']} align="flex-end">
                <GroupOptionsButton group={group} refetchDetails={refetch} />
              </Stack>
            </Stack>
            <Stack direction={['column', 'row']} justifyContent="space-between" mb={3}>
              <Heading size="lg" mb={2}>
                Tagok (
                {displayOnlyPending
                  ? group.members.filter((m) => m.role === GroupRoles.PENDING).length
                  : group.members.filter((m) => m.role !== GroupRoles.PENDING).length}
                )
              </Heading>
              <Checkbox size="lg" isChecked={displayOnlyPending} onChange={(e) => setDisplayOnlyPending(e.target.checked)}>
                Csak függőben lévő
              </Checkbox>
            </Stack>
            <SimpleGrid columns={{ sm: 1, md: 2 }} gap={4}>
              {membersToRender?.map((u) => (
                <Box key={u.id} shadow="md" borderRadius={8} borderWidth={1}>
                  <HStack>
                    <HStack flexGrow={1} as={Link} to={`/users/${u.id}`} p={4}>
                      <Avatar size="md" name={u.fullName} src={''} />
                      <VStack flexGrow={1}>
                        <Heading size="md" width="100%">
                          {u.fullName}
                          {u.id === group.owner.id && (
                            <Badge colorScheme="brand" ml={1}>
                              Tulajdonos
                            </Badge>
                          )}
                          {[GroupRoles.ADMIN, GroupRoles.PENDING].includes(u.role) && (
                            <Badge colorScheme={u.role === GroupRoles.ADMIN ? 'green' : 'red'} ml={1}>
                              {translateGroupRole[u.role]}
                            </Badge>
                          )}
                          {u.id === currentUser?.id && (
                            <Badge colorScheme="orange" ml={1}>
                              Te
                            </Badge>
                          )}
                        </Heading>
                        <HStack justifyContent="space-between" width="100%">
                          <Text>Csatlakozás: {new Date(u.joinedAt).toLocaleDateString('hu-HU')}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    {(group.currentUserRole == GroupRoles.ADMIN || group.currentUserRole == GroupRoles.OWNER) &&
                      u.id !== group.owner.id &&
                      u.id !== currentUser?.id && (
                        <Flex alignItems="center" p={2}>
                          <Menu>
                            <MenuButton as={IconButton} colorScheme="brand" icon={<FaChevronDown />} width="100%" />
                            <MenuList>
                              {u.role === GroupRoles.PENDING ? (
                                <>
                                  <MenuItem
                                    color="green"
                                    icon={<FaUserCheck />}
                                    onClick={() => approveUser({ groupId: group.id, userId: u.id })}
                                  >
                                    Elfogadás
                                  </MenuItem>
                                  <MenuItem
                                    color="red"
                                    icon={<FaUserTimes />}
                                    onClick={() => declineUser({ groupId: group.id, userId: u.id })}
                                  >
                                    Elutasátas
                                  </MenuItem>
                                </>
                              ) : (
                                <>
                                  {group.currentUserRole == GroupRoles.OWNER &&
                                    (u.role === GroupRoles.ADMIN ? (
                                      <MenuItem
                                        color="red"
                                        icon={<FaUserInjured />}
                                        onClick={() => demoteUser({ groupId: group.id, userId: u.id })}
                                      >
                                        Lefokozás
                                      </MenuItem>
                                    ) : (
                                      <MenuItem
                                        color="green"
                                        icon={<FaUserGraduate />}
                                        onClick={() => promoteUser({ groupId: group.id, userId: u.id })}
                                      >
                                        Előléptetés
                                      </MenuItem>
                                    ))}
                                  <MenuItem
                                    color="red"
                                    icon={<FaUserSlash />}
                                    onClick={() => removeFromGroup({ groupId: group.id, userId: u.id })}
                                  >
                                    Eltávolítás
                                  </MenuItem>
                                </>
                              )}
                            </MenuList>
                          </Menu>
                        </Flex>
                      )}
                  </HStack>
                </Box>
              ))}
              {membersToRender?.length === 0 && <Text>Nincsenek {displayOnlyPending && 'függő '} tagok</Text>}
            </SimpleGrid>
          </>
        )}
      </>
    )
}
