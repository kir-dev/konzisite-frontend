import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
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
import { useTranslation } from 'react-i18next'
import { UseMutationResult } from 'react-query'
import { KonziError } from '../../../api/model/error.model'
import { GroupModel } from '../../../api/model/group.model'
import { getStatusString } from '../../../components/editor/editorUtils'
import { MAX_TITLE_LENGTH } from '../../../util/constants'
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
  const { t } = useTranslation()
  const [largeScreen] = useMediaQuery('(min-width: 48em)')

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

  const lenghtError = name.length > MAX_TITLE_LENGTH

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

      <Modal isCentered={largeScreen} motionPreset="slideInBottom" initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>{t('groupListPage.groupName')}</FormLabel>
                <Input
                  autoFocus
                  ref={initialRef}
                  placeholder={t('groupListPage.groupName')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Flex justifyContent="flex-end">
                  {lenghtError && (
                    <FormHelperText color="red.500">
                      {t('groupListPage.tooLong')} {getStatusString(name, MAX_TITLE_LENGTH)}
                    </FormHelperText>
                  )}
                </Flex>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} mr={3}>
                {t('groupListPage.cancel')}
              </Button>
              <Button
                type="submit"
                isDisabled={!name || lenghtError}
                isLoading={mutation.isLoading}
                colorScheme="brand"
                onClick={(e) => onSave(e)}
              >
                {t('groupListPage.save')}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
