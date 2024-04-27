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
      <Tabs defaultValue="All" className="mt-4 w-full">
        <TabsList className="flex w-full  justify-evenly self-center bg-orange-100">
          <TabsTrigger value="All">
            <Link to={'?type=All'}>All</Link>
          </TabsTrigger>
          <TabsTrigger value="Unpaid">
            <Link to={'?type=Unpaid'}>Unpaid</Link>
          </TabsTrigger>
          <TabsTrigger value="To ship">
            <Link to={'?type=To ship'}>To ship</Link>
          </TabsTrigger>
          <TabsTrigger value="Shipping">
            <Link to={'?type=Shipping'}>Shipping</Link>
          </TabsTrigger>
          <TabsTrigger value="Completed">
            <Link to={'?type=Completed'}>Completed</Link>
          </TabsTrigger>
          <TabsTrigger value="Cancellation">
            <Link to={'?type=Cancellation'}>Cancellation</Link>
          </TabsTrigger>{' '}
          <TabsTrigger value="Return/Refund">
            <Link to={'?type=Return/Refund'}>Return/Refund</Link>
          </TabsTrigger>{' '}
          <TabsTrigger value="Failed">
            <Link to={'?type=Failed'}>Failed Delivery</Link>
          </TabsTrigger>
          <TabsTrigger value="Other">
            <Link to={'?type=Other'}>Other</Link>
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
