import {
  Avatar,
  Box,
  Button,
  FormControl,
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
import { useFecthGroupListMutation } from '../../../api/hooks/groupMutationHooks'
import { KonziError } from '../../../api/model/error.model'
import { GroupModel } from '../../../api/model/group.model'
import { generateToastParams } from '../../../util/generateToastParams'
import { PATHS } from '../../../util/paths'
import { CreateConsultationForm } from '../types/createConsultation'
import { SelectorSkeleton } from './SelectorSkeleton'

const INITIAL_GROUP_COUNT = 5

export const TargetGroupSelector = () => {
  const { register, watch, setValue } = useFormContext<CreateConsultationForm>()

  const toast = useToast()
  const {
    isLoading,
    data: groupList,
    mutate: fetchGroups,
    reset,
    error
  } = useFecthGroupListMutation((e: KonziError) => {
    toast(generateToastParams(e))
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search, setSearch] = useState('')

  const addGroup = (group: GroupModel) => {
    setValue(
      'targetGroups',
      [...watch('targetGroups', []), group].sort((a, b) => a.name.localeCompare(b.name))
    )
  }

  const removeGroup = (group: GroupModel) => {
    setValue(
      'targetGroups',
      watch('targetGroups').filter((g: GroupModel) => g.id !== group.id)
    )
  }

  const debouncedSearch = useRef(
    debounce((search: string) => {
      fetchGroups({ search, limit: search ? undefined : INITIAL_GROUP_COUNT })
    }, 400)
  ).current

  if (error) {
    return <Navigate replace to={PATHS.ERROR} state={{ title: error.message, status: error.statusCode, messages: [] }} />
  }

  const filteredGroupList = groupList?.filter((g) => !watch('targetGroups').some((group: GroupModel) => group.id === g.id))

  return (
    <>
      <FormControl>
        <FormLabel>Célcsoportok</FormLabel>
        {watch('targetGroups').map((g: GroupModel) => (
          <Box borderRadius={6} borderWidth={1} mb={2} key={g.id}>
            <HStack flexGrow={1} p={4}>
              <Avatar size="md" name={g.name} src={''} />
              <VStack flexGrow={1}>
                <Heading size="md" width="100%">
                  {g.name}
                </Heading>
              </VStack>
              <Button colorScheme="red" onClick={() => removeGroup(g)}>
                Törlés
              </Button>
            </HStack>
          </Box>
        ))}
        <Button
          onClick={() => {
            onOpen()
            setSearch('')
            reset()
            fetchGroups({ search: '', limit: INITIAL_GROUP_COUNT })
          }}
          mt={watch('targetGroups').length > 0 ? 2 : 0}
        >
          Célcsoport hozzáadása
        </Button>
      </FormControl>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Célcsoport hozzáadása</ModalHeader>
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
                <FaTimes onClick={() => setSearch('')} cursor="pointer" />
              </InputRightElement>
            </InputGroup>
            <Input {...register('targetGroups')} hidden />
            <VStack mb={2} maxHeight="500px" overflowY="auto">
              {isLoading ? (
                <SelectorSkeleton />
              ) : !filteredGroupList || filteredGroupList.length === 0 ? (
                <Text fontStyle="italic">Nincs találat</Text>
              ) : (
                filteredGroupList.map((g) => (
                  <Box
                    borderRadius={6}
                    borderWidth={1}
                    cursor="pointer"
                    key={g.id}
                    width="100%"
                    onClick={() => {
                      addGroup(g)
                      onClose()
                    }}
                  >
                    <HStack flexGrow={1} p={4}>
                      <Avatar size="md" name={g.name} src={''} />
                      <VStack flexGrow={1}>
                        <Heading size="md" width="100%">
                          {g.name}
                        </Heading>
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
