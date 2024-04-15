import { Avatar } from '@radix-ui/react-avatar'
import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import { AvatarImage } from 'src/components/ui/avatar'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'
import { ROLE, User } from 'src/types'

function UserDetailPage() {
  const title = 'User Detail'
  const description = 'Information User'
  const { user } = useLoaderData() as { user: User }

  const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
    return [
      {
        label: 'DashBoard',
        key: 'dashboard',
        href: '/admin/dashboard',
        icon: 'dashboard',
      },
      {
        key: 'manage_user',
        label: 'Manage User',
        icon: 'user',
        href: `/admin/manage/user`,
      },
      {
        key: 'user_detail',
        label: 'User Detail',
      },
    ]
  }, [])
  return (
    <div className="mx-8 w-full">
      <MetaData title={'User Detail'} />
      {<Breadcrumb items={breadcrumb} className="max-w-7xl py-4" />}
      <Heading title={title} description={description} />
      <Separator className="mt-4" />
      <div className="mt-8 flex flex-row items-center justify-start gap-16">
        <div className="">
          <Avatar>
            <AvatarImage src={user?.avatarDir as string} />
          </Avatar>
          <div>
            <p>UserId: {user?.userId}</p>
            <p>Username: {user.username}</p>
            {/* <p>Full Name</p> */}
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Role: {user.roles}</p>
            <p>Address:{user.addressId}</p>
          </div>
          <div>
            <p>Validated: {user.isValidated ? 'true' : 'false'}</p>
            <p>Ban: {user.isBanned ? 'true' : 'false'}</p>
            {/* <p>Create at: {format(user.createdAt as string, 'PPP')}</p> */}
          </div>
        </div>

        {user.roles?.includes(ROLE.SELLER) && user.agencies && (
          <div>
            <p>SellerId: {user.agencies[0].agencyId}</p>
            <p>Seller Name: {user?.agencies[0].agencyName}</p>
            <p>Address: {user?.agencies[0].postAddressId}</p>
            <p>Business Type: {user?.agencies[0].businessType}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDetailPage
