import axios from 'axios'
import { useMutation } from 'react-query'
import { UserPreview } from '../../pages/user/types/UserPreview'
import { API_HOST } from '../../util/environment'
import { PATHS } from '../../util/paths'
import { KonziError } from '../model/error.model'
import { UserModel } from '../model/user.model'

export const useFecthUserListMutation = (onError: (e: KonziError) => void) => {
  return useMutation<UserPreview[], KonziError, string>(
    'fetchUsersMuatation',
    async (search: string) => {
      const url = new URL(PATHS.USERS, API_HOST)
      url.searchParams.append('search', search)
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
