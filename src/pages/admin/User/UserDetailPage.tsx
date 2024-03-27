import { Avatar } from '@radix-ui/react-avatar'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserById } from 'src/api/user/get-user'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import { AvatarImage } from 'src/components/ui/avatar'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'
import { User } from 'src/types'

function UserDetailPage() {
  const title = 'User Detail'
  const description = 'Information User'
  const [user, setUser] = useState<User>()

  const { param } = useParams()

  useEffect(() => {
    const agency = async () => {
      const getAgency: User = await getUserById(param as string)
      setUser(getAgency)
    }
    agency()
  }, [param])

  const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
    return [
      {
        label: 'DashBoard',
        key: 'dashboard',
        href: '/admin',
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
      <div>
        <Avatar>
          <AvatarImage src={user?.avatar} />
        </Avatar>
        <div>
          <p>UserId: {user?.userId}</p>
          <p>Username</p>
          <p>Full Name</p>
          <p>Email</p>
          <p>Phone</p>
          <p>Role</p>
          <p>Address</p>
        </div>
        <div>
          <p>Validated: </p>
          <p>Seller: </p>
          <p>Ban:</p>
          <p>Create at:</p>
        </div>
        <div>
          <p>AgencyId</p>
          <p>Agency Name</p>
          <p>Address</p>
          <p>Business Type</p>
        </div>
      </div>
    </div>
  )
}

export default UserDetailPage
