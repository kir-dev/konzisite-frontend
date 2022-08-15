import { Avatar, Box, Button, Heading, HStack, Skeleton, SkeletonCircle, Stack, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { GroupModel, GroupRoles } from '../../../api/model/group.model'
import { currentUser } from '../demoData'
import { GroupPreview } from '../types/groupPreview'

type Props = {
  title: string
  groups: GroupPreview[]
  showOwner?: boolean
  showJoinButton?: boolean
  loading?: boolean
}

export const GroupList = ({ groups, showOwner = true, showJoinButton = false, title, loading = false }: Props) => {
  const joinGroup = (group: GroupModel) => {
    return () => {
      alert(`join group ${group.id}`)
    }
  }

  const leaveGroup = (group: GroupModel) => {
    return () => {
      alert(`leave group ${group.id}`)
    }
  }

  if (loading)
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
  else
    return (
      <>
        <Heading mb={4} mt={3} size="lg">
          {title}
        </Heading>
        <VStack alignItems="stretch" mb={3}>
          {groups.map((g) => (
            <Box key={g.id} shadow="md" borderRadius={8} borderWidth={1}>
              <Stack direction={['column', 'row']}>
                <HStack flexGrow={1} as={Link} to={`/groups/${g.id}`} p={4}>
                  <Avatar size="md" name={g.name} src={''} />
                  <VStack flexGrow={1}>
                    <HStack justifyContent="space-between" width="100%">
                      <Heading size="md">{g.name}</Heading>
                      {showOwner && (
                        <Heading size="md" textAlign="right">
                          Tulajdonos: {g.owner.id == currentUser.id ? 'Te' : `${g.owner.lastName} ${g.owner.firstName}`}
                        </Heading>
                      )}
                    </HStack>
                    <HStack justifyContent="space-between" width="100%">
                      <Text>{g.memberCount} tag</Text>
                      <Text textAlign="right">Létrehozva: {g.createdAt.toLocaleDateString()}</Text>
                    </HStack>
                  </VStack>
                </HStack>
                {showJoinButton && (g.role == GroupRoles.PENDING || g.role == GroupRoles.NONE) && (
                  <VStack p={2} justifyContent="center">
                    {g.role == GroupRoles.PENDING && (
                      <Button colorScheme="red" onClick={leaveGroup(g)} width="100%">
                        Kérelem visszavonása
                      </Button>
                    )}
                    {g.role == GroupRoles.NONE && (
                      <Button colorScheme="brand" onClick={joinGroup(g)} width="100%">
                        Csatlakozás
                      </Button>
                    )}
                  </VStack>
                )}
              </Stack>
            </Box>
          ))}
        </VStack>
      </>
    )
}
