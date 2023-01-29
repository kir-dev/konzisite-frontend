import { Button, Flex, Heading, VStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useFecthConsultationListQuery } from '../../api/hooks/consultationQueryHooks'
import { ErrorPage } from '../error/ErrorPage'
import { ConsultationListItem } from './components/ConsultationListItem'
import { LoadingConsultationList } from './components/LoadingConsultationList'

export const ConsultationsPage = () => {
  const { isLoading, data: consultaions, error, refetch } = useFecthConsultationListQuery()

  if (error) {
    return <ErrorPage backPath={'/'} status={error.statusCode} title={error.message} />
  }

  return (
    <>
      <Helmet title={'Konzultációk'} />
      <Heading size="xl" textAlign="center" mb={3}>
        Konzultációk
      </Heading>
      <Flex justify="flex-end">
        <Button as={Link} to="/consultations/new" colorScheme="brand">
          Új konzultáció
        </Button>
      </Flex>
      <VStack alignItems="stretch" mt={3}>
        {isLoading ? <LoadingConsultationList /> : consultaions?.map((c) => <ConsultationListItem consultation={c} key={c.id} />)}
      </VStack>
    </>
  )
}
