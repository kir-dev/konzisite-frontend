import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useCheckboxGroup,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { ReactElement, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { UseMutationResult } from 'react-query'
import { KonziError } from '../../../api/model/error.model'
import { Major, SubjectModel } from '../../../api/model/subject.model'
import { ConfirmDialogButton } from '../../../components/commons/ConfirmDialogButton'
import { generateToastParams } from '../../../util/generateToastParams'
import { MajorArray, isMajor } from '../../../util/majorHelpers'
import { CreateSubject } from '../types/CreateSubject'
import { MajorCheckbox } from './MajorCheckbox'

type Props = {
  buttonText: string
  buttonIcon?: ReactElement
  modalTitle: string
  successMessage: string
  previousData?: SubjectModel
  mutation: UseMutationResult<SubjectModel, KonziError, { formData: CreateSubject; subjectId: number }, unknown>
  refetch: () => void
  deleteAction?: (id: number, options: { onSuccess: () => void }) => void
}

export const SubjectEditModalButton = ({
  buttonText,
  modalTitle,
  mutation,
  successMessage,
  refetch,
  previousData,
  buttonIcon,
  deleteAction
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { value: selectedMajors, getCheckboxProps, setValue: setSelectedMajors } = useCheckboxGroup()
  const toast = useToast()
  const deleteSubjectRef = useRef<HTMLButtonElement>(null)
  const { t } = useTranslation()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset
  } = useForm<CreateSubject>()

  const onModalOpen = () => {
    onOpen()
    reset()
    setSelectedMajors([])
    if (previousData) {
      setValue('name', previousData.name)
      setValue('englishName', previousData.englishName)
      setValue('code', previousData.code)
      setSelectedMajors(previousData.majors)
    }
  }

  const onSubmit = handleSubmit((data) => {
    if (selectedMajors.length === 0) {
      return
    }
    mutation.mutate(
      {
        formData: {
          ...data,
          majors: selectedMajors
            .filter((m) => isMajor(m))
            .map((m) => {
              if (isMajor(m)) {
                return Major[m]
              }
              return Major.SE_MSC // this should never happen because of the filter, but TS won't shut up
            })
        },
        subjectId: previousData?.id || 0
      },
      {
        onSuccess: () => {
          toast({ title: successMessage, status: 'success' })
          refetch()
          onClose()
        },
        onError: (e: KonziError) => {
          toast(generateToastParams(e, t))
        }
      }
    )
  })

  return (
    <>
      {buttonIcon ? (
        <IconButton icon={buttonIcon} colorScheme="brand" onClick={onModalOpen} aria-label={buttonText} />
      ) : (
        <Button colorScheme="brand" onClick={onModalOpen}>
          {buttonText}
        </Button>
      )}

      <Modal size="lg" isCentered motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit} noValidate>
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mb={3} isInvalid={!!errors.code} isRequired>
                <FormLabel>Tárgykód</FormLabel>
                <Input placeholder="VIAU1234" {...register('code', { required: true })} />
                {errors.code && <FormErrorMessage>A tárgykód kötelező!</FormErrorMessage>}
              </FormControl>
              <FormControl mb={3} isInvalid={!!errors.name} isRequired>
                <FormLabel>Tárgy neve</FormLabel>
                <Input placeholder="Programozás alapjai 1" {...register('name', { required: true })} />
                {errors.name && <FormErrorMessage>A tárgynév kötelező!</FormErrorMessage>}
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Tárgy angol neve</FormLabel>
                <Input placeholder="Basics of programming 1" {...register('englishName')} />
              </FormControl>
              <FormControl isInvalid={selectedMajors.length === 0 && isSubmitted} isRequired>
                <FormLabel>Szak(ok)</FormLabel>
                <SimpleGrid columns={{ sm: 1, md: 2 }}>
                  {MajorArray.map((m) => (
                    <MajorCheckbox getCheckboxProps={getCheckboxProps} major={m} key={m} />
                  ))}
                </SimpleGrid>
                {selectedMajors.length === 0 && isSubmitted && <FormErrorMessage>Legalább egy szakot válassz ki!</FormErrorMessage>}
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent="space-between">
              {previousData && deleteAction ? (
                <ConfirmDialogButton
                  initiatorButton={
                    <Button colorScheme="red" ref={deleteSubjectRef}>
                      Törlés
                    </Button>
                  }
                  initiatorButtonRef={deleteSubjectRef}
                  headerText="Biztosan törlöd a tárgyat?"
                  bodyText="Ezzel az tárgyhoz tartozó összes konzultáció is törlődik!"
                  confirmButtonText="Törlés"
                  confirmAction={() =>
                    deleteAction(previousData.id, {
                      onSuccess: () => {
                        onClose()
                        refetch()
                        toast({ title: 'Tárgy sikeresen törölve', status: 'success' })
                      }
                    })
                  }
                />
              ) : (
                <Box />
              )}
              <Box>
                <Button onClick={onClose} mr={3}>
                  Mégse
                </Button>
                <Button type="submit" colorScheme="brand" isLoading={mutation.isLoading}>
                  Mentés
                </Button>
              </Box>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
