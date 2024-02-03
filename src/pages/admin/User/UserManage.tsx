import React from 'react'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import { columns } from 'src/components/table/user/column'
import { useUserTable } from 'src/components/table/user/useUserTable'
import UserTable from 'src/components/table/user/user-table'
import { Separator } from 'src/components/ui/separator'

function UserManagerPage() {
  const { data } = useUserTable(columns)

  const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
    return [
      {
        label: 'DashBoard',
        key: 'dashboard',
        href: 'admin/dashboard',
        icon: 'dashboard',
      },
      {
        key: 'manage_user',
        label: 'Manage User',
        icon: 'user',
        href: `admin/manage/user`,
      },
    ]
  }, [])
  return (
    <div className="mx-8 w-full">
      <MetaData title={'Manage User'} />
      {<Breadcrumb items={breadcrumb} className="max-w-7xl py-4" />}
      <p className="text-4xl font-bold">
        User {'('}
        {data?.data.length} {')'}
      </p>
      <p>Manage users (Server side table functionalities.)</p>
      <Separator className="mt-4" />
      <UserTable />
    </div>
  )
}

export default UserManagerPage
