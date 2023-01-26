import { Avatar, Badge, Box, Button, Heading, HStack, Skeleton, SkeletonCircle, Stack, Text, VStack } from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { GroupModel, GroupRoles } from '../../../api/model/group.model'
import { groupModule } from '../../../api/modules/group.module'
import { currentUser } from '../demoData'
import { GroupPreview } from '../types/groupPreview'

type Props = {
  title: string
  noGroupsMessage: string
  groups?: GroupPreview[]
  loading?: boolean
  refetch: () => void
}

export const GroupList = ({ groups, title, noGroupsMessage, loading = false, refetch }: Props) => {
  const joinGroupMutation = useMutation((groupId: number) => groupModule.joinGroup(groupId))
  const leaveGroupMutation = useMutation((groupId: number) => groupModule.leaveGroup(groupId))

  const joinGroup = async (group: GroupModel) => {
    await joinGroupMutation.mutateAsync(group.id)
    refetch()
  }

  const leaveGroup = async (group: GroupModel) => {
    await leaveGroupMutation.mutateAsync(group.id)
    refetch()
  }

  if (loading) {
    return (
      <>
        <Heading mb={4} mt={3} size="lg">
          {title}
        </Heading>
        <VStack alignItems="stretch">
          <Box shadow="md" borderRadius={8} borderWidth={1}>
            <Stack direction={['column', 'row']}>
              <HStack flexGrow={1} p={4}>
                <SkeletonCircle size="48px" />
                <VStack flexGrow={1} alignItems="flex-start">
                  <Skeleton height="20px" width="50%" />
                  <Skeleton height="20px" width="20%" />
                </VStack>
              </HStack>
            </Stack>
          </Box>
          <Box shadow="md" borderRadius={8} borderWidth={1}>
            <Stack direction={['column', 'row']}>
              <HStack flexGrow={1} p={4}>
                <SkeletonCircle size="48px" />
                <VStack flexGrow={1} alignItems="flex-start">
                  <Skeleton height="20px" width="60%" />
                  <Skeleton height="20px" width="90%" />
                </VStack>
              </HStack>
            </Stack>
          </Box>
        </VStack>
      </>
    )
  } else {
    return (
      <>
        <Heading mb={4} mt={3} size="lg">
          {title}
        </Heading>
        {groups != undefined && groups.length == 0 ? (
          <Text>{noGroupsMessage}</Text>
        ) : (
          <VStack alignItems="stretch" mb={3}>
            {groups?.map((g) => (
              <Box key={g.id} shadow="md" borderRadius={8} borderWidth={1}>
                <Stack direction={['column', 'row']}>
                  <HStack flexGrow={1} as={Link} to={`/groups/${g.id}`} p={4}>
                    <Avatar size="md" name={g.name} src={''} />
                    <VStack flexGrow={1}>
                      <HStack justifyContent="space-between" width="100%">
                        <Stack direction={['column', 'row']} align="center">
                          <Heading size="md">{g.name}</Heading>
                          {g.currentUserRole === GroupRoles.PENDING && <Badge colorScheme="red">Függőben</Badge>}
                        </Stack>
                        <Heading size="md" textAlign="right">
                          Tulajdonos: {g.owner.id == currentUser.id ? 'Te' : g.owner.fullName}
                        </Heading>
                      </HStack>
                      <HStack justifyContent="space-between" width="100%">
                        <Text>{g.memberCount} tag</Text>
                        <Text textAlign="right">Létrehozva: {new Date(g.createdAt).toLocaleDateString('hu-HU')}</Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  {(g.currentUserRole == GroupRoles.PENDING || g.currentUserRole == GroupRoles.NONE) && (
                    <VStack p={2} justifyContent="center">
                      {g.currentUserRole == GroupRoles.PENDING && (
                        <Button colorScheme="red" onClick={() => leaveGroup(g)} width="100%">
                          Kérelem visszavonása
                        </Button>
                      )}
                      {g.currentUserRole == GroupRoles.NONE && (
                        <Button colorScheme="brand" onClick={() => joinGroup(g)} width="100%">
                          Csatlakozás
                        </Button>
                      )}
                    </VStack>
                  )}
                </Stack>
              </Box>
            ))}
          </VStack>
        )}
      </>
    )
  }
}
