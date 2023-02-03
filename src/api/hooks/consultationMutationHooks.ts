import axios from 'axios'
import { useMutation } from 'react-query'
import { CreateConsultation } from '../../pages/consultations/types/createConsultation'
import { CreateRating } from '../../pages/consultations/types/createRating'
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

export const useLeaveConsultationMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<ConsultationModel, KonziError, number>(
    async (consultationId) => (await axios.post(`/consultations/${consultationId}/leave/`)).data,
    {
      onSuccess,
      onError
    }
  )
}

export const useRateConsultationMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<ConsultationModel, KonziError, { data: CreateRating; consultationId: number }>(
    async (params) => (await axios.post(`/consultations/${params.consultationId}/rate/`, params.data)).data,
    {
      onSuccess,
      onError
    }
  )
}

export const useUpdateRatingConsultationMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<ConsultationModel, KonziError, { data: CreateRating; consultationId: number }>(
    async (params) => (await axios.patch(`/consultations/${params.consultationId}/rate/`, params.data)).data,
    {
      onSuccess,
      onError
    }
  )
}
