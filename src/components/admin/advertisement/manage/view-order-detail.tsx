import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'
import { IResponseOrderAgencyDetail } from 'src/types'

function OrderDetailPage() {
  const { order } = useLoaderData() as { order: IResponseOrderAgencyDetail }
  const title = `Order Detail`
  const description = 'View all order detail at here.'

  const breadcrumb = useMemo<IBreadcrumb[]>(() => {
    return [
      {
        label: 'DashBoard',
        key: 'dashboard',
        href: '/seller/dashboard',
        icon: 'dashboard',
      },
      {
        key: 'manage_Order',
        label: 'Manage Order',
        href: '/seller/manage/order/?type=Done',
      },
      {
        key: 'detail_Order',
        label: 'Order Detail',
      },
    ]
  }, [])
  return (
    <div className="mx-4">
      <MetaData title={'Manage Book'} />
      {<Breadcrumb items={breadcrumb} className="max-w-7xl py-4" />}
      <div className="flex items-start justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator className="mt-4" />{' '}
      <div className="ml-4 mt-4">
        <p>
          <strong>OrderId:</strong> {order.orderId}
        </p>
        <p>
          <strong>TransactionId: </strong>
          {order.transactionId}
        </p>
        <p>
          <strong>Customer Id: </strong>
          {order.customerId}
        </p>
        <p>
          <strong>Customer Name:</strong> {order.customerName}
        </p>
        <p>
          <strong>Book Name:</strong> {order.bookName.join(',')}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>PaymentMethod:</strong> {order.paymentMethod}
        </p>
        <p>
          <strong>Quantity:</strong> {order.quantity}
        </p>
        <p>
          <strong>Price:</strong> {order.price}
        </p>
        <p>
          <strong>Address: </strong>
          {order.address}
        </p>
        <p>
          <strong>Notes:</strong> {order.notes}
        </p>
        <p>
          <strong>Created Date: </strong>
          {order.createdDate}
        </p>
      </div>
    </div>
  )
}
export default OrderDetailPage
