import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer } from '@chakra-ui/react'
import { FC } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FaUpload } from 'react-icons/fa'
import { useMutation } from 'react-query'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { userModule } from '../../../api/modules/user.module'
import { FileUpload } from '../../../components/form-elements/FileUpload'

type Props = {
  isOpen: boolean
  onClose: () => void
}

/**
 * Not in use yet!
 */
export const UploadImageModal: FC<Props> = ({ isOpen, onClose }) => {
  const methods = useForm<{ files: FileList | undefined }>({ mode: 'all' })
  const {
    handleSubmit,
    formState: { isValid },
    setError,
    setValue
  } = methods
  const { loggedInUser, refetchUser } = useAuthContext()
  const mutation = useMutation(userModule.uploadProfileImage, {
    onSuccess: () => {
      refetchUser()
      onCancelPressed()
    },
    onError: (error) => {
      const err = error as any
      console.log('[DEBUG] Error at uploadProfileImage', err.toJSON())
      setError('files', { type: 'custom', message: err.response.data.message || err.message })
      setValue('files', undefined)
    }
  })

  const onSubmitFile: SubmitHandler<{ files: FileList | undefined }> = (values) => {
    if (values.files) mutation.mutate({ imageFile: values.files[0] })
  }

  const onCancelPressed = () => {
    onClose()
    setValue('files', undefined)
  }

  if (!loggedInUser) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nem vagy bejelentkezve!</ModalHeader>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitFile)}>
            <ModalHeader>Profilkép megváltoztatása</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FileUpload required fieldName="files" helper={<>Válassz képet feltöltésre!</>} />
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" colorScheme="theme" mr={3} onClick={onCancelPressed} type="button">
                Mégse
              </Button>
              <Spacer />
              <Button rightIcon={<FaUpload />} colorScheme="theme" disabled={!isValid} isLoading={mutation.isLoading} type="submit">
                Küldés
              </Button>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  )
}
