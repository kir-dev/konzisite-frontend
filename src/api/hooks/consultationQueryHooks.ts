import axios from 'axios'
import { useQuery } from 'react-query'
import { ConsultationDetails } from '../../pages/consultations/types/consultationDetails'
import { ConsultationPreview } from '../../pages/consultations/types/consultationPreview'
import { isValidId } from '../../util/core-util-functions'
import { PATHS } from '../../util/paths'
import { KonziError } from '../model/error.model'

export const useFetchConsultationListQuery = () => {
  return useQuery<ConsultationPreview[], KonziError>('fetchConsultations', async () => (await axios.get(PATHS.CONSULTATIONS)).data, {
    retry: false
  })
}

export const useFetchConsultationbDetailsQuery = (consultationId: number) => {
  return useQuery<ConsultationDetails, KonziError>(
    ['fetchConsultationDetails', consultationId],
    async () => (await axios.get(`${PATHS.CONSULTATIONS}/${consultationId}`)).data,
    {
      retry: false,
      enabled: isValidId(consultationId)
    }
  )
}
