import Cookies from 'js-cookie'
import { createContext, FC, useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { API_HOST } from '../../../util/environment'
import { queryClient } from '../../../util/query-client'
import { HasChildren } from '../../../util/react-types.util'
import { UserModel } from '../../model/user.model'
import { userModule } from '../../modules/user.module'
import { CookieKeys } from '../CookieKeys'

export type AuthContextType = {
  isLoggedIn: boolean
  loggedInUser: UserModel | undefined
  loggedInUserLoading: boolean
  loggedInUserError: unknown
  onLoginSuccess: (jwt: string) => void
  onLoginStarted: () => void
  onLogout: (path?: string) => void
  refetchUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  loggedInUser: undefined,
  loggedInUserLoading: false,
  loggedInUserError: undefined,
  onLoginSuccess: () => {},
  onLoginStarted: () => {},
  onLogout: () => {},
  refetchUser: async () => {}
})

export const AuthProvider: FC<HasChildren> = ({ children }) => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(typeof Cookies.get(CookieKeys.KONZI_JWT_TOKEN) !== 'undefined')
  const {
    isLoading,
    data: user,
    error
  } = useQuery('currentUser', userModule.fetchCurrentUser, {
    enabled: isLoggedIn,
    onSuccess: (data) => {
      if (data.jwt) {
        Cookies.set(CookieKeys.KONZI_JWT_TOKEN, data.jwt, { expires: 2 })
      }
    }
  })

  const onLoginSuccess = (jwt: string) => {
    Cookies.set(CookieKeys.KONZI_JWT_TOKEN, jwt, { expires: 2 })
    setIsLoggedIn(true)
    queryClient.invalidateQueries('currentUser')
  }

  const onLoginStarted = () => {
    window.location.href = `${API_HOST}/auth/login`
  }

  const onLogout = (path: string = '/') => {
    Cookies.remove(CookieKeys.KONZI_JWT_TOKEN)
    setIsLoggedIn(false)
    queryClient.invalidateQueries('currentUser')
    navigate(path)
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
        onLoginStarted,
        onLogout,
        refetchUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
