import axios from 'axios'
import { useMutation } from 'react-query'
import { CreateConsultation } from '../../pages/consultations/types/createConsultation'
import { CreateRating } from '../../pages/consultations/types/createRating'
import { PATHS } from '../../util/paths'
import { ConsultationModel } from '../model/consultation.model'
import { KonziError } from '../model/error.model'

export const useCreateConsultationMutation = () => {
  return useMutation<ConsultationModel, KonziError, CreateConsultation>(
    async (formData) => (await axios.post(PATHS.CONSULTATIONS, formData)).data
  )
}

export const useEditConsultationMutation = (consultationId: number) => {
  return useMutation<ConsultationModel, KonziError, CreateConsultation>(
    async (formData) => (await axios.patch(`${PATHS.CONSULTATIONS}/${consultationId}`, formData)).data
  )
}

export const useDeleteConsultationMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<ConsultationModel, KonziError, number>(
    async (consultationId) => (await axios.delete(`${PATHS.CONSULTATIONS}/${consultationId}`)).data,
    {
      onSuccess,
      onError
    }
  )
}

export const useJoinConsultationMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<ConsultationModel, KonziError, number>(
    async (consultationId) => (await axios.post(`${PATHS.CONSULTATIONS}/${consultationId}/join/`)).data,
    {
      onSuccess,
      onError
    }
  )
}

export const useLeaveConsultationMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<ConsultationModel, KonziError, number>(
    async (consultationId) => (await axios.post(`${PATHS.CONSULTATIONS}/${consultationId}/leave/`)).data,
    {
      onSuccess,
      onError
    }
  )
}

export const useRateConsultationMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<ConsultationModel, KonziError, { data: CreateRating; consultationId: number }>(
    async (params) => (await axios.post(`${PATHS.CONSULTATIONS}/${params.consultationId}/rate/`, params.data)).data,
    {
      onSuccess,
      onError
    }
  )
}

export const useUpdateRatingConsultationMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<ConsultationModel, KonziError, { data: CreateRating; consultationId: number }>(
    async (params) => (await axios.patch(`${PATHS.CONSULTATIONS}/${params.consultationId}/rate/`, params.data)).data,
    {
      onSuccess,
      onError
    }
  )
}

export const useUploadFileMutation = (
  consultationId: number,
  onSuccess: (data: ConsultationModel) => void,
  onError: (e: KonziError) => void
) => {
  return useMutation<ConsultationModel, KonziError, FormData>(
    async (data) => (await axios.patch(`${PATHS.CONSULTATIONS}/${consultationId}/file`, data)).data,
    {
      onError,
      onSuccess
    }
  )
}

export const useDeleteFileMutation = (
  consultationId: number,
  onSuccess: (data: ConsultationModel) => void,
  onError: (e: KonziError) => void
) => {
  return useMutation<ConsultationModel, KonziError>(
    async () => (await axios.patch(`${PATHS.CONSULTATIONS}/${consultationId}/deleteFile`)).data,
    {
      onError,
      onSuccess
    }
  )
}

export const useDownloadFileMutation = () => {
  return useMutation<ArrayBuffer, ArrayBuffer, number>(
    async (consultationId) => (await axios.get(`${PATHS.CONSULTATIONS}/${consultationId}/file`, { responseType: 'arraybuffer' })).data
  )
}

export const useExportConsultationMutation = () => {
  return useMutation<ArrayBuffer, ArrayBuffer, number>(
    async (consultationId) => (await axios.get(`${PATHS.CONSULTATIONS}/${consultationId}/ics`, { responseType: 'arraybuffer' })).data
  )
}
