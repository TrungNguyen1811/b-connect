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
          <TabsTrigger value="All">
            <Link to={'?type=All'}>{t('all')}</Link>
          </TabsTrigger>
          <TabsTrigger value="Unpaid">
            <Link to={'?type=Unpaid'}>{t('unpaid')}</Link>
          </TabsTrigger>
          <TabsTrigger value="To ship">
            <Link to={'?type=To ship'}>{t('toShip')}</Link>
          </TabsTrigger>
          <TabsTrigger value="Shipping">
            <Link to={'?type=Shipping'}>{t('shipping')}</Link>
          </TabsTrigger>
          <TabsTrigger value="Completed">
            <Link to={'?type=Completed'}>{t('completed')}</Link>
          </TabsTrigger>
          <TabsTrigger value="Cancellation">
            <Link to={'?type=Cancellation'}>{t('cancellation')}</Link>
          </TabsTrigger>
          <TabsTrigger value="Return/Refund">
            <Link to={'?type=Return/Refund'}>{t('return/Refund')}</Link>
          </TabsTrigger>
          <TabsTrigger value="Failed">
            <Link to={'?type=Failed'}>{t('failedDelivery')}</Link>
          </TabsTrigger>
          <TabsTrigger value="Other">
            <Link to={'?type=Other'}>{t('other')}</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value={type as string}>
          <OrderTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default OrderManagerPage
