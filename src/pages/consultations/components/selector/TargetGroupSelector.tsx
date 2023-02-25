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
import { useFecthGroupListMutation } from '../../../../api/hooks/groupMutationHooks'
import { KonziError } from '../../../../api/model/error.model'
import { GroupModel } from '../../../../api/model/group.model'
import { generateToastParams } from '../../../../util/generateToastParams'
import { PATHS } from '../../../../util/paths'
import { CreateConsultationForm } from '../../types/createConsultation'

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
        <Text mb={2} textAlign="justify">
          Ha megadsz egy vagy több célcsoportot, akkor csak azok a felhasználók fogják látni a konzit, akik legalább az egyik célcsoportnak
          tagjai.
        </Text>
        {watch('targetGroups').map((g: GroupModel) => (
          <Box borderRadius={6} borderWidth={1} mb={2} key={g.id}>
            <HStack justify="space-between" p={4}>
              <HStack>
                <Avatar size="md" name={g.name} src="" />{' '}
                <Heading maxWidth={{ base: '9rem', sm: '15rem', m: '24rem', md: '32rem', lg: '45rem' }} isTruncated size="md">
                  {g.name}
                </Heading>
              </HStack>
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
      <Modal scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
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
                <FaTimes
                  onClick={() => {
                    setSearch('')
                    fetchGroups({ search: '', limit: INITIAL_GROUP_COUNT })
                  }}
                  cursor="pointer"
                />
              </InputRightElement>
            </InputGroup>
            <Input {...register('targetGroups')} hidden />
            <VStack pr={0} mb={2} maxHeight="500px" overflowY="auto">
              {isLoading || !filteredGroupList || filteredGroupList.length === 0 ? (
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
                      <Avatar size="md" name={g.name} src="" />
                      <VStack>
                        <Heading maxWidth={{ base: '13rem', sm: '17rem' }} isTruncated size="md" width="100%">
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
