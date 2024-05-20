import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getFinanceForecast } from 'src/api/seller/get-agency'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import FinanceTable from 'src/components/seller/table/finance/finance-table'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'

function FinanceManagePage() {
  const { t } = useTranslation('translation')

  const title = 'Manage Finance'
  const description = 'Manage Finance'
  const [forecast, setForecast] = useState()

  useEffect(() => {
    const getCategories = async () => {
      try {
        const cate = await getFinanceForecast()
        setForecast(cate)
      } catch (error) {
        console.error('Error fetching cate:', error)
      }
    }

    getCategories()
  }, [])

  console.log('${data?.data.length', forecast)
  const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
    return [
      {
        label: 'DashBoard',
        key: 'dashboard',
        href: '/seller/dashboard',
        icon: 'dashboard',
      },
      {
        key: 'manage_Finance',
        label: 'Manage Finance',
      },
    ]
  }, [])
  return (
    <div className="mx-4">
      <MetaData title={'Manage Finance'} />
      {<Breadcrumb items={breadcrumb} className="max-w-7xl py-4" />}
      <div className="flex items-start justify-between">
        <Heading title={title} description={forecast ? forecast : description} />
      </div>
      <Separator className="mt-4" />
      <FinanceTable />
    </div>
  )
}

export default FinanceManagePage
