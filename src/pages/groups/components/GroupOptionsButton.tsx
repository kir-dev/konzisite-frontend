import { Button, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import {
  useDeleteGroupMutation,
  useEditGroupMutation,
  useJoinGroupMutation,
  useLeaveGroupMutation
} from '../../../api/hooks/groupMutationHooks'
import { KonziError } from '../../../api/model/error.model'
import { GroupRoles } from '../../../api/model/group.model'
import { ConfirmDialogButton } from '../../../components/commons/ConfirmDialogButton'
import { generateToastParams } from '../../../util/generateToastParams'
import { PATHS } from '../../../util/paths'
import { GroupDetails } from '../types/groupDetails'
import { GroupEditModalButton } from './GroupEditModalButton'

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
    navigate(PATHS.GROUPS)
  }, onErrorFn)

  const deleteGroup = () => {
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
          <GroupEditModalButton
            buttonText="Szerkesztés"
            buttonWidth="100%"
            modalTitle="Csoport szerkesztése"
            successMessage="Csoport sikeresen szerkesztve"
            mutation={useEditGroupMutation(group.id)}
            refetch={refetchDetails}
            previousName={group.name}
          />
          <ConfirmDialogButton
            buttonColorSchene="red"
            buttonWidth="100%"
            buttonText="Törlés"
            headerText="Csoport törlése"
            bodyText="Biztos törölni szeretnéd a csoportot?"
            confirmButtonText="Törlés"
            confirmAction={deleteGroup}
          />
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
