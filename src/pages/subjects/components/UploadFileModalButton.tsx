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
import { ReactNode } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FaFileCsv } from 'react-icons/fa'
import { UseMutationResult } from 'react-query'
import { KonziError } from '../../../api/model/error.model'
import { FileUpload } from '../../../components/form-elements/FileUpload'

type Props = {
  mutation: UseMutationResult<unknown, KonziError, FormData, unknown>
  modalTitle: string
  confirmButtonText: string
  children: ReactNode
  extraButton?: ReactNode
}

export const UploadFileModalButton = ({ mutation, modalTitle, confirmButtonText, children, extraButton }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const methods = useForm<{ files: FileList | undefined }>({ mode: 'all' })
  const {
    handleSubmit,
    formState: { isValid },
    reset
  } = methods

  const onSubmitFile: SubmitHandler<{ files: FileList | undefined }> = async (values) => {
    if (values.files) {
      const formData = new FormData()
      formData.append('file', values.files[0])
      mutation.mutate(formData, {
        onSuccess: () => {
          onClose()
        }
      })
    }
  }

  const onCancelPressed = () => {
    onClose()
    reset()
  }

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        {modalTitle}
      </Button>
      <Modal isOpen={isOpen} onClose={onCancelPressed} size="xl">
        <ModalOverlay />
        <ModalContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitFile)}>
              <ModalHeader>{modalTitle}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {children}

                <FileUpload required fieldName="files" buttonIcon={<FaFileCsv />} accept=".csv" />
              </ModalBody>
              <ModalFooter>
                {extraButton}

                <Spacer />
                <Button mr={3} onClick={onCancelPressed} type="button">
                  Mégse
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
