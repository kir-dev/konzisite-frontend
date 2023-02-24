import { Alert, AlertIcon, Box, Button, Flex, Heading, Image, Spinner, Stack, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useFetchHomeDataQuery } from '../../api/hooks/homeQueryHook'
import { ConsultationListItem } from '../../components/commons/ConsultationListItem'
import Markdown from '../../components/commons/Markdown'
import { PageHeading } from '../../components/commons/PageHeading'
import { PATHS } from '../../util/paths'
import { ErrorPage } from '../error/ErrorPage'
import { RequestListItem } from '../requests/components/RequestListItem'

export const IndexPage = () => {
  const { error, data, isLoading } = useFetchHomeDataQuery()
  const kirDevLogo = useColorModeValue('/img/kirdev.svg', '/img/kirdev-white.svg')
  const spinnerColor = useColorModeValue('brand.500', 'white')
  if (error) {
    return <ErrorPage status={error.statusCode} title={error.message} />
  }
  if (isLoading) {
    return (
      <Flex direction="column" h="100%" justifyContent="center" alignItems="center">
        <Spinner color={spinnerColor} size="xl" thickness="0.3rem" my={10} />
        <Image src={kirDevLogo} maxW={40} maxH={40} my={3} />
      </Flex>
    )
  }

  if (!data) {
    return <ErrorPage title="Ismeretlen hiba, kérjük próbáld újra" />
  }

  return (
    <>
      <Helmet />
      <PageHeading title="Üdvözlünk a Konzisite&#8209;on!" />
      {data.alert && (
        <Alert rounded="md" my={2} status={data.alert.type}>
          <AlertIcon />
          <Box mt={2}>
            <Markdown markdown={data.alert.description} />
          </Box>
        </Alert>
      )}
      {data.unratedConsultations.length > 0 && (
        <Box mb={5}>
          <Alert rounded="md" my={2} status="warning">
            <AlertIcon />
            Az alábbi konzultációkon részt vettél, de még nem értékelted az előadókat! Kérlek tedd meg minél előbb, hogy kapjanak
            visszajelzést!
          </Alert>
          {data.unratedConsultations.map((c) => (
            <ConsultationListItem consultation={c} key={c.id} rightSmallText="Még nem értékelted valamelyik előadót!" />
          ))}
        </Box>
      )}
      <Stack mb={2} direction={['column', 'row']} justify="space-between" align="center">
        <Heading size="md">Következő konzik</Heading>
        <Button colorScheme="brand" as={Link} to={PATHS.CONSULTATIONS} variant="ghost" rightIcon={<FaArrowRight />}>
          Összes konzi
        </Button>
      </Stack>

      <VStack alignItems="stretch">
        {data.consultations.length > 0 ? (
          data.consultations.map((c) => (
            <ConsultationListItem
              consultation={c}
              key={c.id}
              rightSmallText={
                c.presentations.length <= 3
                  ? `Konzitartó${c.presentations.length > 1 ? 'k' : ''}:
            ${c.presentations.map((p) => p.fullName).join(', ')}`
                  : `${c.presentations.length} konzitartó`
              }
            />
          ))
        ) : (
          <Text fontStyle="italic" textAlign="center">
            Nincs kiírva egy konzi sem
          </Text>
        )}
      </VStack>

      <Stack mt={5} mb={2} direction={['column', 'row']} justify="space-between" align="center">
        <Heading size="md">Aktív konzi kérések</Heading>
        <Button colorScheme="brand" as={Link} to={PATHS.REQUESTS} variant="ghost" rightIcon={<FaArrowRight />}>
          Összes kérés
        </Button>
      </Stack>

      <VStack alignItems="stretch">
        {data.requests.length > 0 ? (
          data.requests.map((r) => (
            <RequestListItem
              request={r}
              key={r.id}
              rightSmallText={`${(r.supporterCount || 0) + 1} ember kérte | ${r.consultationCount} konzi`}
            />
          ))
        ) : (
          <Text fontStyle="italic" textAlign="center">
            Nincs egy aktív kérés se
          </Text>
        )}
      </VStack>
    </>
  )
}
