import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import MetaData from 'src/components/metadata'
import OrderTable from 'src/components/seller/table/order/order-table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs'

function OrderManagerPage() {
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

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const type = searchParams.get('type')
  return (
    <div className="mx-4">
      <MetaData title={'Manage Order'} />
      <Tabs defaultValue="1" className="mt-4 w-full">
        <TabsList className="flex w-full  justify-evenly self-center bg-orange-100">
          <TabsTrigger value="1">
            <Link to={'?type=1'}>All</Link>
          </TabsTrigger>
          <TabsTrigger value="2">
            <Link to={'?type=2'}>On Delivery</Link>
          </TabsTrigger>
          <TabsTrigger value="3">
            <Link to={'?type=3'}>Complete</Link>
          </TabsTrigger>
          <TabsTrigger value="4">
            <Link to={'?type=4'}>Cancel</Link>
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
