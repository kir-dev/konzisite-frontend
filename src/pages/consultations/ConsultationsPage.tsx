import { Button, Heading, HStack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ConsultationModel } from '../../api/model/consultation.model'
import { Major, SubjectModel } from '../../api/model/subject.model'
import { UserModel } from '../../api/model/user.model'

type ConsultationPreview = ConsultationModel & { subject: SubjectModel; presenters: UserModel[] }

const konzik: ConsultationPreview[] = [
  {
    id: 1,
    location: 'e',
    startDate: new Date(),
    endDate: new Date(),
    descMarkdown: 'very nice',
    subject: {
      id: 2,
      code: 'VIAU34564',
      name: 'bsz',
      majors: [Major.CE_BSC]
    },
    presenters: [
      {
        id: 1,
        authSchId: 'abc',
        firstName: 'Elek',
        lastName: 'Teszt',
        email: 'abc@cba.com'
      }
    ]
  }
]

export const ConsultationsPage = () => {
  const [consultaions, setConsultations] = useState<ConsultationPreview[]>(konzik)
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
          {c.presenters.map((u) => (
            <Text key={u.id}>
              {u.lastName} {u.firstName}
            </Text>
          ))}
        </HStack>
      ))}
    </>
  )
}
