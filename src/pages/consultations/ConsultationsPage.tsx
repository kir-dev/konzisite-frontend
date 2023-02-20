import {
  Button,
  Collapse,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { FetchConsultationsMutationProps, useFetchConsultationListMutation } from '../../api/hooks/consultationQueryHooks'
import { KonziError } from '../../api/model/error.model'
import { Major } from '../../api/model/subject.model'
import { formatDate } from '../../util/dateHelper'
import { generateToastParams } from '../../util/generateToastParams'
import { MajorArray, translateMajor } from '../../util/majorHelpers'
import { PATHS } from '../../util/paths'
import { ErrorPage } from '../error/ErrorPage'
import { ConsultationsCalendarPanel } from './components/ConsultationsCalendarPanel'
import { ConsultationsListPanel } from './components/ConsultationsListPanel'

export const ConsultationsPage = () => {
  const toast = useToast()
  const {
    isLoading,
    data: consultaions,
    mutate: mutateConsultations,
    error
  } = useFetchConsultationListMutation((e: KonziError) => {
    toast(generateToastParams(e))
  })

  const fetchConsultations = (major?: Major, startDate?: Date, endDate?: Date) => {
    const props: FetchConsultationsMutationProps = {
      major,
      startDate,
      endDate
    }
    mutateConsultations(props)
  }

  const [major, setMajor] = useState<Major>()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>()
  const [hideCalendar, setHideCalendar] = useState<boolean>(false)

  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

  useEffect(() => {
    fetchConsultations(major, startDate, endDate)
  }, [major, startDate, endDate])

  useEffect(() => {
    setTimeout(() => setHideCalendar(true), 25)
  }, [])

  if (error) {
    return <ErrorPage status={error.statusCode} title={error.message} />
  }

  return (
    <>
      <Helmet title={'Konzultációk'} />
      <Heading size="xl" textAlign="center" mb={3}>
        Konzultációk
      </Heading>
      <Flex justify="space-between">
        <Button rightIcon={isOpen ? <FaChevronUp /> : <FaChevronDown />} onClick={onToggle}>
          Szűrés
        </Button>
        <Button as={Link} to={`${PATHS.CONSULTATIONS}/new`} colorScheme="brand">
          Új konzultáció
        </Button>
      </Flex>
      <Flex></Flex>
      <Collapse in={isOpen} animateOpacity>
        <Stack columnGap={5} mt={3} direction={{ base: 'column', md: 'row' }}>
          <Flex direction={{ base: 'column', md: 'row' }} align={{ base: '', md: 'center' }} grow={1}>
            <Text mr={2} fontWeight="bold">
              Szak
            </Text>
            <Select placeholder="Minden szak" onChange={(e) => setMajor(e.target.value as Major)}>
              {MajorArray.map((m) => (
                <option value={m} key={m}>
                  {translateMajor[m]}
                </option>
              ))}
            </Select>
          </Flex>
          <Flex direction={{ base: 'column', md: 'row' }} align={{ base: '', md: 'center' }} grow={1}>
            <Text mr={2} fontWeight="bold">
              Kezdés
            </Text>
            <Input value={formatDate(startDate)} type="date" onChange={(e) => setStartDate(new Date(e.target.value))} />
          </Flex>
          <Flex direction={{ base: 'column', md: 'row' }} align={{ base: '', md: 'center' }} grow={1}>
            <Text mr={2} fontWeight="bold">
              Befejezés
            </Text>
            <Input value={formatDate(endDate)} type="date" onChange={(e) => setEndDate(new Date(e.target.value))} />
          </Flex>
        </Stack>
      </Collapse>
      <Tabs mt={8} isFitted rounded="lg" variant="enclosed" colorScheme="brand">
        <TabList>
          <Tab onClick={() => setHideCalendar(true)}>Lista</Tab>
          <Tab onClick={() => setHideCalendar(false)}>Naptár</Tab>
        </TabList>
        <TabPanels>
          <ConsultationsListPanel isLoading={isLoading} consultaions={consultaions} />
          <ConsultationsCalendarPanel hideCalendar={hideCalendar} consultaions={consultaions} />
        </TabPanels>
      </Tabs>
    </>
  )
}
