import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaChevronDown, FaUserCheck, FaUserGraduate, FaUserInjured, FaUserSlash, FaUserTimes } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { GroupRoles } from '../../api/model/group.model'
import { UserModel } from '../../api/model/user.model'
import { ErrorPage } from '../error/ErrorPage'
import { GroupOptionsButton } from './components/GroupOptionsButton'
import { currentUser, testGroupsDetails } from './demoData'
import { GroupDetails } from './types/groupDetails'

export const GroupDetailsPage = () => {
  const [loading, setLoading] = useState(true)
  const groupId = parseInt(useParams<{ groupId: string }>().groupId ?? '-1')
  const [group, setGroup] = useState<GroupDetails>()
  const [displayOnlyPending, setDisplayOnlyPending] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setGroup(testGroupsDetails.find((g) => g.id === groupId))
      setLoading(false)
    }, 1000)
  }, [])

  const acceptUser = (user: UserModel) => {
    return () => {
      alert(`accept user ${user.id} in group ${group?.id}`)
    }
  }

  const rejectUser = (user: UserModel) => {
    return () => {
      alert(`reject user ${user.id} in group ${group?.id}`)
    }
  }

  const demoteUser = (user: UserModel) => {
    return () => {
      alert(`demote user ${user.id} in group ${group?.id}`)
    }
  }

  const promoteUser = (user: UserModel) => {
    return () => {
      alert(`promote user ${user.id} in group ${group?.id}`)
    }
  }

  const removeUser = (user: UserModel) => {
    return () => {
      alert(`remove user ${user.id} in group ${group?.id}`)
    }
  }

  if (loading)
    return (
      <>
        <VStack mb={3} alignItems="flex-start">
          <Skeleton height="44px" width="50%" mb={3} alignSelf="center" />
          <Skeleton height="36px" width="60%" />
          <Skeleton height="36px" width="90%" />
          <Skeleton height="36px" width="40%" />
        </VStack>
        <VStack alignItems="stretch">
          <Box shadow="md" borderRadius={8} borderWidth={1}>
            <Stack direction={['column', 'row']}>
              <HStack flexGrow={1} p={4}>
                <SkeletonCircle size="48px" />
                <VStack flexGrow={1} alignItems="flex-start">
                  <Skeleton height="20px" width="60%" />
                  <Skeleton height="20px" width="80%" />
                </VStack>
              </HStack>
            </Stack>
          </Box>
          <Box shadow="md" borderRadius={8} borderWidth={1}>
            <Stack direction={['column', 'row']}>
              <HStack flexGrow={1} p={4}>
                <SkeletonCircle size="48px" />
                <VStack flexGrow={1} alignItems="flex-start">
                  <Skeleton height="20px" width="40%" />
                  <Skeleton height="20px" width="50%" />
                </VStack>
              </HStack>
            </Stack>
          </Box>
          <Box shadow="md" borderRadius={8} borderWidth={1}>
            <Stack direction={['column', 'row']}>
              <HStack flexGrow={1} p={4}>
                <SkeletonCircle size="48px" />
                <VStack flexGrow={1} alignItems="flex-start">
                  <Skeleton height="20px" width="90%" />
                  <Skeleton height="20px" width="100%" />
                </VStack>
              </HStack>
            </Stack>
          </Box>
        </VStack>
      </>
    )
  else
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
                <Heading size="lg">Létrehozva: {group.createdAt.toLocaleDateString()}</Heading>
                {<Heading size="lg">Szerepkör: {group.currentUserRole}</Heading>}
              </VStack>
              <VStack alignItems="stretch">
                <GroupOptionsButton group={group} />
              </VStack>
            </Stack>
            <Stack direction={['column', 'row']} justifyContent="space-between" mb={3}>
              <Heading size="lg" mb={2}>
                Tagok ({group.members.length})
              </Heading>
              <Checkbox size="lg" isChecked={displayOnlyPending} onChange={(e) => setDisplayOnlyPending(e.target.checked)}>
                Csak függőben lévő
              </Checkbox>
            </Stack>
            <VStack alignItems="stretch">
              {group.members
                .filter((u) => u.role === GroupRoles.PENDING || !displayOnlyPending)
                .map((u) => (
                  <Box key={u.id} shadow="md" borderRadius={8} borderWidth={1}>
                    <Stack direction={['column', 'row']}>
                      <HStack flexGrow={1} as={Link} to={`/users/${u.id}`} p={4}>
                        <Avatar size="md" name={`${u.lastName} ${u.firstName}`} src={''} />
                        <VStack flexGrow={1}>
                          <Heading size="md" width="100%">
                            {u.lastName} {u.firstName}
                            {u.id === group.owner.id && (
                              <Badge colorScheme="brand" ml={1}>
                                Tulajdonos
                              </Badge>
                            )}
                            {u.id === currentUser.id && (
                              <Badge colorScheme="brand" ml={1}>
                                Te
                              </Badge>
                            )}
                          </Heading>
                          <HStack justifyContent="space-between" width="100%">
                            <Text>{u.role}</Text>
                            <Text textAlign="right">Csatlakozás: {u.joinedAt.toLocaleDateString()}</Text>
                          </HStack>
                        </VStack>
                      </HStack>
                      {(group.currentUserRole == GroupRoles.ADMIN || group.currentUserRole == GroupRoles.OWNER) &&
                        u.id !== group.owner.id &&
                        u.id !== currentUser.id && (
                          <Flex alignItems="center" p={2}>
                            <Menu>
                              <MenuButton as={Button} colorScheme="brand" rightIcon={<FaChevronDown />} width="100%">
                                Szerkesztés
                              </MenuButton>
                              <MenuList>
                                {u.role === GroupRoles.PENDING ? (
                                  <>
                                    <MenuItem color="green" icon={<FaUserCheck />} onClick={acceptUser(u)}>
                                      Elfogadás
                                    </MenuItem>
                                    <MenuItem color="red" icon={<FaUserTimes />} onClick={rejectUser(u)}>
                                      Elutasátas
                                    </MenuItem>
                                  </>
                                ) : (
                                  <>
                                    {group.currentUserRole == GroupRoles.OWNER &&
                                      (u.role === GroupRoles.ADMIN ? (
                                        <MenuItem color="red" icon={<FaUserInjured />} onClick={demoteUser(u)}>
                                          Lefokozás
                                        </MenuItem>
                                      ) : (
                                        <MenuItem color="green" icon={<FaUserGraduate />} onClick={promoteUser(u)}>
                                          Előléptetés
                                        </MenuItem>
                                      ))}
                                    <MenuItem color="red" icon={<FaUserSlash />} onClick={removeUser(u)}>
                                      Eltávolítás
                                    </MenuItem>
                                  </>
                                )}
                              </MenuList>
                            </Menu>
                          </Flex>
                        )}
                    </Stack>
                  </Box>
                ))}
            </VStack>
          </>
        )}
      </>
    )
}
