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
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { FetchConsultationsMutationProps, useFetchConsultationListMutation } from '../../api/hooks/consultationQueryHooks'
import { Language } from '../../api/model/consultation.model'
import { KonziError } from '../../api/model/error.model'
import { Major } from '../../api/model/subject.model'
import { PageHeading } from '../../components/commons/PageHeading'
import { formatDate } from '../../util/dateHelper'
import { generateToastParams } from '../../util/generateToastParams'
import { MajorArray } from '../../util/majorHelpers'
import { PATHS } from '../../util/paths'
import { ErrorPage } from '../error/ErrorPage'
import { ConsultationsCalendarPanel } from './components/panel/ConsultationsCalendarPanel'
import { ConsultationsListPanel } from './components/panel/ConsultationsListPanel'

export const ConsultationsPage = () => {
  const { t } = useTranslation()
  const toast = useToast()
  const {
    isLoading,
    data: consultaions,
    mutate: mutateConsultations,
    error
  } = useFetchConsultationListMutation((e: KonziError) => {
    toast(generateToastParams(e))
  })

  const fetchConsultations = (major?: Major, language?: Language, startDate?: Date, endDate?: Date) => {
    const props: FetchConsultationsMutationProps = {
      major,
      language,
      startDate,
      endDate
    }
    mutateConsultations(props)
  }

  const [major, setMajor] = useState<Major>()
  const [language, setLanguage] = useState<Language>()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [hideCalendar, setHideCalendar] = useState<boolean>(false)

  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

  useEffect(() => {
    fetchConsultations(major, language, startDate, endDate)
  }, [major, language, startDate, endDate])

  useSafeLayoutEffect(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    setStartDate(date)
    setHideCalendar(true)
  }, [])

  if (error) {
    return <ErrorPage status={error.statusCode} title={error.message} />
  }

  return (
    <>
      <Helmet title="Konzultációk" />
      <PageHeading title="Konzultációk" />
      <Flex justify="space-between">
        <Button rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />} onClick={onToggle}>
          Szűrés
        </Button>
        <Button as={Link} to={`${PATHS.CONSULTATIONS}/new`} colorScheme="brand">
          Új konzultáció
        </Button>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Stack columnGap={5} mt={3} direction={{ base: 'column', md: 'row' }}>
          <Flex direction="column" grow={1}>
            <Text mb={1} fontWeight="bold">
              Szak
            </Text>
            <Select placeholder="Minden szak" onChange={(e) => setMajor(e.target.value as Major)}>
              {MajorArray.map((m) => (
                <option value={m} key={m}>
                  {t(m)}
                </option>
              ))}
            </Select>
          </Flex>
          <Flex direction="column" grow={1}>
            <Text mb={1} fontWeight="bold">
              Nyelv
            </Text>
            <Select placeholder="Minden nyelv" onChange={(e) => setLanguage(e.target.value as Language)}>
              <option value={Language.hu} key={Language.hu}>
                Magyar
              </option>
              <option value={Language.en} key={Language.en}>
                Angol
              </option>
            </Select>
          </Flex>
          <Flex direction="column" grow={1}>
            <Text mb={1} fontWeight="bold">
              Kezdés
            </Text>
            <Input value={formatDate(startDate)} type="date" onChange={(e) => setStartDate(new Date(e.target.value))} />
          </Flex>
          <Flex direction="column" grow={1}>
            <Text mb={1} fontWeight="bold">
              Befejezés
            </Text>
            <Input value={formatDate(endDate)} type="date" onChange={(e) => setEndDate(new Date(e.target.value))} />
          </Flex>
        </Stack>
      </Collapse>
      <Tabs mt={8} isFitted rounded="lg" variant="enclosed" colorScheme="brand">
        <TabList>
          <Tab onFocus={() => setHideCalendar(true)}>Lista</Tab>
          <Tab onFocus={() => setHideCalendar(false)}>Naptár</Tab>
        </TabList>
        <TabPanels>
          <ConsultationsListPanel isLoading={isLoading} consultaions={consultaions} />
          <ConsultationsCalendarPanel hideCalendar={hideCalendar} consultaions={consultaions} />
        </TabPanels>
      </Tabs>
    </>
  )
}
