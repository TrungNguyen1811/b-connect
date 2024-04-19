import React from 'react'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import BookGroupTable from 'src/components/seller/table/book-group/book-group-table'
import { AddBookGroup } from 'src/components/seller/table/book-group/manage/add-book-group'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'

function BookGroupManagerPage() {
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

  const title = `Manage Book Group`
  const description = 'Manage Book Group (Server side table functionalities.)'

  const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
    return [
      {
        label: 'DashBoard',
        key: 'dashboard',
        href: '/seller/dashboard',
        icon: 'dashboard',
      },
      {
        key: 'manage_BookGroup',
        label: 'Manage Book Group',
      },
    ]
  }, [])
  return (
    <div className="mx-4">
      <MetaData title={'Manage Book Group'} />
      {<Breadcrumb items={breadcrumb} className="max-w-7xl py-4" />}
      <div className="flex items-start justify-between">
        <Heading title={title} description={description} />
        <AddBookGroup />
      </div>
      <Separator className="mt-4" />
      <BookGroupTable />
    </div>
  )
}

export default BookGroupManagerPage
