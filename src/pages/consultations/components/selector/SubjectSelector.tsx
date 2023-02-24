import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack
} from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { Navigate } from 'react-router-dom'
import { useFecthSubjectListMutation } from '../../../../api/hooks/subjectHooks'
import { KonziError } from '../../../../api/model/error.model'
import { SubjectModel } from '../../../../api/model/subject.model'
import { generateToastParams } from '../../../../util/generateToastParams'
import { PATHS } from '../../../../util/paths'
import { CreateConsultationForm } from '../../types/createConsultation'

const INITIAL_SUBJECT_COUNT = 5

export const SubjectSelector = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<CreateConsultationForm>()

  const toast = useToast()
  const {
    isLoading,
    data: subjectList,
    mutate: fetchSubjects,
    reset,
    error
  } = useFecthSubjectListMutation((e: KonziError) => {
    toast(generateToastParams(e))
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search, setSearch] = useState('')

  const debouncedSearch = useRef(
    debounce((search: string) => {
      fetchSubjects({ search, limit: search ? undefined : INITIAL_SUBJECT_COUNT })
    }, 400)
  ).current

  if (error) {
    return <Navigate replace to={PATHS.ERROR} state={{ title: error.message, status: error.statusCode, messages: [] }} />
  }

  return (
    <>
      <FormControl isInvalid={!!errors.subject} isRequired>
        <FormLabel>Tárgy</FormLabel>

        <Input
          cursor="pointer"
          onClick={() => {
            onOpen()
            setSearch('')
            reset()
            fetchSubjects({ search: '', limit: INITIAL_SUBJECT_COUNT })
          }}
          readOnly
          value={watch('subject') ? `${watch('subject').name} (${watch('subject').code})` : 'Nincs tárgy választva'}
        />
      </FormControl>
      <Modal scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tárgy választás</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup my={5}>
              <InputLeftElement h="100%">
                <FaSearch />
              </InputLeftElement>
              <Input
                autoFocus
                placeholder="Keresés..."
                size="lg"
                onChange={(e) => {
                  setSearch(e.target.value)
                  debouncedSearch(e.target.value)
                }}
                value={search}
              />
              <InputRightElement h="100%">
                <FaTimes
                  onClick={() => {
                    setSearch('')
                    fetchSubjects({ search: '', limit: INITIAL_SUBJECT_COUNT })
                  }}
                  cursor="pointer"
                />
              </InputRightElement>
            </InputGroup>
            <Input
              {...register('subject', {
                validate: (s: SubjectModel) => !!s
              })}
              hidden
            />
            <VStack mb={4} maxHeight="600px" overflowY="auto">
              {isLoading || !subjectList || subjectList.length === 0 ? (
                <Text fontStyle="italic">Nincs találat</Text>
              ) : (
                subjectList.map((s) => (
                  <Box
                    borderRadius={6}
                    borderWidth={1}
                    pt={2}
                    pb={2}
                    pl={4}
                    cursor="pointer"
                    key={s.id}
                    width="100%"
                    onClick={() => {
                      setValue('subject', s, { shouldValidate: true })
                      onClose()
                    }}
                  >
                    <Text>
                      {s.name} ({s.code})
                    </Text>
                  </Box>
                ))
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
