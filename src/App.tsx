import '@fontsource/aclonica/400.css'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Routes } from 'react-router-dom'
import { KLayout } from './components/commons/KLayout'
import './global.css'
import './i18n_config'
import { AuthorizedPage } from './pages/authorized/AuthorizedPage'
import { ConsultationDetailsPage } from './pages/consultations/ConsultationDetailsPage'
import { ConsultationsPage } from './pages/consultations/ConsultationsPage'
import { EditConsultationPage } from './pages/consultations/EditConsultationPage'
import { ErrorPage } from './pages/error/ErrorPage'
import { GroupDetailsPage } from './pages/groups/GroupDetailsPage'
import { GroupsPage } from './pages/groups/GroupsPage'
import { ImpressumPage } from './pages/impressum/ImpressumPage'
import { IndexPage } from './pages/index/IndexPage'
import { LoginPage } from './pages/login/LoginPage'
import { LogoutPage } from './pages/logout/LogoutPage'
import { EditRequestPage } from './pages/requests/EditRequestPage'
import { RequestDetailsPage } from './pages/requests/RequestDetailsPage'
import { RequestListPage } from './pages/requests/RequestListPage'
import { SubjectsPage } from './pages/subjects/SubjectsPage'
import { ProfilePage } from './pages/user/ProfilePage'
import { UserBrowserPage } from './pages/user/UserBrowserPage'
import { UserPage } from './pages/user/UserPage'
import { PATHS } from './util/paths'

export const App = () => {
  const { i18n, t } = useTranslation()
  useEffect(() => {
    const localLang = localStorage.getItem('language')
    if (localLang) {
      i18n.changeLanguage(localLang)
    }
  }, [])

  return (
    <KLayout>
      <Routes>
        <Route path={PATHS.INDEX}>
          <Route index element={<IndexPage />} />
          <Route path={PATHS.PROFILE} element={<ProfilePage />} />
          <Route path={PATHS.USERS}>
            <Route path=":userId">
              <Route index element={<UserPage />} />
            </Route>
            <Route index element={<UserBrowserPage />} />
          </Route>
          <Route path={PATHS.CONSULTATIONS}>
            <Route path=":consultationId">
              <Route index element={<ConsultationDetailsPage />} />
              <Route path="edit" element={<EditConsultationPage />} />
            </Route>
            <Route path="new" element={<EditConsultationPage newConsultation={true} />} />
            <Route index element={<ConsultationsPage />} />
          </Route>
          <Route path={PATHS.GROUPS}>
            <Route path=":groupId">
              <Route index element={<GroupDetailsPage />} />
            </Route>
            <Route index element={<GroupsPage />} />
          </Route>
          <Route path={PATHS.SUBJECTS}>
            <Route index element={<SubjectsPage />} />
          </Route>
          <Route path={PATHS.IMPRESSUM} element={<ImpressumPage />} />
          <Route path={PATHS.REQUESTS}>
            <Route path=":requestId">
              <Route index element={<RequestDetailsPage />} />
              <Route path="edit" element={<EditRequestPage />} />
            </Route>
            <Route path="new" element={<EditRequestPage newRequest={true} />} />
            <Route index element={<RequestListPage />} />
          </Route>
          <Route path={PATHS.LOGIN} element={<LoginPage />} />
          <Route path="authorized" element={<AuthorizedPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path={PATHS.ERROR} element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage title={t('errors.pageNotFound')} messages={[t('errors.notFoundMsg')]} />} />
        </Route>
      </Routes>
    </KLayout>
  )
}
