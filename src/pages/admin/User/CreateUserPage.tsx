import React from 'react'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import { columns } from 'src/components/table/user/column'
import { CreateUserForm } from 'src/components/table/user/manage-user/create-user'
import { useUserTable } from 'src/components/table/user/useUserTable'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'

function CreateUserPage() {
  const { data } = useUserTable(columns)

  const title = 'Create User'
  const description = 'Add a new user'

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
        key: 'create_user',
        label: 'Create User',
      },
    ]
  }, [])
  return (
    <div className="mx-8 w-full">
      <MetaData title={'Create User'} />
      {<Breadcrumb items={breadcrumb} className="max-w-7xl py-4" />}
      <Heading title={title} description={description} />
      <Separator className="mt-4" />
      <CreateUserForm />
    </div>
  )
}

export default CreateUserPage
