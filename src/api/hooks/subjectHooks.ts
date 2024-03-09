import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { CreateSubject } from '../../pages/subjects/types/CreateSubject'
import { API_HOST } from '../../util/environment'
import { PATHS } from '../../util/paths'
import { KonziError } from '../model/error.model'
import { SubjectModel } from '../model/subject.model'

type FetchSubjectListMutationProps = {
  search: string
  locale?: string
  limit?: number
}

export const useFetchSubjectsQuery = () => {
  return useQuery<SubjectModel[], KonziError>({
    queryKey: ['fetchSubject'],
    queryFn: async () => (await axios.get(PATHS.SUBJECTS)).data,
    retry: false
  })
}

export const useFecthSubjectListMutation = (onError: (e: KonziError) => void) => {
  return useMutation<SubjectModel[], KonziError, FetchSubjectListMutationProps>({
    mutationKey: ['fetchSubjectsMuatation'],
    mutationFn: async ({ search, limit, locale }) => {
      const url = new URL(PATHS.SUBJECTS, API_HOST)
      url.searchParams.append('search', search)
      if (locale) url.searchParams.append('locale', locale)
      if (limit) url.searchParams.append('limit', limit.toString())
      return (await axios.get(url.toString())).data
    },
    onError
  })
}

export const useCreateSubjectMutation = () => {
  return useMutation<SubjectModel, KonziError, { formData: CreateSubject; subjectId: number }>({
    mutationFn: async ({ subjectId, ...otherData }) => (await axios.post(PATHS.SUBJECTS, otherData.formData)).data
  })
}

export const useUpdateSubjectMutation = () => {
  return useMutation<SubjectModel, KonziError, { formData: CreateSubject; subjectId: number }>({
    mutationFn: async (params) => (await axios.patch(`${PATHS.SUBJECTS}/${params.subjectId}`, params.formData)).data
  })
}

export const useDeleteSubjectMutation = (onError: (e: KonziError) => void) => {
  return useMutation<SubjectModel, KonziError, number>({
    mutationFn: async (subjectId: number) => (await axios.delete(`${PATHS.SUBJECTS}/${subjectId}`)).data,
    onError
  })
}

export const useImportSubjectsMutation = (onError: (e: KonziError) => void, onSuccess: (data: SubjectModel[]) => void) => {
  return useMutation<SubjectModel[], KonziError, FormData>({
    mutationFn: async (data: FormData) => (await axios.post('subjects/import', data)).data,
    onError,
    onSuccess
  })
}
