import axios from 'axios'
import { useQuery } from 'react-query'
import { ConsultationDetails } from '../../pages/consultations/types/consultationDetails'
import { ConsultationPreview } from '../../pages/consultations/types/consultationPreview'
import { KonziError } from '../model/error.model'

export const useFetchConsultationListQuery = () => {
  return useQuery<ConsultationPreview[], KonziError>('fetchConsultations', async () => (await axios.get('/consultations')).data, {
    retry: false
  })
}

export const useFetchConsultationbDetailsQuery = (consultationId: number) => {
  return useQuery<ConsultationDetails, KonziError>(
    ['fetchConsultationDetails', consultationId],
    async () => (await axios.get(`/consultations/${consultationId}`)).data,
    {
      retry: false,
      enabled: consultationId > 0 && !isNaN(consultationId)
    }
  )
}
