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
  useMediaQuery,
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
  buttonWidth?: string
  modalTitle: string
  successMessage: string
  previousName?: string
  mutation: UseMutationResult<GroupModel, KonziError, CreateGroup, unknown>
  refetch: () => void
}

export const GroupEditModalButton = ({
  buttonText,
  buttonWidth,
  modalTitle,
  previousName = '',
  mutation,
  successMessage,
  refetch
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState<string>(previousName)
  const toast = useToast()

  const [largeScreen] = useMediaQuery('(min-width: 30rem)')

  const initialRef = useRef<HTMLInputElement>(null)
  const onSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    initialRef.current?.blur()
    mutation.mutate(
      { name },
      {
        onSuccess: () => {
          toast({ title: successMessage, status: 'success' })
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
      <Button
        colorScheme="brand"
        width={buttonWidth}
        onClick={() => {
          setName(previousName)
          onOpen()
        }}
      >
        {buttonText}
      </Button>

      <Modal
        isCentered={largeScreen ? true : false}
        motionPreset="slideInBottom"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Csoport neve</FormLabel>
                <Input autoFocus ref={initialRef} placeholder="Csoport neve" value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} mr={3}>
                Mégse
              </Button>
              <Button type="submit" isDisabled={!name} isLoading={mutation.isLoading} colorScheme="brand" onClick={(e) => onSave(e)}>
                Mentés
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
