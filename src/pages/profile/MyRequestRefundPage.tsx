import React from 'react'
import MetaData from 'src/components/metadata'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'
import RefundTable from 'src/components/user/manage/refund-request/refund-table'

function MyRequestRefundPage() {
  const title = `Request Refund`
  const description = 'Request Refund  (Server side table functionalities.)'

  return (
    <div className="mx-4 w-full">
      <MetaData title={'Request Refund'} />
      <div className="flex items-start justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator className="mt-4" />
      <RefundTable />
    </div>
  )
}

export default MyRequestRefundPage
