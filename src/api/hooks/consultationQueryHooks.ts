import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { ConsultationDetails } from '../../pages/consultations/types/consultationDetails'
import { ConsultationPreview } from '../../pages/consultations/types/consultationPreview'
import { isValidId } from '../../util/core-util-functions'
import { API_HOST } from '../../util/environment'
import { PATHS } from '../../util/paths'
import { Language } from '../model/consultation.model'
import { KonziError } from '../model/error.model'
import { Major } from '../model/subject.model'

export const useFetchConsultationListQuery = () => {
  return useQuery<ConsultationPreview[], KonziError>({
    queryKey: ['fetchConsultations'],
    queryFn: async () => (await axios.get(PATHS.CONSULTATIONS)).data,
    retry: false
  })
}

export type FetchConsultationsMutationProps = {
  major?: Major
  language?: Language
  startDate?: Date
  endDate?: Date
}

export const useFetchConsultationListMutation = (onError: (e: KonziError) => void) => {
  return useMutation<ConsultationPreview[], KonziError, FetchConsultationsMutationProps>({
    mutationKey: ['fetchConsultationsMuatation'],
    mutationFn: async ({ major, language, startDate, endDate }: FetchConsultationsMutationProps) => {
      const url = new URL(PATHS.CONSULTATIONS, API_HOST)
      if (major) url.searchParams.append('major', major.toString())
      if (language) url.searchParams.append('language', language.toString())
      if (startDate) url.searchParams.append('startDate', startDate.getTime().toString())
      if (endDate) url.searchParams.append('endDate', endDate.getTime().toString())
      return (await axios.get(url.toString())).data
    },
    onError
  })
}

export const useFetchConsultationbDetailsQuery = (consultationId: number) => {
  return useQuery<ConsultationDetails, KonziError>({
    queryKey: ['fetchConsultationDetails', consultationId],
    queryFn: async () => (await axios.get(`${PATHS.CONSULTATIONS}/${consultationId}`)).data,
    retry: false,
    enabled: isValidId(consultationId)
  })
}
