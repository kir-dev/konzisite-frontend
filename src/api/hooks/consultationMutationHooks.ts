import axios from 'axios'
import { useMutation } from 'react-query'
import { CreateConsultation } from '../../pages/consultations/types/createConsultation'
import { ConsultationModel } from '../model/consultation.model'
import { KonziError } from '../model/error.model'

export const useCreateConsultationMutation = () => {
  return useMutation<ConsultationModel, KonziError, CreateConsultation>(
    async (formData) => (await axios.post('/consultations/', formData)).data
  )
}

export const useEditConsultationMutation = (consultationId: number) => {
  return useMutation<ConsultationModel, KonziError, CreateConsultation>(
    async (formData) => (await axios.patch(`/consultations/${consultationId}`, formData)).data
  )
}

export const useDeleteConsultationMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<ConsultationModel, KonziError, number>(
    async (consultationId) => (await axios.delete(`/consultations/${consultationId}`)).data,
    {
      onSuccess,
      onError
    }
  )
}

export const useJoinConsultationMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<ConsultationModel, KonziError, number>(
    async (consultationId) => (await axios.post(`/consultations/${consultationId}/join/`)).data,
    {
      onSuccess,
      onError
    }
  )
}

export const useLeaveConsultationMutation = (onError: (e: KonziError) => void) => {
  return useMutation<ConsultationModel, KonziError, number>(
    async (consultationId) => (await axios.post(`/consultations/${consultationId}/leave/`)).data,
    {
      onError
    }
  )
}
