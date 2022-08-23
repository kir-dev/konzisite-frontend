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
  Skeleton,
  Text,
  VStack
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { SubjectModel } from '../../../api/model/subject.model'
import { testSubjects } from '../demoData'

type Props = {
  subject?: SubjectModel
  setSubject: (subject: SubjectModel) => void
  subjectError: boolean
}

export const SubjectSelector = ({ subject, setSubject, subjectError }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [subjectList, setSubjectList] = useState<SubjectModel[]>([])
  const [filteredSubjectList, setFilteredSubjectList] = useState<SubjectModel[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (open) {
      setLoading(true)
      setSubjectList([])
      setTimeout(() => {
        setLoading(false)
        setSubjectList(testSubjects)
      }, 1000)
    }
  }, [open])

  useEffect(() => {
    setFilteredSubjectList(
      subjectList.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase()))
    )
  }, [search, subjectList])

  return (
    <>
      <FormControl isInvalid={subjectError} isRequired>
        <FormLabel>Tárgy</FormLabel>
        <Box borderRadius={6} borderWidth={1} pt={2} pb={2} pl={4} cursor="pointer" onClick={() => setOpen(true)}>
          <Text>{subject ? `${subject.name} (${subject.code})` : 'Nincs tárgy választva'}</Text>
        </Box>
        <FormErrorMessage>Kell tárgyat választani</FormErrorMessage>
      </FormControl>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tárgy választás</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup my={5}>
              <InputLeftElement h="100%">
                <FaSearch />
              </InputLeftElement>
              <Input placeholder="Keresés..." size="lg" onChange={(e) => setSearch(e.target.value)} value={search} />
              <InputRightElement h="100%">
                <FaTimes onClick={() => setSearch('')} cursor="pointer" />
              </InputRightElement>
            </InputGroup>
            <VStack mb={4} maxHeight="600px" overflowY="auto">
              {loading ? (
                <>
                  <Box borderRadius={6} borderWidth={1} pt={2} pb={2} pl={4} width="100%">
                    <Skeleton height="20px" width="30%" />
                  </Box>
                  <Box borderRadius={6} borderWidth={1} pt={2} pb={2} pl={4} width="100%">
                    <Skeleton height="20px" width="60%" />
                  </Box>
                  <Box borderRadius={6} borderWidth={1} pt={2} pb={2} pl={4} width="100%">
                    <Skeleton height="20px" width="40%" />
                  </Box>
                </>
              ) : (
                filteredSubjectList.map((s) => (
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
                      setOpen(false)
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
