import React, { Suspense, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { ROUTES } from './lib/router'
import PageLoader from './components/page-loader'
import { OrderCartProvider } from './hooks/useOrderCart'
import { AuthProvider } from './components/auth/test-auth'
import { CheckoutProvider } from './hooks/useCheckout'

export default function App() {
  const queryClient = useMemo(() => new QueryClient({}), [])
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OrderCartProvider>
          <CheckoutProvider>
            <Suspense fallback={<PageLoader />}>
              <RouterProvider router={ROUTES} />
            </Suspense>
          </CheckoutProvider>
        </OrderCartProvider>
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
