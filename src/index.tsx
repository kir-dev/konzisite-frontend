import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './api/contexts/auth/AuthContext'
import { CookieConsentProvider } from './api/contexts/cookie-consent/CookieConsentContext'
import { App } from './App'
import customTheme from './assets/theme'
import { initAxios, queryClient } from './util/query-client'

initAxios()

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={customTheme}>
      <CookieConsentProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <App />
              <ReactQueryDevtools />
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </CookieConsentProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
