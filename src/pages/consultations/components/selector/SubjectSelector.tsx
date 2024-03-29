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
  useToast,
  VStack
} from '@chakra-ui/react'
import debounce from 'lodash.debounce'
import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { Navigate } from 'react-router-dom'
import { useFecthSubjectListMutation } from '../../../../api/hooks/subjectHooks'
import { KonziError } from '../../../../api/model/error.model'
import { SubjectModel } from '../../../../api/model/subject.model'
import { generateSubjectName, SubjectName } from '../../../../components/commons/SubjectName'
import { generateToastParams } from '../../../../util/generateToastParams'
import { PATHS } from '../../../../util/paths'
import { CreateConsultationForm } from '../../types/createConsultation'

const INITIAL_SUBJECT_COUNT = 5

export const SubjectSelector = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<CreateConsultationForm>()

  const toast = useToast()
  const {
    isPending,
    data: subjectList,
    mutate: fetchSubjects,
    reset,
    error
  } = useFecthSubjectListMutation((e: KonziError) => {
    toast(generateToastParams(e, t))
  })
  const { i18n, t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search, setSearch] = useState('')

  const debouncedSearch = useRef(
    debounce((search: string) => {
      fetchSubjects({ search, limit: search ? undefined : INITIAL_SUBJECT_COUNT, locale: i18n.language })
    }, 400)
  ).current

  if (error) {
    return <Navigate replace to={PATHS.ERROR} state={{ title: error.message, status: error.statusCode, messages: [] }} />
  }

  return (
    <>
      <FormControl isInvalid={!!errors.subject} isRequired>
        <FormLabel> {t('selectors.subject')}</FormLabel>

        <Input
          cursor="pointer"
          onClick={() => {
            onOpen()
            setSearch('')
            reset()
            fetchSubjects({ search: '', limit: INITIAL_SUBJECT_COUNT })
          }}
          readOnly
          value={watch('subject') ? generateSubjectName(watch('subject'), i18n.language) : t('selectors.noneSelectedSubject')}
        />
      </FormControl>
      <Modal scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> {t('selectors.subjectSelector')}</ModalHeader>
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
                    fetchSubjects({ search: '', limit: INITIAL_SUBJECT_COUNT })
                  }}
                  cursor="pointer"
                />
              </InputRightElement>
            </InputGroup>
            <Input
              {...register('subject', {
                validate: (s: SubjectModel) => !!s
              })}
              hidden
            />
            <VStack mb={4} maxHeight="600px" overflowY="auto">
              {isPending || !subjectList || subjectList.length === 0 ? (
                <Text fontStyle="italic"> {t('selectors.noResult')}</Text>
              ) : (
                subjectList.map((s) => (
                  <Box
                    borderRadius={6}
                    borderWidth={1}
                    pt={2}
                    pb={2}
                    pl={4}
                    cursor="pointer"
                    key={s.id}
                    width="100%"
                    onClick={() => {
                      setValue('subject', s, { shouldValidate: true })
                      onClose()
                    }}
                  >
                    <Text>
                      <SubjectName subject={s} />
                    </Text>
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
