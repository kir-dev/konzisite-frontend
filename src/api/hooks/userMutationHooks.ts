import axios from 'axios'
import { useMutation } from 'react-query'
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

export const useFecthUserListMutation = (onError: (e: KonziError) => void) => {
  return useMutation<UserList, KonziError, FetchUserListMutationProps>(
    'fetchUsersMuatation',
    async ({ search, page, pageSize }: FetchUserListMutationProps) => {
      const url = new URL(PATHS.USERS, API_HOST)
      url.searchParams.append('search', search)
      if (page) url.searchParams.append('page', page.toString())
      if (pageSize) url.searchParams.append('pageSize', pageSize.toString())
      return (await axios.get(url.toString())).data
    },
    { onError }
  )
}

export const usePromoteUserMutation = (onSuccess: (data: UserModel) => void, onError: (e: KonziError) => void) => {
  return useMutation<UserModel, KonziError, number>(async (userId) => (await axios.post(`${PATHS.USERS}/${userId}/promote`)).data, {
    onSuccess,
    onError
  })
}

export const useUserReportMutation = () => {
  return useMutation<ArrayBuffer, ArrayBuffer>(
    async () =>
      (await axios.get(`${PATHS.USERS}/report?startDate=1654540715000&endDate=1717699115000`, { responseType: 'arraybuffer' })).data
  )
}
