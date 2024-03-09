import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { UserDetails } from '../../pages/user/types/UserDetails'
import { UserList } from '../../pages/user/types/UserPreview'
import { isValidId } from '../../util/core-util-functions'
import { KonziError } from '../model/error.model'

export const useFecthUserListQuery = () => {
  return useQuery<UserList, KonziError>({ queryKey: ['fetchUsers'], queryFn: async () => (await axios.get('/users')).data, retry: false })
}

export const useFecthUserDetailsQuery = (userId: number) => {
  return useQuery<UserDetails, KonziError>({
    queryKey: ['fetchUserDetails', userId],
    queryFn: async () => (await axios.get(`users/${userId}`)).data,
    retry: false,
    enabled: isValidId(userId)
  })
}
