import React, { Suspense, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { ROUTES } from './lib/router'
import { AuthProvider } from './components/auth/auth-provider'
import PageLoader from './components/page-loader'

export default function App() {
  const queryClient = useMemo(() => new QueryClient({}), [])
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <RouterProvider router={ROUTES} />
        </Suspense>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
