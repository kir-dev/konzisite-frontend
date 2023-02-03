import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { PATHS } from '../../util/paths'

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
    return <Navigate replace to={PATHS.INDEX} />
  }

  if (!jwt) {
    return (
      <Navigate
        replace
        to={PATHS.ERROR}
        state={{
          title: 'Error occured during authorization',
          messages: ['The authorized url does not have a jwt query param. Try again later.'],
          backPath: PATHS.LOGIN
        }}
      />
    )
  }
  return <Navigate replace to={PATHS.INDEX} />
}
