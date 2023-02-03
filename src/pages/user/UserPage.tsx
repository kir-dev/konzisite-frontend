import { Helmet } from 'react-helmet-async'
import { Navigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { useFecthUserDetailsQuery } from '../../api/hooks/userQueryHooks'
import { ProfileDetails } from './components/ProfileDetails'
import { ProfileDetailsLoading } from './components/ProfileDetailsLoading'

export const UserPage = () => {
  const { userId } = useParams()
  const { loggedInUser } = useAuthContext()
  const { isLoading, data: user, error } = useFecthUserDetailsQuery(parseInt(userId!!))

  if (!userId || isNaN(parseInt(userId))) {
    return (
      <Navigate
        replace
        to="/error"
        state={{ title: 'Érvénytelen paraméter', messages: ['Nem található felhasználó ilyen azonosítóval!'] }}
      />
    )
  }

  if (parseInt(userId) === loggedInUser?.id) {
    return <Navigate replace to="/profile" />
  }

  if (error) {
    return (
      <Navigate replace to="/error" state={{ title: 'Error occured loading user', messages: [(error as any)?.response.data.message] }} />
    )
  }

  return (
    <>
      <Helmet title={user?.fullName} />
      {isLoading ? <ProfileDetailsLoading /> : <ProfileDetails user={user!!} />}
    </>
  )
}
