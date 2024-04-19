import React from 'react'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import RatingTable from 'src/components/seller/table/rating/rating-table'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'

function ReplyReviewPage() {
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

  const title = `Rating`
  const description = 'Manage Reply Reviews  (Server side table functionalities.)'

  const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
    return [
      {
        label: 'DashBoard',
        key: 'dashboard',
        href: '/seller/dashboard',
        icon: 'dashboard',
      },
      {
        key: 'Reply',
        label: 'Rating Shop',
      },
    ]
  }, [])
  return (
    <div className="mx-4">
      <MetaData title={'Rating Shop'} />
      {<Breadcrumb items={breadcrumb} className="max-w-7xl py-4" />}
      <div className="flex items-start justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator className="mt-4" />
      <RatingTable />
    </div>
  )
}

export default ReplyReviewPage
