import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  useToast,
  VStack
} from '@chakra-ui/react'
import { FaChevronDown, FaUserCheck, FaUserGraduate, FaUserInjured, FaUserSlash, FaUserTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import {
  useApproveUserMutation,
  useDeclineUserMutation,
  useDemoteUserInGroupMutation,
  usePromoteUserInGroupMutation,
  useRemoveUserFromGroupMutation
} from '../../../api/hooks/groupMutationHooks'
import { KonziError } from '../../../api/model/error.model'
import { GroupRoles } from '../../../api/model/group.model'
import { UserModel } from '../../../api/model/user.model'
import { generateToastParams } from '../../../util/generateToastParams'
import { PATHS } from '../../../util/paths'
import { translateGroupRole } from '../../../util/translateGroupRole'
import { GroupDetails } from '../types/groupDetails'

type Props = {
  users: (UserModel & {
    joinedAt: string
    role: GroupRoles
  })[]
  group: GroupDetails
  refetchDetails: () => void
  pending: boolean
}

export const UserList = ({ users, group, refetchDetails, pending }: Props) => {
  const { loggedInUser: currentUser } = useAuthContext()
  const toast = useToast()

  const onErrorFn = (e: KonziError) => {
    toast(generateToastParams(e))
  }
  const generateSuccessFn = (successMessage: string) => () => {
    toast({ title: successMessage, status: 'success' })
    refetchDetails()
  }

  const { mutate: approveUser } = useApproveUserMutation(generateSuccessFn('Felhasználó elfogadva'), onErrorFn)
  const { mutate: declineUser } = useDeclineUserMutation(generateSuccessFn('Felhasználó visszautasítva'), onErrorFn)
  const { mutate: promoteUser } = usePromoteUserInGroupMutation(generateSuccessFn('Felhasználó előléptetve'), onErrorFn)
  const { mutate: demoteUser } = useDemoteUserInGroupMutation(generateSuccessFn('Felhasználó visszaléptetve'), onErrorFn)
  const { mutate: removeFromGroup } = useRemoveUserFromGroupMutation(generateSuccessFn('Felhasználó eltávolítva'), onErrorFn)

  return (
    <SimpleGrid columns={{ sm: 1, md: 2 }} gap={4} mb={3}>
      {users?.map((u) => (
        <Box key={u.id} shadow="md" borderRadius={8} borderWidth={1}>
          <HStack>
            <HStack flexGrow={1} as={Link} to={`${PATHS.USERS}/${u.id}`} p={4}>
              <Avatar size="md" name={u.fullName} src={''} />
              <VStack flexGrow={1}>
                <Flex width="100%">
                  <Heading size="md">{u.fullName}</Heading>
                  <Flex align={'center'}>
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
                  </Flex>
                </Flex>
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
                          <MenuItem color="green" icon={<FaUserCheck />} onClick={() => approveUser({ groupId: group.id, userId: u.id })}>
                            Elfogadás
                          </MenuItem>
                          <MenuItem color="red" icon={<FaUserTimes />} onClick={() => declineUser({ groupId: group.id, userId: u.id })}>
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
                          {u.role !== GroupRoles.ADMIN && (
                            <MenuItem
                              color="red"
                              icon={<FaUserSlash />}
                              onClick={() => removeFromGroup({ groupId: group.id, userId: u.id })}
                            >
                              Eltávolítás
                            </MenuItem>
                          )}
                        </>
                      )}
                    </MenuList>
                  </Menu>
                </Flex>
              )}
          </HStack>
        </Box>
      ))}
      {users.length === 0 && <Text>Nincsenek {pending && 'függő '} tagok</Text>}
    </SimpleGrid>
  )
}
