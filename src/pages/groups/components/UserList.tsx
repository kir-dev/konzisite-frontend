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
  useColorModeValue,
  useToast,
  VStack
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
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
import { generateToastParams } from '../../../util/generateToastParams'
import { PATHS } from '../../../util/paths'
import { PublicUser } from '../../user/types/PublicUser'
import { GroupDetails } from '../types/groupDetails'

type Props = {
  users: (PublicUser & {
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
  const { t, i18n } = useTranslation()
  const acceptPromoteTextColor = useColorModeValue('green', 'green.400')

  const onErrorFn = (e: KonziError) => {
    toast(generateToastParams(e, t))
  }
  const generateSuccessFn = (successMessage: string) => () => {
    toast({ title: successMessage, status: 'success' })
    refetchDetails()
  }

  const { mutate: approveUser } = useApproveUserMutation(generateSuccessFn(t('groupDetailsPage.userAccpeted')), onErrorFn)
  const { mutate: declineUser } = useDeclineUserMutation(generateSuccessFn(t('groupDetailsPage.userRejected')), onErrorFn)
  const { mutate: promoteUser } = usePromoteUserInGroupMutation(generateSuccessFn(t('groupDetailsPage.userPromoted')), onErrorFn)
  const { mutate: demoteUser } = useDemoteUserInGroupMutation(generateSuccessFn(t('groupDetailsPage.userDemoted')), onErrorFn)
  const { mutate: removeFromGroup } = useRemoveUserFromGroupMutation(generateSuccessFn(t('groupDetailsPage.userKicked')), onErrorFn)

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2 }} gap={4} mb={3}>
        {users?.map((u) => (
          <Box key={u.id} shadow="md" borderRadius={8} borderWidth={1}>
            <HStack>
              <HStack flexGrow={1} as={Link} to={`${PATHS.USERS}/${u.id}`} p={4}>
                <Avatar size="md" name={u.fullName + u.id} src="" />
                <VStack flexGrow={1}>
                  <Flex width="100%">
                    <Heading size="md">{u.fullName}</Heading>
                    <Flex align="center">
                      {u.id === group.owner.id && (
                        <Badge colorScheme="brand" ml={1}>
                          {t('groupDetailsPage.owner')}
                        </Badge>
                      )}
                      {[GroupRoles.ADMIN, GroupRoles.PENDING].includes(u.role) && (
                        <Badge colorScheme={u.role === GroupRoles.ADMIN ? 'green' : 'red'} ml={1}>
                          {t(u.role)}
                        </Badge>
                      )}
                      {u.id === currentUser?.id && (
                        <Badge colorScheme="orange" ml={1}>
                          {t('groupDetailsPage.you')}
                        </Badge>
                      )}
                    </Flex>
                  </Flex>
                  <HStack justifyContent="space-between" width="100%">
                    <Text>
                      {t('groupDetailsPage.joined')}: {new Date(u.joinedAt).toLocaleDateString(i18n.language)}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
              {u.id !== group.owner.id &&
                u.id !== currentUser?.id &&
                (group.currentUserRole === GroupRoles.OWNER ||
                  (group.currentUserRole === GroupRoles.ADMIN && u.role !== GroupRoles.ADMIN)) && (
                  <Flex alignItems="center" p={2}>
                    <Menu>
                      <MenuButton as={IconButton} colorScheme="brand" icon={<FaChevronDown />} width="100%" />
                      <MenuList>
                        {u.role === GroupRoles.PENDING ? (
                          <>
                            <MenuItem
                              color={acceptPromoteTextColor}
                              icon={<FaUserCheck />}
                              onClick={() => approveUser({ groupId: group.id, userId: u.id })}
                            >
                              {t('groupDetailsPage.accept')}
                            </MenuItem>
                            <MenuItem color="red" icon={<FaUserTimes />} onClick={() => declineUser({ groupId: group.id, userId: u.id })}>
                              {t('groupDetailsPage.reject')}
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
                                  {t('groupDetailsPage.demote')}
                                </MenuItem>
                              ) : (
                                <MenuItem
                                  color={acceptPromoteTextColor}
                                  icon={<FaUserGraduate />}
                                  onClick={() => promoteUser({ groupId: group.id, userId: u.id })}
                                >
                                  {t('groupDetailsPage.promote')}
                                </MenuItem>
                              ))}
                            {u.role !== GroupRoles.ADMIN && (
                              <MenuItem
                                color="red"
                                icon={<FaUserSlash />}
                                onClick={() => removeFromGroup({ groupId: group.id, userId: u.id })}
                              >
                                {t('groupDetailsPage.kick')}
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
      </SimpleGrid>
      {users.length === 0 && (
        <Text textAlign="center" fontStyle="italic">
          {pending ? t('groupDetailsPage.noPendingMembers') : t('groupDetailsPage.noMembers')}
        </Text>
      )}
    </>
  )
}
