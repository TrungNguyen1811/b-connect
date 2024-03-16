import React from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import CategoryTable from 'src/components/table/category/category-table'
import { columns } from 'src/components/table/category/column'
import { CreateCategoryForm } from 'src/components/table/category/manage/create-category'
import { useCategoryTable } from 'src/components/table/category/useCategoryTable'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'

function CategoryManagerPage() {
  const { data } = useCategoryTable(columns)

  const navigate = useNavigate()
  const title = `Manage Category ()`
  const description = 'Manage Categorys (Server side table functionalities.)'

  const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
    return [
      {
        label: 'DashBoard',
        key: 'dashboard',
        href: '/admin',
        icon: 'dashboard',
      },
      {
        key: 'manage_Category',
        label: 'Manage Category',
      },
    ]
  }, [])
  return (
    <div className="mx-8 w-full">
      <MetaData title={'Manage Category'} />
      {<Breadcrumb items={breadcrumb} className="max-w-7xl py-4" />}
      <div className="flex items-start justify-between">
        <Heading title={title} description={description} />
        <CreateCategoryForm />
      </div>
      <Separator className="mt-4" />
      <CategoryTable />
    </div>
  )
}

export default CategoryManagerPage
