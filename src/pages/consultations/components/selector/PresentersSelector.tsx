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
import { useAuthContext } from '../../../../api/contexts/auth/useAuthContext'
import { FetchUserListMutationProps, useFecthUserListMutation } from '../../../../api/hooks/userMutationHooks'
import { KonziError } from '../../../../api/model/error.model'
import { generateToastParams } from '../../../../util/generateToastParams'
import { PATHS } from '../../../../util/paths'
import { ErrorPage } from '../../../error/ErrorPage'

import { useTranslation } from 'react-i18next'
import { Presentation } from '../../types/consultationDetails'
import { CreateConsultationForm } from '../../types/createConsultation'
import { Rating } from '../Rating'

const INITIAL_USER_COUNT = 5

export const PresentersSelector = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<CreateConsultationForm>()
  const { t } = useTranslation()

  const { loggedInUser } = useAuthContext()
  const toast = useToast()
  const {
    isPending,
    data: userList,
    mutate: fetchUsers,
    reset,
    error
  } = useFecthUserListMutation((e: KonziError) => {
    toast(generateToastParams(e, t))
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
      const props: FetchUserListMutationProps = {
        search: search,
        pageSize: search ? undefined : INITIAL_USER_COUNT
      }
      fetchUsers(props)
    }, 400)
  ).current

  if (!loggedInUser) {
    return <ErrorPage status={401} />
  }

  if (error) {
    return <Navigate replace to={PATHS.ERROR} state={{ title: error.message, status: error.statusCode, messages: [] }} />
  }

  const filteredUserList = userList?.userList.filter((u) => !watch('presenters').some((p: Presentation) => p.id === u.id))

  return (
    <>
      <FormControl isInvalid={!!errors.presenters} isRequired>
        <FormLabel>{t('selectors.presenters')}</FormLabel>
        {watch('presenters').map((p: Presentation) => (
          <Box borderRadius={6} borderWidth={1} mb={2} key={p.id}>
            <HStack flexGrow={1} p={4}>
              <Avatar size="md" name={p.fullName + p.id} src="" />
              <VStack alignItems="flex-start" flexGrow={1}>
                <Heading size="md" width="100%">
                  {p.fullName}
                  {p.id === loggedInUser.id && (
                    <Badge colorScheme="brand" ml={1}>
                      {t('selectors.you')}
                    </Badge>
                  )}
                </Heading>
                <Rating rating={p.averageRating} />
              </VStack>
              <Button colorScheme="red" onClick={() => removePresenter(p)}>
                {t('selectors.delete')}
              </Button>
            </HStack>
          </Box>
        ))}
        <FormErrorMessage>{t('selectors.atLeastOnePresenter')}</FormErrorMessage>
        <Button
          onClick={() => {
            onOpen()
            setSearch('')
            reset()
            fetchUsers({ search: '', pageSize: INITIAL_USER_COUNT })
          }}
          mt={watch('presenters').length > 0 || !!errors.presenters ? 2 : 0}
        >
          {t('selectors.addPresenter')}
        </Button>
      </FormControl>
      <Modal scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('selectors.addPresenter')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup my={5}>
              <InputLeftElement h="100%">
                <FaSearch />
              </InputLeftElement>
              <Input
                autoFocus
                placeholder={t('selectors.searching')}
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
                    fetchUsers({ search: '', pageSize: INITIAL_USER_COUNT })
                  }}
                  cursor="pointer"
                />
              </InputRightElement>
            </InputGroup>
            <Input
              {...register('presenters', {
                validate: (p: Presentation[]) => p.length > 0
              })}
              hidden
            />
            <VStack mb={2} maxHeight="500px" overflowY="auto">
              {isPending || !filteredUserList || filteredUserList.length === 0 ? (
                <Text fontStyle="italic">{t('selectors.noResult')}</Text>
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
                      <Avatar size="md" name={p.fullName + p.id} src="" />
                      <VStack alignItems="flex-start" flexGrow={1}>
                        <Heading size="md" width="100%">
                          {p.fullName}
                          {p.id === loggedInUser.id && (
                            <Badge colorScheme="brand" ml={1}>
                              {t('selectors.you')}
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
