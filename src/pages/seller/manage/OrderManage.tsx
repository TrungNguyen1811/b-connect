import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import MetaData from 'src/components/metadata'
import OrderTable from 'src/components/seller/table/order/order-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs'

function OrderManagerPage() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const type = searchParams.get('type')
  const { t } = useTranslation('translation')
  return (
    <div className="mx-4">
      <MetaData title={'Manage Order'} />
      <Tabs defaultValue="All" className="mt-4 w-full">
        <TabsList className="flex w-full  justify-evenly self-center bg-orange-100">
          <Link to={'?type=All'}>
            <TabsTrigger value="All">{t('all')}</TabsTrigger>
          </Link>
          <Link to={'?type=Unpaid'}>
            {' '}
            <TabsTrigger value="Unpaid">{t('unpaid')}</TabsTrigger>
          </Link>
          <Link to={'?type=To ship'}>
            <TabsTrigger value="To ship">{t('toShip')}</TabsTrigger>
          </Link>{' '}
          <Link to={'?type=Shipping'}>
            <TabsTrigger value="Shipping">{t('shipping')}</TabsTrigger>
          </Link>{' '}
          <Link to={'?type=Completed'}>
            <TabsTrigger value="Completed">{t('completed')}</TabsTrigger>
          </Link>{' '}
          <Link to={'?type=Cancellation'}>
            <TabsTrigger value="Cancellation">{t('cancellation')}</TabsTrigger>
          </Link>{' '}
          <Link to={'?type=Return/Refund'}>
            <TabsTrigger value="Return/Refund">{t('return/Refund')}</TabsTrigger>
          </Link>{' '}
          <Link to={'?type=Failed'}>
            <TabsTrigger value="Failed">{t('failedDelivery')}</TabsTrigger>
          </Link>
          <Link to={'?type=Other'}>
            <TabsTrigger value="Other">{t('other')}</TabsTrigger>
          </Link>
        </TabsList>
        <TabsContent value={type as string}>
          <OrderTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default OrderManagerPage
