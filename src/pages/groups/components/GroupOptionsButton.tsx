import { Button } from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { GroupModel, GroupRoles } from '../../../api/model/group.model'
import { groupModule } from '../../../api/modules/group.module'
import { GroupDetails } from '../types/groupDetails'

type props = {
  group: GroupDetails
  refetch: () => {}
}

export const GroupOptionsButton = ({ group, refetch }: props) => {
  const deleteGroup = () => {
    alert(`delete group ${group?.id}`)
  }

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

  switch (group.currentUserRole) {
    case GroupRoles.OWNER:
      return (
        <>
          <Button as={Link} to={`/groups/${group.id}/edit`} colorScheme="brand">
            Szerkesztés
          </Button>
          <Button colorScheme="red" onClick={deleteGroup}>
            Törlés
          </Button>
        </>
      )
    case GroupRoles.ADMIN:
    case GroupRoles.MEMBER:
      return (
        <Button colorScheme="red" onClick={() => leaveGroup(group)}>
          Kilépés
        </Button>
      )
    case GroupRoles.PENDING:
      return (
        <Button colorScheme="red" onClick={() => leaveGroup(group)}>
          Kérelem visszavonása
        </Button>
      )
    default:
      return (
        <Button colorScheme="brand" onClick={() => joinGroup(group)}>
          Csatlakozás
        </Button>
      )
  }
}
