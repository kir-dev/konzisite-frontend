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
  useDisclosure,
  useToast,
  VStack
} from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { useRef, useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { useFecthGroupListMutation } from '../../../api/hooks/groupMutationHooks'
import { KonziError } from '../../../api/model/error.model'
import { GroupModel } from '../../../api/model/group.model'
import { generateToastParams } from '../../../util/generateToastParams'
import { ErrorPage } from '../../error/ErrorPage'
import { SelectorSkeleton } from './SelectorSkeleton'

type Props = {
  targetGroups: GroupModel[]
  setTargetGroups: (targetGroups: GroupModel[]) => void
}

export const TargetGroupSelector = ({ targetGroups, setTargetGroups }: Props) => {
  const toast = useToast()
  const {
    isLoading,
    data: groupList,
    mutate,
    reset,
    error
  } = useFecthGroupListMutation((e: KonziError) => {
    toast(generateToastParams(e))
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search, setSearch] = useState('')

  const addGroup = (group: GroupModel) => {
    setTargetGroups([...targetGroups, group].sort((a, b) => a.name.localeCompare(b.name)))
  }

  const removeGroup = (group: GroupModel) => {
    setTargetGroups(targetGroups.filter((g) => g.id !== group.id))
  }

  const debouncedSearch = useRef(
    debounce((search: string) => {
      mutate(search)
    }, 500)
  ).current

  if (error) {
    return <ErrorPage backPath={'/'} status={error.statusCode} title={error.message} />
  }

  return (
    <>
      <FormControl>
        <FormLabel>Célcsoportok</FormLabel>
        {targetGroups.map((g) => (
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
          }}
          mt={2}
        >
          Célcsoport hozzáadása
        </Button>
      </FormControl>
      <Modal scrollBehavior={'inside'} isOpen={isOpen} onClose={onClose}>
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
            <VStack mb={2} maxHeight="500px" overflowY="auto">
              {isLoading ? (
                <SelectorSkeleton />
              ) : (
                groupList
                  ?.filter((g) => !targetGroups.some((group) => group.id === g.id))
                  .map((g) => (
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
