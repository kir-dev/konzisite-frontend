import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { useFecthUserDetailsQuery } from '../../api/hooks/userQueryHooks'
import { isValidId } from '../../util/core-util-functions'
import { PATHS } from '../../util/paths'
import { ProfileDetails } from './components/ProfileDetails'
import { ProfileDetailsLoading } from './components/ProfileDetailsLoading'

export const UserPage = () => {
  const { userId } = useParams()
  const { t } = useTranslation()
  const { loggedInUser } = useAuthContext()
  const { isLoading, data: user, error } = useFecthUserDetailsQuery(parseInt(userId!!))

  if (!userId || !isValidId(userId)) {
    return <Navigate replace to={PATHS.ERROR} state={{ title: t('errors.invalid'), messages: [t('errors.noUser')] }} />
  }

  if (parseInt(userId) === loggedInUser?.id) {
    return <Navigate replace to={PATHS.PROFILE} />
  }

  if (error) {
    return <Navigate replace to={PATHS.ERROR} state={{ title: error.message, status: error.statusCode }} />
  }

  return (
    <>
      <Helmet title={user?.fullName} />
      {isLoading ? <ProfileDetailsLoading /> : <ProfileDetails user={user!!} />}
    </>
  )
}
