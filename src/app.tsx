import React, { Suspense, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { ROUTES } from './lib/router'
import PageLoader from './components/page-loader'
import { OrderCartProvider } from './hooks/useOrderCart'
import { AuthProvider } from './components/auth/test-auth'
import { Toaster } from './components/ui/toaster'
import { StatisticProvider } from './hooks/useStatistic'

export default function App() {
  const queryClient = useMemo(() => new QueryClient({}), [])
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StatisticProvider>
          <OrderCartProvider>
            <Suspense fallback={<PageLoader />}>
              <RouterProvider router={ROUTES} />
            </Suspense>
          </OrderCartProvider>
        </StatisticProvider>
      </AuthProvider>
      <Toaster />

      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  )
}
