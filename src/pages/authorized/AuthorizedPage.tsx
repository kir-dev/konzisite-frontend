import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'

export const AuthorizedPage = () => {
  const { isLoggedIn, onLoginSuccess } = useAuthContext()
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const jwt = searchParams.get('jwt')

  useEffect(() => {
    if (jwt && !isLoggedIn) {
      onLoginSuccess(jwt)
    }
  }, [])

  if (isLoggedIn) {
    return <Navigate replace to="/" />
  }

  if (!jwt) {
    return (
      <Navigate
        replace
        to="/error"
        state={{
          title: 'Error occured during authorization',
          messages: ['The authorized url does not have a jwt query param. Try again later.'],
          backPath: '/login'
        }}
      />
    )
  }
  return <Navigate replace to="/" />
}
