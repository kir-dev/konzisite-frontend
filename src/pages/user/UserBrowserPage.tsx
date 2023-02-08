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
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { FetchUserListMutationProps, useFecthUserListMutation } from '../../api/hooks/userMutationHooks'
import { KonziError } from '../../api/model/error.model'
import { generateToastParams } from '../../util/generateToastParams'
import { PATHS } from '../../util/paths'
import { ErrorPage } from '../error/ErrorPage'

enum COLUMNS {
  NAME = 'name',
  PRESENTATIONS = 'presentations',
  RATING = 'averageRating',
  ATTENDANCES = 'attendances'
}

export const UserBrowserPage = () => {
  const { loggedInUser } = useAuthContext()
  const toast = useToast()
  const {
    isLoading,
    data,
    mutate: fetchUsers,
    error
  } = useFecthUserListMutation((e: KonziError) => {
    toast(generateToastParams(e))
  })

  const [sortBy, setSortBy] = useState<COLUMNS>(COLUMNS.NAME)
  const [resultCount, setResultCount] = useState<number>(3)
  const [resultStart, setResultStart] = useState<number>(0)
  const [search, setSearch] = useState<string>('')
  const navigate = useNavigate()
  const hoverBg = useColorModeValue('brand.50', 'brand.700')

  const debouncedSearch = useRef(
    debounce((search: string, page: number, pageSize: number) => {
      const props: FetchUserListMutationProps = {
        search: search,
        page: page,
        pageSize: pageSize
      }
      fetchUsers(props)
    }, 400)
  ).current

  useEffect(() => {
    debouncedSearch(search, resultStart, resultCount)
  }, [resultStart])

  if (error) {
    return <ErrorPage status={error?.statusCode} title={error?.message} />
  }

  if (isLoading || !data) {
    return <Text>xd</Text> //TODO
  }

  return (
    <>
      <Helmet title="Felhasználók" />
      <Heading textAlign="center">Felhasználók keresése</Heading>
      <InputGroup my={5}>
        <InputLeftElement h="100%">
          <SearchIcon />
        </InputLeftElement>
        <Input
          bg={hoverBg}
          placeholder="Keresés..."
          size="lg"
          onChange={(e) => {
            setSearch(e.target.value)
            setResultStart(0)
            debouncedSearch(e.target.value, resultStart, resultCount)
          }}
          value={search}
          autoFocus={true}
        />
        <InputRightElement h="100%">
          <CloseIcon onClick={() => setSearch('')} cursor="pointer" />
        </InputRightElement>
      </InputGroup>
      <TableContainer>
        <Table variant="simple">
          {data.userCount === 0 && <TableCaption>Nincs ilyen nevű felhasználó!</TableCaption>}
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
            {data.userList.map((user) => (
              <Tr key={user.id} onClick={() => navigate(`${PATHS.USERS}/${user.id}`)} _hover={{ bg: hoverBg }} cursor="pointer">
                <Td>
                  <Flex align="center">
                    <Avatar size="md" name={user.fullName} src={''} />
                    <Heading ml={5} size="md">
                      {user.fullName}
                    </Heading>
                    {user.id === loggedInUser?.id && (
                      <Badge colorScheme="brand" ml={2}>
                        Te
                      </Badge>
                    )}
                  </Flex>
                </Td>

                <Td textAlign="center">{user.presentations}</Td>
                <Td textAlign="center">{user.averageRating}</Td>
                <Td textAlign="center">{user.attendances}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justify={resultStart <= 0 ? 'flex-end' : 'space-between'}>
        {resultStart > 0 && (
          <Box my={3}>
            <Button
              colorScheme="brand"
              onClick={() => {
                setResultStart(resultStart - 1)
              }}
            >
              Előző oldal
            </Button>
          </Box>
        )}
        {(resultStart + 1) * resultCount < data.userCount && (
          <Box my={3}>
            <Button
              colorScheme="brand"
              onClick={() => {
                setResultStart(resultStart + 1)
              }}
            >
              {'>'}
            </Button>
          </Box>
        )}
      </Flex>
    </>
  )
}
