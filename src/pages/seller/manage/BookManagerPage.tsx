import React from 'react'
import { useTranslation } from 'react-i18next'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import BookTable from 'src/components/seller/table/book/book-table'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'

function BookManagerPage() {
  const { t } = useTranslation('translation')

  const title = t('manageBook')
  const description = t('titleManageBook')

  const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
    return [
      {
        label: 'DashBoard',
        key: 'dashboard',
        href: '/seller/dashboard',
        icon: 'dashboard',
      },
      {
        key: 'manage_Book',
        label: 'Manage Book',
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
      <Separator className="mt-4" />
      <BookTable />
    </div>
  )
}

export default BookManagerPage
