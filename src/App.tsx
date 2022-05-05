import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/900.css'
import { Route, Routes } from 'react-router-dom'
import { RLayout } from './components/commons/KLayout'
import './global.css'
import { ErrorPage } from './pages/error/ErrorPage'
import { IndexPage } from './pages/index/IndexPage'
import { LoginPage } from './pages/login/LoginPage'
import { LogoutPage } from './pages/logout/LogoutPage'

export const App = () => {
  return (
    <RLayout>
      <Routes>
        <Route path="/">
          <Route index element={<IndexPage />} />
          <Route path="login" element={<LoginPage />} />
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
