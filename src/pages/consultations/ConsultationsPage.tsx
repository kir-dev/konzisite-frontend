import { Button, Heading, HStack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ConsultationPreview } from './types/consultationPreview'

export const ConsultationsPage = () => {
  const [consultaions, setConsultations] = useState<ConsultationPreview[]>([])
  useEffect(() => {
    //setConsultations(axios.get<ConsultationPreview[]>("/consultaions"))
  }, [])

  return (
    <>
      <Button as={Link} to="/consultations/new" colorScheme="brand">
        Új konzultáció
      </Button>
      {consultaions.map((c) => (
        <HStack key={c.id}>
          <Heading>{c.descMarkdown}</Heading>
          <Text>
            {c.startDate.toDateString()}-{c.endDate.toDateString()}
          </Text>
          {c.presentations.map((u) => (
            <Text key={u.id}>
              {u.lastName} {u.firstName}
            </Text>
          ))}
        </HStack>
      ))}
    </>
  )
}
