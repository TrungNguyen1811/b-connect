import React from 'react'
import { columns } from 'src/components/admin/refund/column'
import RefundTable from 'src/components/admin/refund/refund-table'
import { useRefundTable } from 'src/components/admin/refund/useRefundTable'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'

function RefundManagePage() {
  const { data } = useRefundTable(columns)

  const title = `Manage Refund (${data?.data.length ? data?.data.length : 0})`
  const description = 'Manage Refund  (Server side table functionalities.)'

  const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
    return [
      {
        label: 'DashBoard',
        key: 'dashboard',
        href: '/admin/dashboard',
        icon: 'dashboard',
      },
      {
        key: 'manage_Refund',
        label: 'Manage Refund',
      },
    ]
  }, [])
  return (
    <div className="mx-4 w-full">
      <MetaData title={'Manage Refund'} />
      {<Breadcrumb items={breadcrumb} className="max-w-7xl py-4" />}
      <div className="flex items-start justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator className="mt-4" />
      <RefundTable />
    </div>
  )
}

export default RefundManagePage
