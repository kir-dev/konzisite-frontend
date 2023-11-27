import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure
} from '@chakra-ui/react'
import { ReactElement, ReactNode, RefObject, useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { UseMutationResult } from 'react-query'
import { KonziError } from '../../api/model/error.model'
import { FileUpload } from '../form-elements/FileUpload'

type Props = {
  mutation: UseMutationResult<unknown, KonziError, FormData, unknown>
  modalTitle: string
  confirmButtonText: string
  children: ReactNode
  accept: string
  fileIcon: ReactElement
  initiatorButton: ReactElement
  initiatorButtonRef: RefObject<HTMLButtonElement>
  extraButton?: ReactNode
}

export const UploadFileModalButton = ({
  mutation,
  modalTitle,
  confirmButtonText,
  children,
  extraButton,
  accept,
  fileIcon,
  initiatorButton,
  initiatorButtonRef
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const methods = useForm<{ files: FileList | undefined }>({ mode: 'all' })
  const {
    handleSubmit,
    formState: { isValid },
    reset
  } = methods
  const { t } = useTranslation()

  const onSubmitFile: SubmitHandler<{ files: FileList | undefined }> = async (values) => {
    if (values.files) {
      const formData = new FormData()
      formData.append('file', values.files[0])
      mutation.mutate(formData, {
        onSuccess: () => {
          onClose()
          reset()
        }
      })
    }
  }
  useEffect(() => {
    if (initiatorButtonRef?.current) {
      initiatorButtonRef.current.onclick = onOpen
    }
  }, [])

  const onCancelPressed = () => {
    onClose()
    reset()
  }

  return (
    <>
      {initiatorButton}
      <Modal isOpen={isOpen} onClose={onCancelPressed} size="xl">
        <ModalOverlay />
        <ModalContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitFile)}>
              <ModalHeader>{modalTitle}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {children}

                <FileUpload required fieldName="files" buttonIcon={fileIcon} accept={accept} />
              </ModalBody>
              <ModalFooter>
                {extraButton}

                <Spacer />
                <Button mr={3} onClick={onCancelPressed} type="button">
                  {t('profilePage.cancel')}
                </Button>
                <Button colorScheme="brand" isDisabled={!isValid} isLoading={mutation.isLoading} type="submit">
                  {confirmButtonText}
                </Button>
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  )
}
