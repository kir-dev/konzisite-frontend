import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import { ConsultationDetails } from '../../pages/consultations/types/consultationDetails'
import { ConsultationPreview } from '../../pages/consultations/types/consultationPreview'
import { isValidId } from '../../util/core-util-functions'
import { API_HOST } from '../../util/environment'
import { PATHS } from '../../util/paths'
import { KonziError } from '../model/error.model'
import { Major } from '../model/subject.model'

export const useFetchConsultationListQuery = () => {
  return useQuery<ConsultationPreview[], KonziError>('fetchConsultations', async () => (await axios.get(PATHS.CONSULTATIONS)).data, {
    retry: false
  })
}

export type FetchConsultationsMutationProps = {
  major?: Major
}

export const useFetchConsultationListMutation = (onError: (e: KonziError) => void) => {
  return useMutation<ConsultationPreview[], KonziError, FetchConsultationsMutationProps>(
    'fetchConsultationsMuatation',
    async ({ major }: FetchConsultationsMutationProps) => {
      const url = new URL(PATHS.CONSULTATIONS, API_HOST)
      if (major) url.searchParams.append('major', major.toString())
      return (await axios.get(url.toString())).data
    },
    { onError }
  )
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
