import '@fontsource/aclonica/400.css'
import { Route, Routes } from 'react-router-dom'
import { RLayout } from './components/commons/KLayout'
import './global.css'
import { AuthorizedPage } from './pages/authorized/AuthorizedPage'
import { ConsultationDetailsPage } from './pages/consultations/ConsultationDetailsPage'
import { ConsultationsPage } from './pages/consultations/ConsultationsPage'
import { EditConsultationPage } from './pages/consultations/EditConsultationPage'
import { ErrorPage } from './pages/error/ErrorPage'
import { GroupDetailsPage } from './pages/groups/GroupDetailsPage'
import { GroupsPage } from './pages/groups/GroupsPage'
import { LoginPage } from './pages/login/LoginPage'
import { LogoutPage } from './pages/logout/LogoutPage'
import { SubjectsPage } from './pages/subjects/SubjectsPage'
import { ProfilePage } from './pages/user/ProfilePage'
import { UserBrowserPage } from './pages/user/UserBrowserPage'
import { UserPage } from './pages/user/UserPage'
import { PATHS } from './util/paths'

export const App = () => {
  return (
    <RLayout>
      <Routes>
        <Route path={PATHS.INDEX}>
          <Route index element={<ConsultationsPage />} />
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
          <Route path={PATHS.LOGIN} element={<LoginPage />} />
          <Route path="authorized" element={<AuthorizedPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path={PATHS.ERROR} element={<ErrorPage />} />
          <Route
            path="*"
            element={<ErrorPage title="Az oldal nem található" messages={['Hupsz, olyan oldalra kerültél, ami nem létezik!']} />}
          />
        </Route>
      </Routes>
    </RLayout>
  )
}
