import { useEffect, useState } from 'react'
import { ConsultationDetails } from './types/consultationDetails'

export const ConsultationDetailsPage = () => {
  const [consultaion, setConsultation] = useState<ConsultationDetails>()
  useEffect(() => {
    //setConsultations(axios.get<ConsultationFullDetails>("/consultaions/id"))
  }, [])

  return null
}
