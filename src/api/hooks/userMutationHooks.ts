import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { UserList } from '../../pages/user/types/UserPreview'
import { API_HOST } from '../../util/environment'
import { PATHS } from '../../util/paths'
import { KonziError } from '../model/error.model'
import { UserModel } from '../model/user.model'

export type FetchUserListMutationProps = {
  search: string
  page?: number
  pageSize?: number
}

export type ReportDateRange = {
  startDate: Date
  endDate: Date
}

export const useFecthUserListMutation = (onError: (e: KonziError) => void) => {
  return useMutation<UserList, KonziError, FetchUserListMutationProps>({
    mutationKey: ['fetchUsersMuatation'],
    mutationFn: async ({ search, page, pageSize }: FetchUserListMutationProps) => {
      const url = new URL(PATHS.USERS, API_HOST)
      url.searchParams.append('search', search)
      if (page) url.searchParams.append('page', page.toString())
      if (pageSize) url.searchParams.append('pageSize', pageSize.toString())
      return (await axios.get(url.toString())).data
    },
    onError
  })
}

export const usePromoteUserMutation = (onSuccess: (data: UserModel) => void, onError: (e: KonziError) => void) => {
  return useMutation<UserModel, KonziError, number>({
    mutationFn: async (userId) => (await axios.post(`${PATHS.USERS}/${userId}/promote`)).data,
    onSuccess,
    onError
  })
}

export const useUserReportMutation = (onSuccess: () => void) => {
  return useMutation<ArrayBuffer, ArrayBuffer, ReportDateRange>({
    mutationFn: async (dr: ReportDateRange) =>
      (
        await axios.get(`reports/user-report?startDate=${dr.startDate.getTime()}&endDate=${dr.endDate.getTime()}`, {
          responseType: 'arraybuffer'
        })
      ).data,
    onSuccess
  })
}

export const useAdminReportMutation = (onSuccess: () => void) => {
  return useMutation<ArrayBuffer, ArrayBuffer, ReportDateRange>({
    mutationFn: async (dr: ReportDateRange) =>
      (
        await axios.get(`reports/admin-report?startDate=${dr.startDate.getTime()}&endDate=${dr.endDate.getTime()}`, {
          responseType: 'arraybuffer'
        })
      ).data,
    onSuccess
  })
}
