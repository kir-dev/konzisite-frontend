import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { CreateRequest } from '../../pages/requests/types/createRequest'
import { PATHS } from '../../util/paths'
import { ConsultationRequestModel } from '../model/consultationrequest.model'
import { KonziError } from '../model/error.model'

export const useCreateRequestMutation = () => {
  return useMutation<ConsultationRequestModel, KonziError, CreateRequest>({
    mutationFn: async (formData) => (await axios.post(PATHS.REQUESTS, formData)).data
  })
}

export const useEditRequestMutation = (requestId: number) => {
  return useMutation<ConsultationRequestModel, KonziError, CreateRequest>({
    mutationFn: async (formData) => (await axios.patch(`${PATHS.REQUESTS}/${requestId}`, formData)).data
  })
}

export const useDeleteRequestMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<ConsultationRequestModel, KonziError, number>({
    mutationFn: async (requestId) => (await axios.delete(`${PATHS.REQUESTS}/${requestId}`)).data,
    onSuccess,
    onError
  })
}

export const useSupportRequestMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<ConsultationRequestModel, KonziError, number>({
    mutationFn: async (requestId) => (await axios.post(`${PATHS.REQUESTS}/${requestId}/support`)).data,
    onSuccess,
    onError
  })
}

export const useUnsupportRequestMutation = (onSuccess: () => void, onError: (e: KonziError) => void) => {
  return useMutation<ConsultationRequestModel, KonziError, number>({
    mutationFn: async (requestId) => (await axios.post(`${PATHS.REQUESTS}/${requestId}/unsupport`)).data,
    onSuccess,
    onError
  })
}
