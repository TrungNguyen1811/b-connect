import React from 'react'
import { columns } from 'src/components/admin/post/column'
import PostTable from 'src/components/admin/post/post-table'
import { usePostTable } from 'src/components/admin/post/usePostTable'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'

function PostManagerPage() {
  const { data } = usePostTable(columns)

  const title = `Manage Post (${data?.data.length ? data?.data.length : 0})`
  const description = 'Manage Posts (Server side table functionalities.)'

  const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
    return [
      {
        label: 'DashBoard',
        key: 'dashboard',
        href: '/admin',
        icon: 'dashboard',
      },
      {
        key: 'manage_Post',
        label: 'Manage Post',
      },
    ]
  }, [])
  return (
    <div className="mx-8 w-full">
      <MetaData title={'Manage Post'} />
      {<Breadcrumb items={breadcrumb} className="max-w-7xl py-4" />}
      <div className="flex items-start justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator className="mt-4" />
      <PostTable />
    </div>
  )
}

export default PostManagerPage
