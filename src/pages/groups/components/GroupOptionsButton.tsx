import { Button, useToast } from '@chakra-ui/react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const navigate = useNavigate()
  const deleteGroupRef = useRef<HTMLButtonElement>(null)
  const leaveGroupRef = useRef<HTMLButtonElement>(null)

  const onErrorFn = (e: KonziError) => {
    toast(generateToastParams(e, t))
  }

  const joinGroupMutation = useJoinGroupMutation(() => {
    toast({ title: t('groupDetailsPage.groupJoined'), status: 'success' })
    refetchDetails()
  }, onErrorFn)

  const leaveGroupMutation = useLeaveGroupMutation(onErrorFn)
  const editGroupMutation = useEditGroupMutation(group.id)

  const deleteGroupMutation = useDeleteGroupMutation(() => {
    toast({ title: t('groupDetailsPage.groupDeleted'), status: 'success' })
    navigate(PATHS.GROUPS)
  }, onErrorFn)

  const deleteGroup = () => {
    deleteGroupMutation.mutate(group.id)
  }

  const undoRequest = () => {
    leaveGroupMutation.mutate(group.id, {
      onSuccess: () => {
        toast({ title: t('groupDetailsPage.requestWithdrawn'), status: 'success' })
        refetchDetails()
      }
    })
  }
  const leaveGroup = () => {
    leaveGroupMutation.mutate(group.id, {
      onSuccess: () => {
        toast({ title: t('groupDetailsPage.leftGroup'), status: 'success' })
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
      {t('groupDetailsPage.makeKonzi')}
    </Button>
  )

  switch (group.currentUserRole) {
    case GroupRoles.OWNER:
      return (
        <>
          {HoldKonziButton}
          <GroupEditModalButton
            buttonText={t('groupDetailsPage.edit')}
            buttonWidth="100%"
            modalTitle={t('groupDetailsPage.editGroup')}
            successMessage={t('groupDetailsPage.groupEdited')}
            mutation={editGroupMutation}
            refetch={refetchDetails}
            previousName={group.name}
          />
          <ConfirmDialogButton
            initiatorButton={
              <Button w="100%" ref={deleteGroupRef} colorScheme="red">
                {t('groupDetailsPage.delete')}
              </Button>
            }
            initiatorButtonRef={deleteGroupRef}
            headerText={t('groupDetailsPage.deleteGroup')}
            bodyText={t('groupDetailsPage.confirmDelete')}
            confirmButtonText={t('groupDetailsPage.delete')}
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
                {t('groupDetailsPage.leave')}
              </Button>
            }
            initiatorButtonRef={leaveGroupRef}
            headerText={t('groupDetailsPage.leaveGroup')}
            bodyText={t('groupDetailsPage.confirmLeave')}
            confirmButtonText={t('groupDetailsPage.leave')}
            confirmAction={leaveGroup}
          />
        </>
      )
    case GroupRoles.PENDING:
      return (
        <>
          {HoldKonziButton}
          <Button w="100%" colorScheme="red" onClick={undoRequest}>
            {t('groupDetailsPage.withdrawReq')}
          </Button>
        </>
      )
    default:
      return (
        <>
          {HoldKonziButton}
          <Button w="100%" colorScheme="brand" onClick={() => joinGroupMutation.mutate(group.id)}>
            {t('groupDetailsPage.join')}
          </Button>
        </>
      )
  }
}
