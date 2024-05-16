import React from 'react'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import TransactionTable from 'src/components/staff/transaction/transaction-table'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'

function TransactionManagePage() {
  // const [categories, setCategories] = useState<ICategory[]>([])

  // useEffect(() => {
  //   const getCategories = async () => {
  //     try {
  //       const cate = await getAllCategoryNoParam()
  //       setBlogList(cate.data)
  //     } catch (error) {
  //       console.error('Error fetching cate:', error)
  //     }
  //   }

  //   getCategories()
  // }, [])

  // console.log('${data?.data.length', blogList)

  const title = `Manage Transaction`
  const description = 'Manage Transaction  (Server side table functionalities.)'

  const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
    return [
      {
        label: 'DashBoard',
        key: 'dashboard',
        href: '/staff/dashboard',
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
