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
import { generateToastParams } from '../../util/generateToastParams'
import { PATHS } from '../../util/paths'
import { ErrorPage } from '../error/ErrorPage'
import { MajorArray, translateMajor } from '../subjects/util/majorHelpers'
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
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const { isOpen, onToggle } = useDisclosure()

  useEffect(() => {
    fetchConsultations(major, startDate, endDate)
  }, [major, startDate, endDate])

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
      <Collapse in={isOpen}>
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
            <Input type="date" onChange={(e) => setStartDate(new Date(e.target.value))} />
          </Flex>
          <Flex direction={{ base: 'column', md: 'row' }} align={{ base: '', md: 'center' }} grow={1}>
            <Text mr={2} fontWeight="bold">
              Befejezés
            </Text>
            <Input type="date" onChange={(e) => setEndDate(new Date(e.target.value))} />
          </Flex>
        </Stack>
      </Collapse>
      <Tabs mt={8} isFitted rounded="lg" variant="enclosed" colorScheme="brand">
        <TabList>
          <Tab>Lista</Tab>
          <Tab>Naptár</Tab>
        </TabList>
        <TabPanels>
          <ConsultationsListPanel isLoading={isLoading} consultaions={consultaions} />
          <ConsultationsCalendarPanel consultaions={consultaions} />
        </TabPanels>
      </Tabs>
    </>
  )
}
