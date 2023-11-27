import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { useFecthUserDetailsQuery } from '../../api/hooks/userQueryHooks'
import { PATHS } from '../../util/paths'
import { ErrorPage } from '../error/ErrorPage'
import { ProfileDetails } from './components/ProfileDetails'
import { ProfileDetailsLoading } from './components/ProfileDetailsLoading'

export const ProfilePage = () => {
  const { isLoggedIn, loggedInUser, loggedInUserError, loggedInUserLoading, onLogout } = useAuthContext()
  const { isLoading, data: user, error } = useFecthUserDetailsQuery(loggedInUser?.id || -1)
  const { t } = useTranslation()

  if (!isLoggedIn) {
    return <Navigate replace to={PATHS.ERROR} state={{ title: t('profilePage.unauth'), messages: [], status: 401 }} />
  }

  if (loggedInUserError) {
    const err = loggedInUserError as any
    return (
      <Navigate
        replace
        to={PATHS.ERROR}
        state={{
          title: t('profilePage.unauth'),
          messages: [err?.response.data.message || err.message]
        }}
      />
    )
  }

  if (error) {
    return <ErrorPage status={error.statusCode} title={error.message} />
  }

  return (
    <>
      <Helmet title={t('profilePage.profile')} />
      {loggedInUserLoading || isLoading ? <ProfileDetailsLoading /> : <ProfileDetails user={user!!} onLogoutPressed={onLogout} />}
    </>
  )
}
