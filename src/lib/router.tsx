import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { getAgencyByAgencyId } from 'src/api/seller/get-agency'
import { getPostByIdApi } from 'src/api/blog/get-blog'
import { getBookById } from 'src/api/books/get-book'
import { getOrderDetail } from 'src/api/order/get-order'
import { getUserById } from 'src/api/user/get-user'
import { UpdateBook } from 'src/components/seller/table/book/manage/upate-book'
import PostTagPage from 'src/pages/blog/PostTagPage'
import AdvertisementAdminPage from 'src/pages/admin/AdvertisementPage/AdvertisementPage'

const MainLayout = React.lazy(() => import('../pages/layout/MainLayout'))
const LandingPage = React.lazy(() => import('src/pages/landing'))
const BookPage = React.lazy(() => import('src/pages/book/BookPage'))
const BookDetailPage = React.lazy(() => import('src/pages/book/BookDetailPage'))
const DailyDiscover = React.lazy(() => import('src/pages/e-commerce/DailyDiscover'))
const TopBookPage = React.lazy(() => import('src/pages/e-commerce/TopBook'))
const ViewCart = React.lazy(() => import('src/pages/e-commerce/view-cart'))
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
const PostManagerPage = React.lazy(() => import('src/pages/admin/PostManage.tsx/PostManage'))
const TradeManagerPage = React.lazy(() => import('src/pages/admin/Trade/TradeManagePage'))
const TransactionManagePage = React.lazy(() => import('src/pages/admin/Transaction/TransactionManagePage'))
const RefundManagePage = React.lazy(() => import('src/pages/admin/Refund/RefundManagePage'))

const SellerLayout = React.lazy(() => import('src/pages/layout/SellerLayout'))
const MyShop = React.lazy(() => import('src/pages/seller/MyShop'))
const SubscribeSellerPage = React.lazy(() => import('src/pages/seller/SubscribeAgencyPage'))
const DashboardSellerPage = React.lazy(() => import('src/pages/seller/DashboardSellerPage'))
const AccountSeller = React.lazy(() => import('src/pages/seller/AccountSeller'))
const ProfileSeller = React.lazy(() => import('src/pages/seller/ProfileSeller'))
const IdentificationProfile = React.lazy(() => import('src/pages/seller/IdentificationProfile'))
const BookManagerPage = React.lazy(() => import('src/pages/seller/manage/BookManagerPage'))
const AddBookPage = React.lazy(() => import('src/components/seller/table/book/manage/add-book'))
const BookGroupManagerPage = React.lazy(() => import('src/pages/seller/manage/BookGroupManagerPage'))
const BookGroupDetailManagerPage = React.lazy(() => import('src/pages/seller/manage/BookGroupDetailManagerPage'))
const OrderManagerPage = React.lazy(() => import('src/pages/seller/manage/OrderManage'))
const OrderDetailPage = React.lazy(() => import('src/components/seller/table/order/manage/view-order-detail'))
const ReplyReviewPage = React.lazy(() => import('src/pages/seller/manage/ReplyReviewPage'))
const AdvertisementPage = React.lazy(() => import('src/pages/seller/AdvertisementPage'))
const CheckoutAdsResultPage = React.lazy(() => import('src/pages/seller/CheckoutAdsResultPage'))

const UserLayout = React.lazy(() => import('src/pages/layout/UserLayout'))
const InfoAccount = React.lazy(() => import('src/pages/profile/ProfileUserPage'))
const IdentificationUser = React.lazy(() => import('src/pages/profile/IdentifyPage'))
const ChangePassword = React.lazy(() => import('src/pages/profile/ChangePasswordPage'))
const AddressUserPage = React.lazy(() => import('src/pages/profile/AddressUserPage'))
const MyPurchase = React.lazy(() => import('src/pages/profile/MyPurchasePage'))
const MyRequestRefundPage = React.lazy(() => import('src/pages/profile/MyRequestRefundPage'))
const MyTransactionPage = React.lazy(() => import('src/pages/profile/MyTransactionPage'))

const BlogLayout = React.lazy(() => import('src/pages/layout/BlogLayout'))
const LandingBlog = React.lazy(() => import('src/pages/landing/LandingBlog'))
const LandingBlogLatest = React.lazy(() => import('src/pages/landing/LandingBlogAllPosts'))
const ProfileUser = React.lazy(() => import('src/pages/profile/ProfileUserBlogPage'))
const RatingUserPage = React.lazy(() => import('src/pages/profile/RatingUserPage'))
const UpdateProfile = React.lazy(() => import('src/pages/blog/UpdateProfilePage'))
const DashboardBlog = React.lazy(() => import('src/pages/blog/DashboardPostPage'))
const FollowingTags = React.lazy(() => import('src/pages/blog/ManageFollowingTagsPage'))
const TagList = React.lazy(() => import('src/pages/blog/TagListPage'))
const ReadingList = React.lazy(() => import('src/pages/blog/ReadingListPage'))
const CreateBlog = React.lazy(() => import('src/pages/blog/CreatePostPage'))
const UpdateBlog = React.lazy(() => import('src/pages/blog/UpdatePostPage'))
const BlogDetail = React.lazy(() => import('src/pages/blog/PostDetailPage'))
const PostInterestedManage = React.lazy(() => import('src/pages/blog/ManagePostInterestedPage'))
const ManagePostInterester = React.lazy(() => import('src/pages/blog/ManagePostInteresterPage'))
const SubmitTrade = React.lazy(() => import('src/pages/blog/SubmitTradePage'))
const CheckListPage = React.lazy(() => import('src/pages/blog/CheckListPage'))
const CheckListViewPage = React.lazy(() => import('src/pages/blog/ViewCheckListPage'))

const ErrorPage = React.lazy(() => import('src/pages/error-page'))

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
        loader: async ({ params }) => {
          const shop = await getAgencyByAgencyId(params.id as string)
          return {
            shop,
          }
        },
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
            path: 'user/purchase',
            element: <MyPurchase />,
          },
          {
            path: 'user/transaction',
            element: <MyTransactionPage />,
          },
          {
            path: 'user/refund',
            element: <MyRequestRefundPage />,
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
            element: <AddressUserPage />,
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
      {
        path: 'admin/manage/user',
        element: <UserManagerPage />,
      },
      {
        path: 'admin/manage/post',
        element: <PostManagerPage />,
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
      {
        path: 'admin/manage/advertisement',
        element: <AdvertisementAdminPage />,
      },
      {
        path: '/admin/manage/trade',
        element: <TradeManagerPage />,
      },
      {
        path: '/admin/manage/transition',
        element: <TransactionManagePage />,
      },
      {
        path: '/admin/manage/refund',
        element: <RefundManagePage />,
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
      {
        path: '/seller/manage/order',
        element: <OrderManagerPage />,
      },
      {
        path: '/seller/manage/order/view/:id',
        loader: async ({ params }) => {
          const order = await getOrderDetail(params.id as string)
          return { order }
        },
        element: <OrderDetailPage />,
      },
      {
        path: '/seller/marketing',
        element: <AdvertisementPage />,
      },
      {
        path: '/seller/ad/checkout-result',
        element: <CheckoutAdsResultPage />,
      },
      {
        path: '/seller/rating',
        element: <ReplyReviewPage />,
      },
    ],
  },
  {
    path: '/seller/subscribe',
    element: <SubscribeSellerPage />,
  },
  {
    element: <BlogLayout />,
    children: [
      {
        path: '/blog',
        element: <LandingBlog />,
      },
      {
        path: '/blog/latest',
        element: <LandingBlogLatest />,
      },
      {
        path: '/blog/c/:tag',
        element: <PostTagPage />,
      },
      {
        path: '/blog/profile/:username',
        element: <ProfileUser />,
      },
      {
        path: '/blog/user/rating/:id',
        element: <RatingUserPage />,
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
      {
        path: '/blog/dashboard/manage-interester/:id',
        element: <ManagePostInterester />,
      },
      {
        path: '/blog/dashboard/submit-form/:id',
        element: <SubmitTrade />,
      },
      {
        path: '/blog/dashboard/check-list/:id',
        element: <CheckListPage />,
      },
      {
        path: '/blog/dashboard/check-list/view/:id',
        element: <CheckListViewPage />,
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
    loader: async ({ params }) => {
      const post = await getPostByIdApi(params.id as string)
      return {
        post,
      }
    },
    element: <UpdateBlog />,
  },
  {
    path: '/blog/error-page',
    element: <ErrorPage />,
  },
])
