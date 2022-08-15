import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { GroupRoles } from '../../../api/model/group.model'
import { GroupDetails } from '../types/groupDetails'

type props = {
  group: GroupDetails
}

export const GroupOptionsButton = ({ group }: props) => {
  const deleteGroup = () => {
    alert(`delete group ${group?.id}`)
  }

  const joinGroup = () => {
    alert(`join group ${group?.id}`)
  }

  const leaveGroup = () => {
    alert(`leave group ${group?.id}`)
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
        <Button colorScheme="red" onClick={leaveGroup}>
          Kérelem visszavonása
        </Button>
      )
    default:
      return (
        <Button colorScheme="brand" onClick={joinGroup}>
          Csatlakozás
        </Button>
      )
  }
}
