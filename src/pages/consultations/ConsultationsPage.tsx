import {
  Button,
  Collapse,
  Flex,
  Input,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useSafeLayoutEffect,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ConsultationFilters, useFetchConsultationListMutation } from '../../api/hooks/consultationQueryHooks'
import { Language } from '../../api/model/consultation.model'
import { KonziError } from '../../api/model/error.model'
import { Major } from '../../api/model/subject.model'
import { PageHeading } from '../../components/commons/PageHeading'
import { formatDate } from '../../util/dateHelper'
import { generateToastParams } from '../../util/generateToastParams'
import { MajorArray } from '../../util/majorHelpers'
import { parseFilterState } from '../../util/parseFilterState'
import { PATHS } from '../../util/paths'
import { ErrorPage } from '../error/ErrorPage'
import { ConsultationsCalendarPanel } from './components/panel/ConsultationsCalendarPanel'
import { ConsultationsListPanel } from './components/panel/ConsultationsListPanel'

export const ConsultationsPage = () => {
  const { t } = useTranslation()
  const toast = useToast()
  const {
    isPending,
    data: consultaions,
    mutate: mutateConsultations,
    error
  } = useFetchConsultationListMutation((e: KonziError) => {
    toast(generateToastParams(e, t))
  })

  const [filterState, setFilterState] = useState<ConsultationFilters>({})
  const [hideCalendar, setHideCalendar] = useState<boolean>(false)

  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

  const updateFilterState = <K extends keyof ConsultationFilters>(key: K, newValue: ConsultationFilters[K]) => {
    const newState: ConsultationFilters = { ...filterState, [key]: newValue }
    localStorage.setItem('filterState', JSON.stringify(newState))
    setFilterState(newState)
    mutateConsultations(newState)
  }

  useSafeLayoutEffect(() => {
    const defaultDate = new Date()
    defaultDate.setHours(0, 0, 0, 0)
    const savedState: ConsultationFilters = parseFilterState() ?? { startDate: defaultDate }
    setFilterState(savedState)
    mutateConsultations(savedState)
    setHideCalendar(true)
  }, [])

  if (error) {
    return <ErrorPage status={error.statusCode} title={error.message} />
  }

  return (
    <>
      <Helmet title={t('consultationListPage.title')} />
      <PageHeading title={t('consultationListPage.title')} />
      <Flex justify="space-between">
        <Button rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />} onClick={onToggle}>
          {t('consultationListPage.filter')}
        </Button>
        <Button as={Link} to={`${PATHS.CONSULTATIONS}/new`} colorScheme="brand">
          {t('consultationListPage.newKonzi')}
        </Button>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Stack columnGap={5} mt={3} direction={{ base: 'column', md: 'row' }}>
          <Flex direction="column" grow={1}>
            <Text mb={1} fontWeight="bold">
              {t('consultationListPage.major')}
            </Text>
            <Select
              placeholder={t('consultationListPage.allMajors')}
              value={filterState.major}
              onChange={(e) => updateFilterState('major', e.target.value as Major)}
            >
              {MajorArray.map((m) => (
                <option value={m} key={m}>
                  {t(m)}
                </option>
              ))}
            </Select>
          </Flex>
          <Flex direction="column" grow={1}>
            <Text mb={1} fontWeight="bold">
              {t('consultationListPage.language')}
            </Text>
            <Select
              placeholder={t('consultationListPage.allLanguages')}
              value={filterState.language}
              onChange={(e) => updateFilterState('language', e.target.value as Language)}
            >
              <option value={Language.hu} key={Language.hu}>
                {t('consultationListPage.hungarian')}
              </option>
              <option value={Language.en} key={Language.en}>
                {t('consultationListPage.english')}
              </option>
            </Select>
          </Flex>
          <Flex direction="column" grow={1}>
            <Text mb={1} fontWeight="bold">
              {t('consultationListPage.from')}
            </Text>
            <Input
              value={formatDate(filterState.startDate)}
              type="date"
              onChange={(e) => updateFilterState('startDate', new Date(e.target.value))}
            />
          </Flex>
          <Flex direction="column" grow={1}>
            <Text mb={1} fontWeight="bold">
              {t('consultationListPage.to')}
            </Text>
            <Input
              value={formatDate(filterState.endDate)}
              type="date"
              onChange={(e) => updateFilterState('endDate', new Date(e.target.value))}
            />
          </Flex>
        </Stack>
      </Collapse>
      <Tabs mt={8} isFitted rounded="lg" variant="enclosed" colorScheme="brand">
        <TabList>
          <Tab onFocus={() => setHideCalendar(true)}>{t('consultationListPage.list')}</Tab>
          <Tab onFocus={() => setHideCalendar(false)}>{t('consultationListPage.calendar')}</Tab>
        </TabList>
        <TabPanels>
          <ConsultationsListPanel isLoading={isPending} consultaions={consultaions} />
          <ConsultationsCalendarPanel hideCalendar={hideCalendar} consultaions={consultaions} />
        </TabPanels>
      </Tabs>
    </>
  )
}
