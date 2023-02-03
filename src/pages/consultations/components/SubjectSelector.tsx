import {
  Box,
  FormControl,
  FormErrorMessage,
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
import { FaSearch, FaTimes } from 'react-icons/fa'
import { Navigate } from 'react-router-dom'
import { useFecthSubjectListMutation } from '../../../api/hooks/subjectHooks'
import { KonziError } from '../../../api/model/error.model'
import { SubjectModel } from '../../../api/model/subject.model'
import { generateToastParams } from '../../../util/generateToastParams'
import { SelectorSkeleton } from './SelectorSkeleton'

type Props = {
  subject?: SubjectModel
  setSubject: (subject: SubjectModel) => void
  subjectError: boolean
}

export const SubjectSelector = ({ subject, setSubject, subjectError }: Props) => {
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
      fetchSubjects(search)
    }, 400)
  ).current

  if (error) {
    return <Navigate replace to="/error" state={{ title: error.message, status: error.statusCode, messages: [] }} />
  }

  return (
    <>
      <FormControl isInvalid={subjectError} isRequired>
        <FormLabel>Tárgy</FormLabel>
        <Box
          borderRadius={6}
          borderWidth={1}
          pt={2}
          pb={2}
          pl={4}
          cursor="pointer"
          onClick={() => {
            onOpen()
            setSearch('')
            reset()
          }}
        >
          <Text>{subject ? `${subject.name} (${subject.code})` : 'Nincs tárgy választva'}</Text>
        </Box>
        <FormErrorMessage>Kell tárgyat választani</FormErrorMessage>
      </FormControl>
      <Modal isOpen={isOpen} onClose={onClose}>
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
                placeholder="Keresés..."
                size="lg"
                onChange={(e) => {
                  setSearch(e.target.value)
                  debouncedSearch(e.target.value)
                }}
                value={search}
              />
              <InputRightElement h="100%">
                <FaTimes onClick={() => setSearch('')} cursor="pointer" />
              </InputRightElement>
            </InputGroup>
            <VStack mb={4} maxHeight="600px" overflowY="auto">
              {isLoading ? (
                <SelectorSkeleton />
              ) : subjectList === undefined || search.trim().length === 0 ? (
                <Text>Keress tárgyat</Text>
              ) : subjectList.length === 0 ? (
                <Text>Nincs találat</Text>
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
                      setSubject(s)
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
