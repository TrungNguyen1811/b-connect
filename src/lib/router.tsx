import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { getBookById } from 'src/api/books/get-book'
const MainLayout = React.lazy(() => import('../pages/layout/MainLayout'))
const LandingPage = React.lazy(() => import('src/pages/landing'))
const BookPage = React.lazy(() => import('src/pages/book/BookPage'))
const BookDetailPage = React.lazy(() => import('src/pages/book/BookDetailPage'))
const ViewCart = React.lazy(() => import('src/pages/cart/view-cart'))

const AuthLayout = React.lazy(() => import('src/pages/layout/AuthLayout'))
const LoginPage = React.lazy(() => import('src/pages/(auth)/login/SignInPage'))
const SignUpPage = React.lazy(() => import('src/pages/(auth)/register/SignUpPage'))

const AdminLayout = React.lazy(() => import('src/pages/layout/AdminLayout'))
const DashboardPage = React.lazy(() => import('src/pages/admin/DashBoardPage'))

const UserLayout = React.lazy(() => import('src/pages/layout/UserLayout'))
const InfoAccount = React.lazy(() => import('src/pages/profile/profileUser'))
const ChangePassword = React.lazy(() => import('src/pages/profile/changePassword'))

export const ROUTES = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: 'books',
        element: <BookPage />,
      },
      {
        path: 'books/:id',
        loader: async ({ params }) => {
          const book = await getBookById(params.id as string)
          return {
            book,
          }
        },
        element: <BookDetailPage />,
      },
      {
        path: 'view-cart',
        element: <ViewCart />,
      },
      {
        element: <UserLayout />,
        children: [
          {
            path: 'user/account/profile',
            element: <InfoAccount />,
          },
          {
            path: 'user/account/password',
            element: <ChangePassword />,
          },
        ],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <SignUpPage />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: '/admin/dashboard',
        element: <DashboardPage />,
      },
    ],
  },
])
