import axios from 'axios'
import { useMutation } from 'react-query'
import { UserPreview } from '../../pages/user/types/UserPreview'
import { KonziError } from '../model/error.model'
import { UserModel } from '../model/user.model'

export const useFecthUserListMutation = (onError: (e: KonziError) => void) => {
  return useMutation<UserPreview[], KonziError, string>(
    'fetchUsersMuatation',
    async (search: string) => (await axios.get(`/users?search=${search}`)).data,
    { onError }
  )
}

export const usePromoteUserMutation = (onSuccess: (data: UserModel) => void, onError: (e: KonziError) => void) => {
  return useMutation<UserModel, KonziError, number>(async (userId) => (await axios.post(`/users/${userId}/promote`)).data, {
    onSuccess,
    onError
  })
}
