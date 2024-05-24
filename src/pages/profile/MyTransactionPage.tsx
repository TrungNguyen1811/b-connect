import React from 'react'
import MetaData from 'src/components/metadata'
import { Heading } from 'src/components/ui/heading'
import { Separator } from 'src/components/ui/separator'
import TransactionTable from 'src/components/user/manage/transaction/transaction-table'

function MyTransactionPage() {
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

  const title = `Payment History`
  const description = 'Payment History  (Server side table functionalities.)'

  return (
    <div className="w-full">
      <MetaData title={'Payment History'} />
      <div className="flex items-start justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator className="mt-4" />
      <TransactionTable />
    </div>
  )
}

export default MyTransactionPage
