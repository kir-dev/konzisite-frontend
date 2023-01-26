import { Avatar, Badge, Box, Button, Heading, HStack, Stack, Text, useToast, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useJoinGroupMutation, useLeaveGroupMutation } from '../../../api/hooks/groupMutationHooks'
import { KonziError } from '../../../api/model/error.model'
import { GroupModel, GroupRoles } from '../../../api/model/group.model'
import { generateToastParams } from '../../../util/generateToastParams'
import { currentUser } from '../demoData'
import { GroupPreview } from '../types/groupPreview'
import { GroupListSkeleton } from './GroupListSkeleton'

type Props = {
  title: string
  noGroupsMessage: string
  groups?: GroupPreview[]
  loading?: boolean
  refetchList: () => void
}

export const GroupList = ({ groups, title, noGroupsMessage, loading = false, refetchList }: Props) => {
  const toast = useToast()
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

  if (loading) {
    return <GroupListSkeleton title={title} />
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
                        <Button colorScheme="red" onClick={() => undoJoin(g)} width="100%">
                          Kérelem visszavonása
                        </Button>
                      )}
                      {g.currentUserRole == GroupRoles.NONE && (
                        <Button colorScheme="brand" onClick={() => joinGroup(g.id)} width="100%">
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
