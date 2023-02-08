import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  VStack
} from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { FetchUserListMutationProps, useFecthUserListMutation } from '../../api/hooks/userMutationHooks'
import { KonziError } from '../../api/model/error.model'
import { generateToastParams } from '../../util/generateToastParams'
import { PATHS } from '../../util/paths'
import { ErrorPage } from '../error/ErrorPage'

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

  const resultCount = 3
  const [resultStart, setResultStart] = useState<number>(0)
  const [search, setSearch] = useState<string>('')

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

      <SimpleGrid columns={{ sm: 1, lg: 2 }} gap={4}>
        {data.userList.map((user) => (
          <Box key={user.id} shadow="md" borderRadius={8} borderWidth={1}>
            <Stack as={Link} to={`${PATHS.USERS}/${user.id}`} direction={['column', 'row']} justify="space-between">
              <HStack p={4}>
                <Avatar size="md" name={user.fullName} src={''} />
                <VStack flexGrow={1} align="flex-start">
                  <Heading size="md">{user.fullName}</Heading>
                  {user.id === loggedInUser?.id && (
                    <Badge colorScheme="brand" ml={2}>
                      Te
                    </Badge>
                  )}
                </VStack>
              </HStack>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
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
