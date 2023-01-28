import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import { CreateSubject } from '../../pages/subjects/types/CreateSubject'
import { CreateManyResponse } from '../model/createManyResponse'
import { KonziError } from '../model/error.model'
import { SubjectModel } from '../model/subject.model'

export const useFetchSubjectsQuery = () => {
  return useQuery<SubjectModel[], KonziError>('fetchSubject', async () => (await axios.get('/subjects')).data, { retry: false })
}

export const useCreateSubjectMutation = () => {
  return useMutation<SubjectModel, KonziError, { formData: CreateSubject; subjectId: number }>(
    async ({ subjectId, ...otherData }) => (await axios.post('/subjects', otherData.formData)).data
  )
}

export const useUpdateSubjectMutation = () => {
  return useMutation<SubjectModel, KonziError, { formData: CreateSubject; subjectId: number }>(
    async (params) => (await axios.patch(`/subjects/${params.subjectId}`, params.formData)).data
  )
}

export const useDeleteSubjectMutation = (onError: (e: KonziError) => void) => {
  return useMutation<SubjectModel, KonziError, number>(async (subjectId: number) => (await axios.delete(`/subjects/${subjectId}`)).data, {
    onError
  })
}

export const useImportSubjectsMutation = (onError: (e: KonziError) => void) => {
  return useMutation<CreateManyResponse, KonziError, FormData>(async (data: FormData) => (await axios.post('subjects/import', data)).data, {
    onError
  })
}
