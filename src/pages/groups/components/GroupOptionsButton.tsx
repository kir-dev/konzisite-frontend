import { Button, useToast } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useDeleteGroupMutation, useJoinGroupMutation, useLeaveGroupMutation } from '../../../api/hooks/groupMutationHooks'
import { KonziError } from '../../../api/model/error.model'
import { GroupRoles } from '../../../api/model/group.model'
import { generateToastParams } from '../../../util/generateToastParams'
import { GroupDetails } from '../types/groupDetails'

type props = {
  group: GroupDetails
  refetchDetails: () => {}
}

export const GroupOptionsButton = ({ group, refetchDetails }: props) => {
  const toast = useToast()
  const navigate = useNavigate()

  const onErrorFn = (e: KonziError) => {
    toast(generateToastParams(e))
  }

  const joinGroupMutation = useJoinGroupMutation(() => {
    toast({ title: 'Csatlakoztál a csoporthoz!', status: 'success' })
    refetchDetails()
  }, onErrorFn)

  const leaveGroupMutation = useLeaveGroupMutation(onErrorFn)

  const deleteGroupMutation = useDeleteGroupMutation(() => {
    toast({ title: 'Törölted a csoportot!', status: 'success' })
    navigate('/groups')
  }, onErrorFn)

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
