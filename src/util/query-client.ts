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

  axios.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error.response.data)
    }
  )
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})
