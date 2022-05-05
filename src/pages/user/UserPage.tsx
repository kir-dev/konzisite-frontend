import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { userModule } from '../../api/modules/user.module'
import { ProfileDetails } from './components/ProfileDetails'
import { ProfileDetailsLoading } from './components/ProfileDetailsLoading'

export const UserPage = () => {
  const { userId } = useParams()
  const { loggedInUser } = useAuthContext()
  const { isLoading, data: user, error } = useQuery(['user', userId], () => userModule.fetchUser(parseInt(userId!!)))

  if (!userId || isNaN(parseInt(userId))) {
    return (
      <Navigate
        replace
        to="/error"
        state={{ title: 'Error occured in route params', messages: ['The id parameter entered is invalid!'] }}
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

  return <>{isLoading ? <ProfileDetailsLoading /> : <ProfileDetails user={user!!} />}</>
}
