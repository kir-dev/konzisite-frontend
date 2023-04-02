import { Button, Menu, MenuButton, MenuItem, MenuList, useColorModeValue, useToast } from '@chakra-ui/react'
import { useRef } from 'react'
import { FaChevronDown, FaEdit, FaTrash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDeleteRequestMutation } from '../../../api/hooks/requestMutationHooks'
import { KonziError } from '../../../api/model/error.model'
import { ConfirmDialogButton } from '../../../components/commons/ConfirmDialogButton'
import { generateToastParams } from '../../../util/generateToastParams'
import { PATHS } from '../../../util/paths'

type Props = {
  requestId: number
}

export const RequestActions = ({ requestId }: Props) => {
  const toast = useToast()
  const navigate = useNavigate()

  const { mutate: deleteRequest } = useDeleteRequestMutation(
    () => {
      toast({ title: 'Sikeresen törölted a konzi kérést!', status: 'success' })
      navigate(PATHS.REQUESTS)
    },
    (e: KonziError) => toast(generateToastParams(e))
  )

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
