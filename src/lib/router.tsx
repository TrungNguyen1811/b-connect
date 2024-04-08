import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { getPostByIdApi } from 'src/api/blog/get-blog'
import { getBookById } from 'src/api/books/get-book'
import { getUserById } from 'src/api/user/get-user'
import { UpdateBook } from 'src/components/seller/table/book/manage/upate-book'

const MainLayout = React.lazy(() => import('../pages/layout/MainLayout'))
const LandingPage = React.lazy(() => import('src/pages/landing'))
const BookPage = React.lazy(() => import('src/pages/book/BookPage'))
const BookDetailPage = React.lazy(() => import('src/pages/book/BookDetailPage'))
const DailyDiscover = React.lazy(() => import('src/pages/e-commerce/DailyDiscover'))
const TopBookPage = React.lazy(() => import('src/pages/e-commerce/TopBook'))
const ViewCart = React.lazy(() => import('src/pages/cart/view-cart'))
const CheckoutPage = React.lazy(() => import('src/components/cart/checkout'))
const CheckoutResult = React.lazy(() => import('src/components/cart/checkout-result'))
const CheckoutSuccess = React.lazy(() => import('src/components/cart/success'))
const CheckoutFailed = React.lazy(() => import('src/components/cart/failed'))
const AuthLayout = React.lazy(() => import('src/pages/layout/AuthLayout'))
const LoginPage = React.lazy(() => import('src/pages/(auth)/login/SignInPage'))
const SignUpPage = React.lazy(() => import('src/pages/(auth)/register/SignUpPage'))

const AdminLayout = React.lazy(() => import('src/pages/layout/AdminLayout'))
const DashboardPage = React.lazy(() => import('src/pages/admin/DashBoardPage'))
const UserManagerPage = React.lazy(() => import('src/pages/admin/User/UserManage'))
const UserDetailPage = React.lazy(() => import('src/pages/admin/User/UserDetailPage'))
const CategoryManagerPage = React.lazy(() => import('src/pages/admin/Category/CategoryManage'))

const ManagerLayout = React.lazy(() => import('src/pages/layout/ManagerLayout'))

const SellerLayout = React.lazy(() => import('src/pages/layout/SellerLayout'))
const MyShop = React.lazy(() => import('src/pages/seller/MyShop'))
const SubscribeSellerPage = React.lazy(() => import('src/pages/seller/SubscribeAgencyPage'))
const DashboardSellerPage = React.lazy(() => import('src/pages/seller/DashboardSellerPage'))
const AccountSeller = React.lazy(() => import('src/pages/seller/AccountSeller'))
const ProfileSeller = React.lazy(() => import('src/pages/seller/ProfileSeller'))
const IdentificationProfile = React.lazy(() => import('src/pages/seller/IdentificationProfile'))
const BookManagerPage = React.lazy(() => import('src/pages/seller/book/BookManagerPage'))
const AddBookPage = React.lazy(() => import('src/components/seller/table/book/manage/add-book'))
const BookGroupManagerPage = React.lazy(() => import('src/pages/seller/book/BookGroupManagerPage'))
const BookGroupDetailManagerPage = React.lazy(() => import('src/pages/seller/book/BookGroupDetailManagerPage'))

const UserLayout = React.lazy(() => import('src/pages/layout/UserLayout'))
const InfoAccount = React.lazy(() => import('src/pages/profile/profileUser'))
const IdentificationUser = React.lazy(() => import('src/pages/profile/identify'))
const ChangePassword = React.lazy(() => import('src/pages/profile/changePassword'))
const AddressPage = React.lazy(() => import('src/pages/profile/addressPage'))

const LandingBlog = React.lazy(() => import('src/pages/landing/LandingBlog'))
const BlogLayout = React.lazy(() => import('src/pages/layout/BlogLayout'))
const ProfileUser = React.lazy(() => import('src/pages/profile/profileUserBlog'))
const UpdateProfile = React.lazy(() => import('src/pages/blog/update-profile'))
const DashboardBlog = React.lazy(() => import('src/pages/blog/dashboard-post'))
const FollowingTags = React.lazy(() => import('src/pages/blog/following-tags'))
const TagList = React.lazy(() => import('src/pages/blog/tag-list'))
const ReadingList = React.lazy(() => import('src/pages/blog/reading-list'))
const CreateBlog = React.lazy(() => import('src/pages/blog/create-blog'))
import UpdateBlog from 'src/pages/blog/update-post'
const BlogDetail = React.lazy(() => import('src/pages/blog/post-detail'))
const PostInterestedManage = React.lazy(() => import('src/pages/blog/post-interested-manage'))
const ManagePostInterester = React.lazy(() => import('src/pages/blog/manage-post-interester'))
const SubmitTrade = React.lazy(() => import('src/pages/blog/submit-trade'))

export const ROUTES = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/top-book',
        element: <TopBookPage />,
      },
      {
        path: '/daily_discover',
        element: <DailyDiscover />,
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
      // {
      //   element: <AddToCart />,
      // },
      {
        path: 'view-cart',
        element: <ViewCart />,
      },
      {
        path: 'checkout/:state',
        element: <CheckoutPage />,
      },
      {
        path: 'checkout-result',
        element: <CheckoutResult />,
      },
      {
        path: 'checkout-success',
        element: <CheckoutSuccess />,
      },
      {
        path: 'checkout-failed',
        element: <CheckoutFailed />,
      },
      {
        path: 'shop/:id',
        // loader: async ({ params }) => {
        //   const shop = await getAgencyById(params.id as string)
        //   return {
        //     shop,
        //   }
        // },
        element: <MyShop />,
      },
      {
        element: <UserLayout />,
        children: [
          {
            path: 'user/account/profile',
            element: <InfoAccount />,
          },
          {
            path: 'user/account/identify',
            element: <IdentificationUser />,
          },
          {
            path: 'user/account/password',
            element: <ChangePassword />,
          },
          {
            path: 'user/account/address',
            element: <AddressPage />,
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
        path: '/admin',
        element: <DashboardPage />,
      },
      {
        path: 'admin/manage/user',
        element: <UserManagerPage />,
      },
      {
        path: 'admin/manage/user/:id',
        loader: async ({ params }) => {
          const user = await getUserById(params.id as string)
          return { user }
        },
        element: <UserDetailPage />,
      },
      {
        path: 'admin/manage/category',
        element: <CategoryManagerPage />,
      },
    ],
  },
  {
    path: '/seller',
    element: <SellerLayout />,
    children: [
      {
        path: '/seller/dashboard',
        element: <DashboardSellerPage />,
      },
      {
        path: '/seller/account',
        element: <AccountSeller />,
      },
      {
        path: '/seller/profile',
        element: <ProfileSeller />,
      },
      {
        path: '/seller/profile/identity-information',
        element: <IdentificationProfile />,
      },
      {
        path: '/seller/manage/books',
        element: <BookManagerPage />,
      },
      {
        path: '/seller/manage/books/new',
        element: <AddBookPage />,
      },
      {
        path: '/seller/manage/books/:id',
        element: <UpdateBook />,
      },
      {
        path: '/seller/manage/book-groups',
        element: <BookGroupManagerPage />,
      },
      {
        path: '/seller/manage/group-of-book/:id',
        element: <BookGroupDetailManagerPage />,
      },
    ],
  },
  {
    path: '/seller/subscribe',
    element: <SubscribeSellerPage />,
  },
  {
    path: '/manager',
    element: <ManagerLayout />,
    children: [
      {
        path: '/manager/dashboard',
        element: <DashboardPage />,
      },
    ],
  },
  {
    element: <BlogLayout />,
    children: [
      {
        path: '/blog',
        element: <LandingBlog />,
      },
      {
        path: '/blog/profile/:username',
        element: <ProfileUser />,
      },
      {
        path: '/blog/setting/profile',
        element: <UpdateProfile />,
      },
      {
        path: '/blog/dashboard',
        element: <DashboardBlog />,
      },
      {
        path: '/blog/dashboard/following_tags',
        element: <FollowingTags />,
      },
      // {
      //   path: '/blog/dashboard/manage-interester',
      //   element: <ManagePostInterester />,
      // },
      {
        path: '/blog/dashboard/manage-interester/:id',
        element: <ManagePostInterester />,
      },
      {
        path: '/blog/dashboard/submit-form/:id',
        element: <SubmitTrade />,
      },
      {
        path: '/blog/dashboard/manage-interested',
        element: <PostInterestedManage />,
      },
      {
        path: '/blog/tags',
        element: <TagList />,
      },

      {
        path: '/blog/:id',
        loader: async ({ params }) => {
          const blog = await getPostByIdApi(params.id as string)
          return {
            blog,
          }
        },
        element: <BlogDetail />,
      },
      {
        path: '/blog/reading-list',
        element: <ReadingList />,
      },
    ],
  },
  {
    path: '/blog/create-post',
    element: <CreateBlog />,
  },
  {
    path: `/blog/:id/edit`,
    element: <UpdateBlog />,
  },
])
