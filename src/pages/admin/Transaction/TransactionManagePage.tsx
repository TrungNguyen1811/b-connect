import React from 'react'
import { columns } from 'src/components/admin/transaction/column'
import TransactionTable from 'src/components/admin/transaction/transaction-table'
import { useTransactionTable } from 'src/components/admin/transaction/useTransactionTable'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'

function TransactionManagePage() {
  const { data } = useTransactionTable(columns)

  const title = `Manage Transaction (${data?.data.length ? data?.data.length : 0})`
  const description = 'Manage Transaction  (Server side table functionalities.)'

  const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
    return [
      {
        label: 'DashBoard',
        key: 'dashboard',
        href: '/admin/dashboard',
        icon: 'dashboard',
      },
      {
        key: 'manage_Trade',
        label: 'Manage Transaction',
      },
    ]
  }, [])
  return (
    <div className="mx-4 w-full">
      <MetaData title={'Manage Transaction'} />
      {<Breadcrumb items={breadcrumb} className="max-w-7xl py-4" />}
      <div className="flex items-start justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator className="mt-4" />
      <TransactionTable />
    </div>
  )
}

export default TransactionManagePage
