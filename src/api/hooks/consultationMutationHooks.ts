import axios from 'axios'
import { useMutation } from 'react-query'
import { ConsultationModel } from '../model/consultation.model'
import { KonziError } from '../model/error.model'

export const useCreateConsultationMutation = () => {
  return useMutation<ConsultationModel, KonziError, ConsultationModel>(
    async (formData) => (await axios.post('/consultations/', formData)).data
  )
}

export const useEditConsultationMutation = (consultationId: number) => {
  return useMutation<ConsultationModel, KonziError, ConsultationModel>(
    async (formData) => (await axios.patch(`/consultations/${consultationId}`, formData)).data
  )
}
