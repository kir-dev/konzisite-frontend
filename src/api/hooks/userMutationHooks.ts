import axios from 'axios'
import { useMutation } from 'react-query'
import { UserPreview } from '../../pages/user/types/UserPreview'
import { KonziError } from '../model/error.model'

export const useFecthUserListMutation = (onError: (e: KonziError) => void) => {
  return useMutation<UserPreview[], KonziError, string>(
    'fetchUsersMuatation',
    async (search: string) => (await axios.get(`/users?search=${search}`)).data,
    { onError }
  )
}
