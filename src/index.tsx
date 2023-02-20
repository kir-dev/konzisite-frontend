import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import Plausible from 'plausible-tracker'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './api/contexts/auth/AuthContext'
import { App } from './App'
import customTheme from './assets/theme'
import { API_HOST } from './util/environment'
import { initAxios, queryClient } from './util/query-client'

initAxios()

const root = createRoot(document.getElementById('root')!)

const { enableAutoPageviews } = Plausible({
  domain: API_HOST,
  apiHost: 'https://visit.kir-dev.hu'
})
enableAutoPageviews()

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <BrowserRouter>
            <AuthProvider>
              <App />
              <ReactQueryDevtools />
            </AuthProvider>
          </BrowserRouter>
        </HelmetProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
)
