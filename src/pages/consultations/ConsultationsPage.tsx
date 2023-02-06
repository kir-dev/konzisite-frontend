import { Button, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useFetchConsultationListQuery } from '../../api/hooks/consultationQueryHooks'
import { ConsultationListItem } from '../../components/commons/ConsultationListItem'
import { PATHS } from '../../util/paths'
import { ErrorPage } from '../error/ErrorPage'
import { LoadingConsultationList } from './components/LoadingConsultationList'

export const ConsultationsPage = () => {
  const { isLoading, data: consultaions, error } = useFetchConsultationListQuery()

  if (error) {
    return <ErrorPage status={error.statusCode} title={error.message} />
  }

  return (
    <>
      <Helmet title={'Konzultációk'} />
      <Heading size="xl" textAlign="center" mb={3}>
        Konzultációk
      </Heading>
      <Flex justify="flex-end">
        <Button as={Link} to={`${PATHS.CONSULTATIONS}/new`} colorScheme="brand">
          Új konzultáció
        </Button>
      </Flex>
      {consultaions && consultaions.length === 0 ? (
        <Text>Nincsenek konzultációk!</Text>
      ) : (
        <VStack alignItems="stretch" mt={3}>
          {isLoading ? (
            <LoadingConsultationList />
          ) : (
            consultaions?.map((c) => (
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
          )}
        </VStack>
      )}
    </>
  )
}
