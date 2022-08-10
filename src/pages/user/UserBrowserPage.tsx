import { ChevronDownIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserModel } from '../../api/model/user.model'

const currentUser: UserPreview = {
  id: 1,
  authSchId: 'abc2',
  firstName: 'János',
  lastName: 'Kovács',
  email: 'elek@example.com',
  presentations: 0,
  avarageRating: 0,
  attendances: 7
}

type UserPreview = UserModel & {
  presentations: number
  avarageRating: number
  attendances: number
}

const MockUsers: UserPreview[] = [
  {
    id: 4,
    authSchId: 'abc',
    firstName: 'Elek',
    lastName: 'Teszt',
    email: 'elek@example.com',
    presentations: 3,
    avarageRating: 4.5,
    attendances: 0
  },
  currentUser,
  {
    id: 2,
    authSchId: 'abc',
    firstName: 'Péter',
    lastName: 'Sándor',
    email: 'elek@example.com',
    presentations: 1,
    avarageRating: 2.1,
    attendances: 2
  }
]

enum COLUMNS {
  NAME = 'name',
  PRESENTATIONS = 'presentations',
  RATING = 'avarageRating',
  ATTENDANCES = 'attendances'
}

const fullName = (user: UserPreview) => {
  return user.lastName + ' ' + user.firstName
}

export const UserBrowserPage = () => {
  const [userList, setUserList] = useState<UserPreview[]>(MockUsers)
  const [sortBy, setSortBy] = useState<COLUMNS>(COLUMNS.NAME)
  const [resultCount, setResultCount] = useState<number>(10)
  const [search, setSearch] = useState<string>('')
  const navigate = useNavigate()
  const hoverBg = useColorModeValue('brand.50', 'brand.700')

  const filteredList = (search ? userList.filter((user) => fullName(user).toLowerCase().includes(search.toLowerCase())) : userList).sort(
    (user1, user2) => {
      if (sortBy == COLUMNS.NAME) return fullName(user1).localeCompare(fullName(user2))
      return user2[sortBy] - user1[sortBy]
    }
  )
  const listToRender = filteredList.slice(0, resultCount)

  return (
    <>
      <Heading>Felhasználók keresése</Heading>
      <InputGroup my={5}>
        <InputLeftElement h="100%">
          <SearchIcon />
        </InputLeftElement>
        <Input
          bg={hoverBg}
          placeholder="Keresés..."
          size="lg"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          autoFocus={true}
        />
        <InputRightElement h="100%">
          <CloseIcon onClick={() => setSearch('')} cursor="pointer" />
        </InputRightElement>
      </InputGroup>
      <TableContainer>
        <Table variant="simple">
          {listToRender.length === 0 && <TableCaption>Nincs ilyen nevű felhasználó!</TableCaption>}
          <Thead>
            <Tr>
              <Th _hover={{ bg: hoverBg }} onClick={() => setSortBy(COLUMNS.NAME)} cursor="pointer">
                <>
                  Név
                  {sortBy === COLUMNS.NAME && <ChevronDownIcon />}
                </>
              </Th>
              <Th _hover={{ bg: hoverBg }} onClick={() => setSortBy(COLUMNS.PRESENTATIONS)} cursor="pointer" textAlign="center">
                <>
                  Tartott konzik
                  {sortBy === COLUMNS.PRESENTATIONS && <ChevronDownIcon />}
                </>
              </Th>
              <Th _hover={{ bg: hoverBg }} onClick={() => setSortBy(COLUMNS.RATING)} cursor="pointer" textAlign="center">
                <>
                  Átlagos értékelés
                  {sortBy === COLUMNS.RATING && <ChevronDownIcon />}
                </>
              </Th>
              <Th _hover={{ bg: hoverBg }} onClick={() => setSortBy(COLUMNS.ATTENDANCES)} cursor="pointer" textAlign="center">
                <>
                  Részvételek
                  {sortBy === COLUMNS.ATTENDANCES && <ChevronDownIcon />}
                </>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {listToRender.map((user) => (
              <Tr key={user.id} onClick={() => navigate(`/users/${user.id}`)} _hover={{ bg: hoverBg }} cursor="pointer">
                <Td>
                  <Flex align="center">
                    <Avatar size="md" name={fullName(user)} src={''} />
                    <Heading ml={5} size="md">
                      {fullName(user)}
                    </Heading>
                    {user.id === currentUser.id && (
                      <Badge colorScheme="brand" ml={2}>
                        Te
                      </Badge>
                    )}
                  </Flex>
                </Td>

                <Td textAlign="center">{user.presentations}</Td>
                <Td textAlign="center">{user.avarageRating}</Td>
                <Td textAlign="center">{user.attendances}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {resultCount < filteredList.length && (
        <Box my={3}>
          <Button colorScheme="brand" onClick={() => setResultCount(resultCount + 10)}>
            Még több eredmény
          </Button>
        </Box>
      )}
    </>
  )
}
