import axios, { AxiosHeaders } from 'axios'
import Cookies from 'js-cookie'
import { QueryClient } from 'react-query'
import { CookieKeys } from '../api/contexts/CookieKeys'
import { API_HOST } from './environment'

export const initAxios = () => {
  axios.defaults.baseURL = API_HOST
  axios.interceptors.request.use((config) => {
    const token = Cookies.get(CookieKeys.KONZI_JWT_TOKEN)
    if (token && config.headers) {
      ;(config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`)
    }

    return config
  })
}
//TODO
/*export const setupResponseInterceptor = (navigate: NavigateFunction) => {
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response.status === 401) {
        navigate('/login')
      } else {
        return Promise.reject(error)
      }
    }
  )
}*/

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
