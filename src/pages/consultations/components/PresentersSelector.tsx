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
  VStack
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { useFecthUserListQuery } from '../../../api/hooks/userQueryHooks'

import { Presentation } from '../types/consultationDetails'
import { Rating } from './Rating'
import { SelectorSkeleton } from './SelectorSkeleton'

type Props = {
  presentations: Presentation[]
  setPresentations: (presentations: Presentation[]) => void
  presentationsError: boolean
}

export const PresentersSelector = ({ presentations, setPresentations, presentationsError }: Props) => {
  const { isLoading, error, data: presenterList, refetch } = useFecthUserListQuery()
  const { loggedInUser: currentUser } = useAuthContext()

  //TODO search?
  const [open, setOpen] = useState(false)
  const [filteredPresenterList, setFilteredPresenterList] = useState<Presentation[]>([])
  const [search, setSearch] = useState('')
  const [filteredCount, setFilteredCount] = useState(0)
  const [resultLimit, setResultLimit] = useState(10)

  const addPresenter = (presenter: Presentation) => {
    setPresentations([...presentations, presenter].sort((a, b) => a.fullName.localeCompare(b.fullName)))
  }

  const removePresenter = (presenter: Presentation) => {
    setPresentations(presentations.filter((p) => p.id !== presenter.id))
  }

  if (error) {
    return <Navigate replace to="/error" state={{ title: error.message, status: error.statusCode, messages: [] }} />
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
                  {p.id === currentUser!!.id && (
                    <Badge colorScheme="brand" ml={1}>
                      Te
                    </Badge>
                  )}
                </Heading>
                <Rating rating={p.averageRating} />
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
              {isLoading ? (
                <SelectorSkeleton />
              ) : (
                presenterList?.map((p) => (
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
                          {p.id === currentUser!!.id && (
                            <Badge colorScheme="brand" ml={1}>
                              Te
                            </Badge>
                          )}
                        </Heading>
                        <Rating rating={p.averageRating} />
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
