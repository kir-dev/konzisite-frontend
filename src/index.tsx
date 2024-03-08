import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Plausible from 'plausible-tracker'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { AuthProvider } from './api/contexts/auth/AuthContext'
import customTheme from './assets/theme'
import { FRONTEND_HOST } from './util/environment'
import { initAxios, queryClient } from './util/query-client'

initAxios()

const root = createRoot(document.getElementById('root')!)

const { enableAutoPageviews } = Plausible({
  domain: FRONTEND_HOST,
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
