import { Button, Heading, HStack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ConsultationModel } from '../../api/model/consultation.model'

const konziTomb: ConsultationModel[] = [
  {
    id: 1,
    location: '1317 tanuló',
    startDate: new Date(),
    endDate: new Date(),
    descMarkdown: 'nagyon érdekes konzi',
    owner: {
      id: 1,
      authSchId: 'abc',
      firstName: 'Elek',
      lastName: 'Teszt',
      email: 'abc@cba.com'
    }
  },
  {
    id: 2,
    location: '517 tanuló',
    startDate: new Date(),
    endDate: new Date(),
    descMarkdown: 'nagyon érdekes konzi2',
    owner: {
      id: 1,
      authSchId: 'abc',
      firstName: 'Elek',
      lastName: 'Teszt',
      email: 'abc@cba.com'
    }
  },
  {
    id: 3,
    location: 'IB028',
    startDate: new Date(),
    endDate: new Date(),
    descMarkdown: 'nagyon érdekes konzi3',
    owner: {
      id: 1,
      authSchId: 'abc',
      firstName: 'Elek',
      lastName: 'Teszt',
      email: 'abc@cba.com'
    }
  }
]

export const ConsultationPage = () => {
  const [consultaions, setConsultations] = useState<ConsultationModel[]>([])
  useEffect(() => {
    //setConsultations(axios.get<ConsultaionModel[]>("/consultaions"))
  }, [])

  return (
    <>
      <Button as={Link} to="/consultations/new" colorScheme="brand">
        Új konzultáció
      </Button>
      {konziTomb.map((c) => (
        <HStack>
          <Heading>{c.descMarkdown}</Heading>
          <Text>
            {c.startDate.toDateString()}-{c.endDate.toDateString()}
          </Text>
          <Text>
            {c.owner.lastName} {c.owner.firstName}
          </Text>
        </HStack>
      ))}
    </>
  )
}
