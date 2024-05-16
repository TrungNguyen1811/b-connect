import React from 'react'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import RefundTable from 'src/components/staff/refund/refund-table'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'

function RefundManagePage() {
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

  const title = `Manage Refund`
  const description = 'Manage Refund  (Server side table functionalities.)'

  const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
    return [
      {
        label: 'DashBoard',
        key: 'dashboard',
        href: '/staff/dashboard',
        icon: 'dashboard',
      },
      {
        key: 'manage_Refund',
        label: 'Manage Refund',
      },
    ]
  }, [])
  return (
    <div className="mx-4 w-full">
      <MetaData title={'Manage Refund'} />
      {<Breadcrumb items={breadcrumb} className="max-w-7xl py-4" />}
      <div className="flex items-start justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator className="mt-4" />
      <RefundTable />
    </div>
  )
}

export default RefundManagePage
