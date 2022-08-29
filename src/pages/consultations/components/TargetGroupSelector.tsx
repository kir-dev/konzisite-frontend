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
  Skeleton,
  VStack
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { GroupModel } from '../../../api/model/group.model'
import { testGroupsPreview } from '../../groups/demoData'

type Props = {
  targetGroups: GroupModel[]
  setTargetGroups: (targetGroups: GroupModel[]) => void
}

export const TargetGroupSelector = ({ targetGroups, setTargetGroups }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [groupList, setGroupList] = useState<GroupModel[]>([])
  const [filteredGroupList, setFilteredGroupList] = useState<GroupModel[]>([])
  const [search, setSearch] = useState('')
  const [filteredCount, setFilteredCount] = useState(0)
  const [resultLimit, setResultLimit] = useState(10)

  useEffect(() => {
    if (open) {
      setLoading(true)
      setGroupList([])
      setTimeout(() => {
        setLoading(false)
        setGroupList(testGroupsPreview)
      }, 1000)
    }
  }, [open])

  useEffect(() => {
    const filtered = groupList.filter(
      (g) => g.name.toLowerCase().includes(search.toLowerCase()) && !targetGroups.some((group) => group.id === g.id)
    )
    setFilteredCount(filtered.length)

    setFilteredGroupList(filtered.slice(0, resultLimit))
  }, [search, groupList, resultLimit])

  const addGroup = (group: GroupModel) => {
    setTargetGroups([...targetGroups, group].sort((a, b) => a.name.localeCompare(b.name)))
  }

  const removeGroup = (group: GroupModel) => {
    setTargetGroups(targetGroups.filter((g) => g.id !== group.id))
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
        <Button onClick={() => setOpen(true)} mt={2}>
          Célcsoport hozzáadása
        </Button>
      </FormControl>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Céscsoport hozzáadása</ModalHeader>
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
                filteredGroupList.map((g) => (
                  <Box
                    borderRadius={6}
                    borderWidth={1}
                    cursor="pointer"
                    key={g.id}
                    width="100%"
                    onClick={() => {
                      addGroup(g)
                      setOpen(false)
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
            {filteredGroupList.length < filteredCount && (
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
