import axios from 'axios'
import { useQuery } from 'react-query'
import { UserDetails } from '../../pages/user/types/UserDetails'
import { UserPreview } from '../../pages/user/types/UserPreview'
import { isValidId } from '../../util/core-util-functions'
import { KonziError } from '../model/error.model'

export const useFecthUserListQuery = () => {
  return useQuery<UserPreview[], KonziError>('fetchUsers', async () => (await axios.get('/users')).data, { retry: false })
}

export const useFecthUserDetailsQuery = (userId: number) => {
  return useQuery<UserDetails, KonziError>(['fetchUserDetails', userId], async () => (await axios.get(`users/${userId}`)).data, {
    retry: false,
    enabled: isValidId(userId)
  })
}
