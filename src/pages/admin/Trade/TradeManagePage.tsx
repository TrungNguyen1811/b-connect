import React from 'react'
import { columns } from 'src/components/admin/trade/column'
import TradeTable from 'src/components/admin/trade/trade-table'
import { useTradeTable } from 'src/components/admin/trade/useTradeTable'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'

function TradeManagerPage() {
  const { data } = useTradeTable(columns)

  const title = `Manage Trade (${data?.data.length ? data?.data.length : 0})`
  const description = 'Manage Trade  (Server side table functionalities.)'

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
        label: 'Manage Trade',
      },
    ]
  }, [])
  return (
    <div className="mx-4 w-full">
      <MetaData title={'Manage Trade'} />
      {<Breadcrumb items={breadcrumb} className="max-w-7xl py-4" />}
      <div className="flex items-start justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator className="mt-4" />
      <TradeTable />
    </div>
  )
}

export default TradeManagerPage
