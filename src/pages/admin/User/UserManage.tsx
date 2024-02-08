import { Plus } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import { columns } from 'src/components/table/user/column'
import { useUserTable } from 'src/components/table/user/useUserTable'
import UserTable from 'src/components/table/user/user-table'
import { Button } from 'src/components/ui/button'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'

function UserManagerPage() {
  const { data } = useUserTable(columns)

  const navigate = useNavigate()
  const title = `Manage User (${data?.data.length})`
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
        <Button className="text-xs md:text-sm" onClick={() => navigate(`/admin/manage/user/create`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator className="mt-4" />
      <UserTable />
    </div>
  )
}

export default UserManagerPage
