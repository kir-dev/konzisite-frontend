import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './api/contexts/auth/AuthContext'
import { App } from './App'
import customTheme from './assets/theme'
import { initAxios, queryClient } from './util/query-client'

initAxios()

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <App />
            <ReactQueryDevtools />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
)
