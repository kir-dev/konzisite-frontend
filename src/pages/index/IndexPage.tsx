import { Alert, AlertIcon, Box, Button, Flex, Heading, Image, Spinner, Stack, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { FaArrowRight } from 'react-icons/fa'
import { Link as RRDLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { useFetchHomeDataQuery } from '../../api/hooks/homeQueryHook'
import { ConsultationListItem } from '../../components/commons/ConsultationListItem'
import Markdown from '../../components/commons/Markdown'
import { PageHeading } from '../../components/commons/PageHeading'
import { PATHS } from '../../util/paths'
import { ErrorPage } from '../error/ErrorPage'
import { RequestListItem } from '../requests/components/RequestListItem'

export const IndexPage = () => {
  const { error, data, isLoading } = useFetchHomeDataQuery()
  const { isLoggedIn } = useAuthContext()
  const kirDevLogo = useColorModeValue('/img/kirdev.svg', '/img/kirdev-white.svg')
  const spinnerColor = useColorModeValue('brand.500', 'white')
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const savedPath = localStorage.getItem('path')
    if (savedPath) {
      localStorage.removeItem('path')
      if (isLoggedIn) {
        navigate(savedPath)
      }
    }
  }, [isLoggedIn])

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
    return <ErrorPage title={t('errors.unkown')} />
  }

  return (
    <>
      <Helmet />
      <PageHeading title={t('home.welcome')} />
      {data.alert && (
        <Alert rounded="md" mb={2} status={data.alert.type}>
          <AlertIcon />
          <Box mt={2}>
            <Markdown markdown={data.alert.description} />
          </Box>
        </Alert>
      )}
      {data.unratedConsultations.length > 0 && (
        <Box mb={5}>
          <Alert rounded="md" mb={2} status="warning">
            <AlertIcon />
            {t('home.unratedConsultations')}
          </Alert>
          {data.unratedConsultations.map((c) => (
            <ConsultationListItem consultation={c} key={c.id} rightSmallText={t('home.unratedPresenter')} />
          ))}
        </Box>
      )}
      <Stack mb={2} direction={['column', 'row']} justify="space-between" align="center">
        <Heading size="md">{t('home.nextConsultations')}</Heading>
        <Button colorScheme="brand" as={RRDLink} to={PATHS.CONSULTATIONS} variant="ghost" rightIcon={<FaArrowRight />}>
          {t('home.allConsultations')}
        </Button>
      </Stack>

      <VStack alignItems="stretch">
        {data.consultations.length > 0 ? (
          data.consultations.map((c) => (
            <ConsultationListItem
              consultation={c}
              key={c.id}
              rightSmallText={t('home.presenters', {
                count: c.presentations.length,
                names: c.presentations.map((p) => p.fullName).join(', ')
              })}
            />
          ))
        ) : (
          <Text fontStyle="italic" textAlign="center">
            {t('home.noConsultations')}
          </Text>
        )}
      </VStack>

      <Stack mt={5} mb={2} direction={['column', 'row']} justify="space-between" align="center">
        <Heading size="md">{t('home.activeConsultationRequests')}</Heading>
        <Button colorScheme="brand" as={RRDLink} to={PATHS.REQUESTS} variant="ghost" rightIcon={<FaArrowRight />}>
          {t('home.allConsultationRequests')}
        </Button>
      </Stack>

      <VStack alignItems="stretch">
        {data.requests.length > 0 ? (
          data.requests.map((r) => (
            <RequestListItem
              request={r}
              key={r.id}
              rightSmallText={`${t('home.requestors', { count: r.supporterCount || 0 })} | ${t('home.consultationsForRequest', {
                count: r.consultationCount
              })}`}
            />
          ))
        ) : (
          <Text fontStyle="italic" textAlign="center">
            {t('home.noRequests')}
          </Text>
        )}
      </VStack>
    </>
  )
}
