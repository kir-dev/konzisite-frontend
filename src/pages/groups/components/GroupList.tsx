import { Avatar, Badge, Box, Button, Heading, HStack, SimpleGrid, Stack, Text, useToast, VStack } from '@chakra-ui/react'
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
  refetchList: () => void
}

export const GroupList = ({ groups, title, noGroupsMessage, loading = false, mt = 0, refetchList }: Props) => {
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
        <Heading mb={4} mt={mt} size="lg">
          {title}
        </Heading>
        {groups && groups.length === 0 ? (
          <Text>{noGroupsMessage}</Text>
        ) : (
          <SimpleGrid columns={{ sm: 1, lg: 2 }} gap={4}>
            {groups?.map((g) => (
              <Box key={g.id} shadow="md" borderRadius={8} borderWidth={1}>
                <Stack as={Link} to={`${PATHS.GROUPS}/${g.id}`} direction={['column', 'row']} justify="space-between">
                  <HStack p={4}>
                    <Avatar size="md" name={g.name} src={''} />
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
