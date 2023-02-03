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
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { useFecthUserListMutation } from '../../../api/hooks/userMutationHooks'
import { KonziError } from '../../../api/model/error.model'
import { GroupModel } from '../../../api/model/group.model'
import { generateToastParams } from '../../../util/generateToastParams'
import { ErrorPage } from '../../error/ErrorPage'

import { Presentation } from '../types/consultationDetails'
import { Rating } from './Rating'
import { SelectorSkeleton } from './SelectorSkeleton'

export const PresentersSelector = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext()

  const { loggedInUser } = useAuthContext()
  const toast = useToast()
  const {
    isLoading,
    data: userList,
    mutate: fetchUsers,
    reset,
    error
  } = useFecthUserListMutation((e: KonziError) => {
    toast(generateToastParams(e))
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search, setSearch] = useState('')

  const addPresenter = (presenter: Presentation) => {
    setValue(
      'presenters',
      [...watch('presenters'), presenter].sort((a, b) => a.fullName.localeCompare(b.fullName)),
      { shouldValidate: true }
    )
  }

  const removePresenter = (presenter: Presentation) => {
    setValue(
      'presenters',
      watch('presenters').filter((p: Presentation) => p.id !== presenter.id),
      { shouldValidate: true }
    )
  }

  const debouncedSearch = useRef(
    debounce((search: string) => {
      fetchUsers(search)
    }, 400)
  ).current

  if (loggedInUser === undefined) {
    return <ErrorPage status={401} />
  }

  if (error) {
    return <Navigate replace to="/error" state={{ title: error.message, status: error.statusCode, messages: [] }} />
  }

  const filteredUserList = userList?.filter((u) => !watch('presenters').some((p: Presentation) => p.id === u.id))

  return (
    <>
      <FormControl isInvalid={!!errors['presenters']} isRequired>
        <FormLabel>Előadók</FormLabel>
        {watch('presenters').map((p: Presentation) => (
          <Box borderRadius={6} borderWidth={1} mb={2} key={p.id}>
            <HStack flexGrow={1} p={4}>
              <Avatar size="md" name={p.fullName} src={''} />
              <VStack flexGrow={1}>
                <Heading size="md" width="100%">
                  {p.fullName}
                  {p.id === loggedInUser.id && (
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
        <Button
          onClick={() => {
            onOpen()
            setSearch('')
            reset()
          }}
          mt={2}
        >
          Előadó hozzáadása
        </Button>
      </FormControl>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Előadó hozzáadása</ModalHeader>
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
            <Input
              {...register('presenters', {
                validate: (g: GroupModel[]) => g.length > 0
              })}
              hidden
            />
            <VStack mb={2} maxHeight="500px" overflowY="auto">
              {isLoading ? (
                <SelectorSkeleton />
              ) : filteredUserList === undefined || search.trim().length === 0 ? (
                <Text>Keress előadót</Text>
              ) : filteredUserList.length === 0 ? (
                <Text>Nincs találat</Text>
              ) : (
                filteredUserList.map((p) => (
                  <Box
                    borderRadius={6}
                    borderWidth={1}
                    cursor="pointer"
                    key={p.id}
                    width="100%"
                    onClick={() => {
                      addPresenter(p)
                      onClose()
                    }}
                  >
                    <HStack flexGrow={1} p={4}>
                      <Avatar size="md" name={p.fullName} src={''} />
                      <VStack flexGrow={1}>
                        <Heading size="md" width="100%">
                          {p.fullName}
                          {p.id === loggedInUser.id && (
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
