import { Button, Heading, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ConsultationListItem } from './components/ConsultationListItem'
import { LoadingConsultationList } from './components/LoadingConsultationList'
import { testConsultationPreview } from './demoData'
import { ConsultationPreview } from './types/consultationPreview'

export const ConsultationsPage = () => {
  const [consultaions, setConsultations] = useState<ConsultationPreview[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    //setConsultations(axios.get<ConsultationPreview[]>("/consultaions"))
    setTimeout(() => {
      setConsultations(testConsultationPreview)
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      <Heading size="xl" textAlign="center" mb={3}>
        Konzultációk
      </Heading>
      <Button as={Link} to="/consultations/new" colorScheme="brand">
        Új konzultáció
      </Button>
      <VStack alignItems="stretch" mt={3}>
        {loading ? <LoadingConsultationList /> : consultaions.map((c) => <ConsultationListItem consultation={c} key={c.id} />)}
      </VStack>
    </>
  )
}
