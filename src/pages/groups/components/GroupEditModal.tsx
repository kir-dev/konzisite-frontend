import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { UseMutationResult } from 'react-query'
import { KonziError } from '../../../api/model/error.model'
import { GroupModel } from '../../../api/model/group.model'
import { generateToastParams } from '../../../util/generateToastParams'
import { CreateGroup } from '../types/createGroup'

type Props = {
  buttonText: string
  modalTitle: string
  successMessage: string
  previousName?: string
  mutation: UseMutationResult<GroupModel, KonziError, CreateGroup, unknown>
  refetch: () => void
}

export const GroupEditModal = ({ buttonText, modalTitle, previousName = '', mutation, successMessage, refetch }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState<string>(previousName)
  const toast = useToast()

  const initialRef = useRef(null)
  const onSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    mutation.mutate(
      { name },
      {
        onSuccess: () => {
          toast({ title: successMessage, status: 'success' })
          if (!previousName) {
            setName('')
          }
          refetch()
          onClose()
        },
        onError: (e: KonziError) => {
          toast(generateToastParams(e))
        }
      }
    )
  }
  return (
    <>
      <Button colorScheme="brand" onClick={onOpen}>
        {buttonText}
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Csoport neve</FormLabel>
                <Input ref={initialRef} placeholder="Csoport neve" value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} mr={3}>
                Mégse
              </Button>
              <Button type="submit" isDisabled={!name} colorScheme="brand" onClick={(e) => onSave(e)}>
                Mentés
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
