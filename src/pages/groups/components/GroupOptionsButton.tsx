import { Button, useToast } from '@chakra-ui/react'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { KonziError } from '../../../api/model/error.model'
import { GroupModel, GroupRoles } from '../../../api/model/group.model'
import { UserToGroup } from '../../../api/model/userToGroup.model'
import { groupModule } from '../../../api/modules/group.module'
import { generateToastParams } from '../../../util/generateToastParams'
import { GroupDetails } from '../types/groupDetails'

type props = {
  group: GroupDetails
  refetchDetails: () => {}
}

export const GroupOptionsButton = ({ group, refetchDetails }: props) => {
  const toast = useToast()
  const navigate = useNavigate()

  const mutationOnError = (e: KonziError) => {
    toast(generateToastParams(e))
  }

  const joinGroupMutation = useMutation<UserToGroup, KonziError, number>((groupId: number) => groupModule.joinGroup(groupId), {
    onSuccess: () => {
      toast({ title: 'Csatlakoztál a csoporthoz!', status: 'success' })
      refetchDetails()
    },
    onError: mutationOnError
  })
  const leaveGroupMutation = useMutation<UserToGroup, KonziError, number>((groupId: number) => groupModule.leaveGroup(groupId), {
    onError: mutationOnError
  })

  const deleteGroupMutation = useMutation<GroupModel, KonziError, number>((groupId: number) => groupModule.deleteGroup(groupId), {
    onSuccess: () => {
      toast({ title: 'Törölted a csoportot!', status: 'success' })
      navigate('/groups')
    },
    onError: mutationOnError
  })

  const deleteGroup = () => {
    // TODO confirm modal
    deleteGroupMutation.mutate(group.id)
  }

  const undoRequest = () => {
    leaveGroupMutation.mutate(group.id, {
      onSuccess: () => {
        toast({ title: 'Visszavontad a csatlakozási kérelmed!', status: 'success' })
        refetchDetails()
      }
    })
  }
  const leaveGroup = () => {
    leaveGroupMutation.mutate(group.id, {
      onSuccess: () => {
        toast({ title: 'Kiléptél a csoportból!', status: 'success' })
        refetchDetails()
      }
    })
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
        <Button colorScheme="red" onClick={leaveGroup}>
          Kilépés
        </Button>
      )
    case GroupRoles.PENDING:
      return (
        <Button colorScheme="red" onClick={undoRequest}>
          Kérelem visszavonása
        </Button>
      )
    default:
      return (
        <Button colorScheme="brand" onClick={() => joinGroupMutation.mutate(group.id)}>
          Csatlakozás
        </Button>
      )
  }
}
