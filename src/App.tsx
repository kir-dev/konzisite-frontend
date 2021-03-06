import '@fontsource/aclonica/400.css'
import { Route, Routes } from 'react-router-dom'
import { RLayout } from './components/commons/KLayout'
import './global.css'
import { AuthorizedPage } from './pages/authorized/AuthorizedPage'
import { ConsultationDetailsPage } from './pages/consultations/ConsultationDetailsPage'
import { ConsultationsPage } from './pages/consultations/ConsultationsPage'
import { ErrorPage } from './pages/error/ErrorPage'
import { EditGroupPage } from './pages/groups/EditGroupPage'
import { GroupDetailsPage } from './pages/groups/GroupDetailsPage'
import { GroupsPage } from './pages/groups/GroupsPage'
import { IndexPage } from './pages/index/IndexPage'
import { LoginPage } from './pages/login/LoginPage'
import { LogoutPage } from './pages/logout/LogoutPage'
import { ProfilePage } from './pages/user/ProfilePage'
import { UserPage } from './pages/user/UserPage'

export const App = () => {
  return (
    <RLayout>
      <Routes>
        <Route path="/">
          <Route index element={<IndexPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="users">
            <Route path=":userId">
              <Route index element={<UserPage />} />
            </Route>
          </Route>
          <Route path="consultations">
            <Route path=":id" element={<ConsultationDetailsPage />} />
            <Route index element={<ConsultationsPage />} />
          </Route>
          <Route path="groups">
            <Route path=":groupId">
              <Route path="edit" element={<EditGroupPage />} />
              <Route index element={<GroupDetailsPage />} />
            </Route>
            <Route path="new" element={<EditGroupPage newGroup={true} />} />
            <Route index element={<GroupsPage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="authorized" element={<AuthorizedPage />} />
          <Route path="logout" element={<LogoutPage />} />
          <Route path="error" element={<ErrorPage />} />
          <Route
            path="*"
            element={
              <ErrorPage title="Page not found" messages={['Oops, it looks like you want to visit a page that is not found anymore!']} />
            }
          />
        </Route>
      </Routes>
    </RLayout>
  )
}
