import {
  Avatar,
  Badge,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
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
import { FaSearch, FaStar, FaTimes } from 'react-icons/fa'
import { currentUser, testPresenters } from '../demoData'
import { Presentation } from '../types/consultationDetails'

type Props = {
  presentations: Presentation[]
  setPresentations: (presentations: Presentation[]) => void
  presentationsError: boolean
}

export const PresentersSelector = ({ presentations, setPresentations, presentationsError }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [presenterList, setPresenterList] = useState<Presentation[]>([])
  const [filteredPresenterList, setFilteredPresenterList] = useState<Presentation[]>([])
  const [search, setSearch] = useState('')
  const [filteredCount, setFilteredCount] = useState(0)
  const [resultLimit, setResultLimit] = useState(10)

  useEffect(() => {
    if (open) {
      setLoading(true)
      setPresenterList([])
      setTimeout(() => {
        setLoading(false)
        setPresenterList(testPresenters)
      }, 1000)
    }
  }, [open])

  useEffect(() => {
    const filtered = presenterList.filter(
      (p) => p.fullName.toLowerCase().includes(search.toLowerCase()) && !presentations.some((pres) => pres.id === p.id)
    )
    setFilteredCount(filtered.length)

    setFilteredPresenterList(filtered.slice(0, resultLimit))
  }, [search, presenterList, resultLimit])

  const addPresenter = (presenter: Presentation) => {
    setPresentations([...presentations, presenter].sort((a, b) => a.fullName.localeCompare(b.fullName)))
  }

  const removePresenter = (presenter: Presentation) => {
    setPresentations(presentations.filter((p) => p.id !== presenter.id))
  }

  return (
    <>
      <FormControl isInvalid={presentationsError} isRequired>
        <FormLabel>Előadók</FormLabel>
        {presentations.map((p) => (
          <Box borderRadius={6} borderWidth={1} mb={2} key={p.id}>
            <HStack flexGrow={1} p={4}>
              <Avatar size="md" name={p.fullName} src={''} />
              <VStack flexGrow={1}>
                <Heading size="md" width="100%">
                  {p.fullName}
                  {p.id === currentUser.id && (
                    <Badge colorScheme="brand" ml={1}>
                      Te
                    </Badge>
                  )}
                </Heading>
                <HStack width="100%">
                  <Text>Értékelés: {p.averageRating}</Text>
                  <FaStar />
                </HStack>
              </VStack>
              <Button colorScheme="red" onClick={() => removePresenter(p)}>
                Törlés
              </Button>
            </HStack>
          </Box>
        ))}
        <FormErrorMessage>Legalább egy előadónak kell lennie</FormErrorMessage>
        <Button onClick={() => setOpen(true)} mt={2}>
          Előadó hozzáadása
        </Button>
      </FormControl>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Előadó hozzáadása</ModalHeader>
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
            <VStack mb={2} maxHeight="500px" overflowY="auto">
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
                filteredPresenterList.map((p) => (
                  <Box
                    borderRadius={6}
                    borderWidth={1}
                    cursor="pointer"
                    key={p.id}
                    width="100%"
                    onClick={() => {
                      addPresenter(p)
                      setOpen(false)
                    }}
                  >
                    <HStack flexGrow={1} p={4}>
                      <Avatar size="md" name={p.fullName} src={''} />
                      <VStack flexGrow={1}>
                        <Heading size="md" width="100%">
                          {p.fullName}
                          {p.id === currentUser.id && (
                            <Badge colorScheme="brand" ml={1}>
                              Te
                            </Badge>
                          )}
                        </Heading>
                        <HStack width="100%">
                          <Text>Értékelés: {p.averageRating}</Text>
                          <FaStar />
                        </HStack>
                      </VStack>
                    </HStack>
                  </Box>
                ))
              )}
            </VStack>
            {filteredPresenterList.length < filteredCount && (
              <Button colorScheme="brand" onClick={() => setResultLimit((r) => r + 10)} width="100%" mb={4}>
                Még több betöltése
              </Button>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
