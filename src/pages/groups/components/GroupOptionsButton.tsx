import { Button, useToast } from '@chakra-ui/react'
import { useRef } from 'react'
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
  const deleteGroupRef = useRef<HTMLButtonElement>(null)
  const leaveGroupRef = useRef<HTMLButtonElement>(null)

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
  const HoldKonziButton = (
    <Button
      w={['100%', 'max']}
      colorScheme="brand"
      onClick={() => {
        navigate(`${PATHS.CONSULTATIONS}/new`, { state: { group } })
      }}
    >
      Konzi tartása
    </Button>
  )

  switch (group.currentUserRole) {
    case GroupRoles.OWNER:
      return (
        <>
          {HoldKonziButton}
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
            initiatorButton={
              <Button w="100%" ref={deleteGroupRef} colorScheme="red">
                Törlés
              </Button>
            }
            initiatorButtonRef={deleteGroupRef}
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
        <>
          {HoldKonziButton}
          <ConfirmDialogButton
            initiatorButton={
              <Button w="100%" ref={leaveGroupRef} colorScheme="red">
                Kilépés
              </Button>
            }
            initiatorButtonRef={leaveGroupRef}
            headerText="Kilépés a csoportból"
            bodyText="Biztos ki szeretnél lépni a csoportból?"
            confirmButtonText="Kilépés"
            confirmAction={leaveGroup}
          />
        </>
      )
    case GroupRoles.PENDING:
      return (
        <>
          {HoldKonziButton}
          <Button w="100%" colorScheme="red" onClick={undoRequest}>
            Kérelem visszavonása
          </Button>
        </>
      )
    default:
      return (
        <>
          {HoldKonziButton}
          <Button w="100%" colorScheme="brand" onClick={() => joinGroupMutation.mutate(group.id)}>
            Csatlakozás
          </Button>
        </>
      )
  }
}
