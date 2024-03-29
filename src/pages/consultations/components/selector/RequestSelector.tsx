import {
  Box,
  FormControl,
  FormLabel,
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
  VStack
} from '@chakra-ui/react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { Navigate } from 'react-router-dom'
import { useFetchRequestListQuery } from '../../../../api/hooks/requestQueryHooks'
import { PATHS } from '../../../../util/paths'
import { RequestListItem } from '../../../requests/components/RequestListItem'
import { CreateConsultationForm } from '../../types/createConsultation'

export const RequestSelector = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<CreateConsultationForm>()
  const { t } = useTranslation()

  const { isLoading, data: requests, error } = useFetchRequestListQuery()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search, setSearch] = useState('')

  if (error) {
    return <Navigate replace to={PATHS.ERROR} state={{ title: error.message, status: error.statusCode, messages: [] }} />
  }

  const filteredList = requests?.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <>
      <FormControl isInvalid={!!errors.request} isRequired>
        <FormLabel>{t('selectors.request')}</FormLabel>
        {watch('request') ? (
          <Box
            onClick={() => {
              onOpen()
              setSearch('')
            }}
          >
            <RequestListItem allowNavigate={false} request={watch('request')!!} />
          </Box>
        ) : (
          <Input
            cursor="pointer"
            onClick={() => {
              onOpen()
              setSearch('')
            }}
            readOnly
            value={watch('request')?.name || t('selectors.noneSelectedRequest')}
          />
        )}
      </FormControl>
      <Modal scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('selectors.requestSelector')}</ModalHeader>
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
                }}
                value={search}
              />
              <InputRightElement h="100%">
                <FaTimes
                  onClick={() => {
                    setSearch('')
                  }}
                  cursor="pointer"
                />
              </InputRightElement>
            </InputGroup>
            <Input
              {...register('request', {
                validate: (_, formValues) => !!formValues.request || !formValues.fulfillRequest
              })}
              hidden
            />
            <VStack alignItems="stretch" mb={4}>
              {isLoading || !filteredList || filteredList.length === 0 ? (
                <Text textAlign="center" fontStyle="italic">
                  {t('selectors.noResult')}
                </Text>
              ) : (
                filteredList.map((r) => (
                  <Box
                    key={r.id}
                    onClick={() => {
                      setValue('request', r, { shouldValidate: true })
                      setValue('subject', r.subject, { shouldValidate: true })
                      onClose()
                    }}
                  >
                    <RequestListItem wide={false} allowNavigate={false} request={r} />
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
