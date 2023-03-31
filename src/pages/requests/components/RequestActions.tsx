import { Button, Menu, MenuButton, MenuItem, MenuList, useColorModeValue } from '@chakra-ui/react'
import { useRef } from 'react'
import { FaChevronDown, FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ConfirmDialogButton } from '../../../components/commons/ConfirmDialogButton'
import { PATHS } from '../../../util/paths'

type Props = {
  requestId: number
  deleteRequest: (id: number) => void
}

export const RequestActions = ({ requestId, deleteRequest }: Props) => {
  const editTextColor = useColorModeValue('brand.500', 'brand.200')
  const deleteButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <Menu>
      <MenuButton as={Button} w="100%" colorScheme="brand" rightIcon={<FaChevronDown />}>
        Műveletek
      </MenuButton>
      <MenuList>
        <MenuItem color={editTextColor} as={Link} to={`${PATHS.REQUESTS}/${requestId}/edit`} icon={<FaEdit />}>
          Szerkesztés
        </MenuItem>
        <ConfirmDialogButton
          initiatorButton={
            <MenuItem color="red" ref={deleteButtonRef} icon={<FaTrash />}>
              Törlés
            </MenuItem>
          }
          initiatorButtonRef={deleteButtonRef}
          headerText="Konzi kérés törlése"
          bodyText="Biztos törölni szeretnéd a konzi kérést?"
          confirmButtonText="Törlés"
          confirmAction={() => deleteRequest(requestId)}
        />
      </MenuList>
    </Menu>
  )
}
