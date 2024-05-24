import React from 'react'
import { columns } from 'src/components/admin/user/column'
import { useUserTable } from 'src/components/admin/user/useUserTable'
import UserTable from 'src/components/admin/user/user-table'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'

function UserManagerPage() {
  const { data } = useUserTable(columns)

  const title = `Manage User (${data?.data.length ? data?.data.length : 0})`
  const description = 'Manage users (Server side table functionalities.)'

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
      },
    ]
  }, [])
  return (
    <div className="mx-8 w-full">
      <MetaData title={'Manage User'} />
      {<Breadcrumb items={breadcrumb} className="max-w-7xl py-4" />}
      <div className="flex items-start justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator className="mt-4" />
      <UserTable />
    </div>
  )
}

export default UserManagerPage
