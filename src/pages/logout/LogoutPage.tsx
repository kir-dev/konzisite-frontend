import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { PATHS } from '../../util/paths'

export const LogoutPage = () => {
  const { onLogout } = useAuthContext()
  useEffect(onLogout, [])
  return <Navigate replace to={PATHS.INDEX} />
}
