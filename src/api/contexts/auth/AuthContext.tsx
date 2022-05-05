import { useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { createContext, FC, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { queryClient } from '../../../util/query-client'
import { UserModel } from '../../model/user.model'
import { userModule } from '../../modules/user.module'
import { CookieKeys } from '../CookieKeys'

export type AuthContextType = {
  isLoggedIn: boolean
  loggedInUser: UserModel | undefined
  loggedInUserLoading: boolean
  loggedInUserError: unknown
  onLoginSuccess: (response: any) => void // todo: fix any to concrete type
  onLoginFailure: (response: any) => void // todo: fix any to concrete type
  onLogout: () => void
  refetchUser: () => Promise<void>
  loginLoading: boolean
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loggedInUser: undefined,
  loggedInUserLoading: false,
  loggedInUserError: undefined,
  onLoginSuccess: () => {},
  onLoginFailure: () => {},
  onLogout: () => {},
  refetchUser: async () => {},
  loginLoading: false
})

export const AuthProvider: FC = ({ children }) => {
  const toast = useToast()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(typeof Cookies.get(CookieKeys.KONZI_JWT_TOKEN) !== 'undefined')

  const queryOptions = { enabled: isLoggedIn }
  const { isLoading, data: user, error } = useQuery('currentUser', userModule.fetchCurrentUser, queryOptions)
  const mutation = useMutation(userModule.loginUser, {
    onSuccess: ({ data }) => {
      const { jwt } = data
      Cookies.set(CookieKeys.KONZI_JWT_TOKEN, jwt, { expires: 2 })
      setIsLoggedIn(true)
      queryClient.invalidateQueries('currentUser')
      navigate('/profile')
    },
    onError: (error) => {
      const err = error as any
      console.log('[DEBUG] Error at loginUser', err.toJSON())
      toast({
        title: 'Error occured when logging in new user',
        description: `${err.response.status} ${err.response.data.message} Try again later.`,
        status: 'error',
        isClosable: true
      })
    }
  })

  const onLoginSuccess = (data: any) => {
    const { accessToken } = data
    mutation.mutate(accessToken)
  }

  const onLoginFailure = (data: any) => {
    console.log('[DEBUG] Error at onLoginFailure', JSON.stringify(data, null, 2))
    toast({
      title: 'Authentication error',
      description: 'There was an error while authenticating you at Google!',
      status: 'error',
      duration: 5000,
      isClosable: true
    })
  }

  const onLogout = () => {
    Cookies.remove(CookieKeys.KONZI_JWT_TOKEN)
    setIsLoggedIn(false)
    queryClient.invalidateQueries('currentUser')
    navigate('/')
  }

  const refetchUser = async () => {
    return queryClient.invalidateQueries('currentUser')
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loggedInUserLoading: isLoading,
        loggedInUser: user,
        loggedInUserError: error,
        onLoginSuccess,
        onLoginFailure,
        onLogout,
        refetchUser,
        loginLoading: mutation.isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
