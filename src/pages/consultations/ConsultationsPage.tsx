import { Button, Flex, Heading, Select, Text, useToast, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FetchConsultationsMutationProps, useFetchConsultationListMutation } from '../../api/hooks/consultationQueryHooks'
import { KonziError } from '../../api/model/error.model'
import { Major } from '../../api/model/subject.model'
import { ConsultationListItem } from '../../components/commons/ConsultationListItem'
import { generateToastParams } from '../../util/generateToastParams'
import { PATHS } from '../../util/paths'
import { ErrorPage } from '../error/ErrorPage'
import { LoadingConsultationList } from './components/LoadingConsultationList'

export const ConsultationsPage = () => {
  //const { isLoading, data: consultaions, error } = useFetchConsultationListQuery()
  const toast = useToast()
  const {
    isLoading,
    data: consultaions,
    mutate: mutateConsultations,
    error
  } = useFetchConsultationListMutation((e: KonziError) => {
    toast(generateToastParams(e))
  })

  const fetchConsultations = (major?: Major) => {
    const props: FetchConsultationsMutationProps = {
      major
    }
    mutateConsultations(props)
  }

  const [major, setMajor] = useState<Major>()

  useEffect(() => {
    fetchConsultations(major)
  }, [major])

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
      <Text>Szak</Text>
      <Select placeholder="Válassz szakot" onChange={(e) => setMajor(e.target.value as Major)}>
        {Object.keys(Major).map((m) => (
          <option key={m}>{m}</option>
        ))}
      </Select>
      {consultaions && consultaions.length === 0 ? (
        <Text mt={3} textAlign="center">
          Nincsenek konzultációk!
        </Text>
      ) : (
        <VStack alignItems="stretch" mt={3}>
          {isLoading ? (
            <LoadingConsultationList />
          ) : (
            <>
              {consultaions?.map((c) => (
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
              ))}
            </>
          )}
        </VStack>
      )}
    </>
  )
}
