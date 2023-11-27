import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useBreakpointValue,
  useMediaQuery,
  useToast
} from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { FetchUserListMutationProps, useFecthUserListMutation } from '../../api/hooks/userMutationHooks'
import { KonziError } from '../../api/model/error.model'
import { PageHeading } from '../../components/commons/PageHeading'
import { generateToastParams } from '../../util/generateToastParams'
import { ErrorPage } from '../error/ErrorPage'
import { LoadingUserList } from './components/LoadingUserList'
import { UserListWithPagination } from './components/UserListWithPagination'

export const UserBrowserPage = () => {
  const toast = useToast()
  const { t } = useTranslation()
  const [largeScreen] = useMediaQuery('(min-width: 48em)')
  const {
    isLoading,
    data,
    mutate: fetchUsers,
    error
  } = useFecthUserListMutation((e: KonziError) => {
    toast(generateToastParams(e, t))
  })

  const resultCount = useBreakpointValue({ base: 4, lg: 6, '3xl': 8 }, { ssr: false }) || 4
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)

  const searchUsers = (search: string, page: number, pageSize: number = resultCount) => {
    const props: FetchUserListMutationProps = {
      search,
      page,
      pageSize
    }
    fetchUsers(props)
  }

  const debouncedSearch = useRef(debounce(searchUsers, 400)).current

  useEffect(() => {
    searchUsers('', 0)
  }, [])

  if (error) {
    return <ErrorPage status={error.statusCode} title={error.message} />
  }

  return (
    <>
      <Helmet title={t('userBrowserPage.users')} />
      <PageHeading title={t('userBrowserPage.searchUsers')} />
      <InputGroup my={5}>
        <InputLeftElement h="100%">
          <SearchIcon />
        </InputLeftElement>
        <Input
          placeholder={t('userBrowserPage.searching')}
          size="lg"
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(0)
            debouncedSearch(e.target.value, 0)
          }}
          value={search}
          autoFocus={largeScreen}
        />
        <InputRightElement h="100%">
          <CloseIcon
            onClick={() => {
              if (search) {
                searchUsers('', 0)
                setSearch('')
                setPage(0)
              }
            }}
            cursor="pointer"
          />
        </InputRightElement>
      </InputGroup>
      {isLoading || !data ? <LoadingUserList count={resultCount} /> : <UserListWithPagination data={data} />}
      <Flex justify="space-between">
        <IconButton
          size="lg"
          my={3}
          isDisabled={!data || page === 0}
          colorScheme="brand"
          aria-label={t('userBrowserPage.prevPage')}
          onClick={() => {
            searchUsers(search, page - 1)
            setPage(page - 1)
          }}
          icon={<FaChevronLeft />}
        />
        <IconButton
          size="lg"
          my={3}
          isDisabled={!data || (page + 1) * resultCount >= data.userCount}
          colorScheme="brand"
          aria-label={t('userBrowserPage.nextPage')}
          onClick={() => {
            searchUsers(search, page + 1)
            setPage(page + 1)
          }}
          icon={<FaChevronRight />}
        />
      </Flex>
    </>
  )
}
