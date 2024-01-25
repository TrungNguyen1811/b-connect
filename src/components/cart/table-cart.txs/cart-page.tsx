import { ICart } from 'src/types'
import { DataTable } from './data-table-cart'
import { columns } from './cart-column'
import React from 'react'
import { useOrderCart } from 'src/hooks/useOrderCart'

// export default async function CartPage() {
//   const data = await getData()

//   return (
//     <div className="container mx-auto py-10">
//       <DataTable columns={columns} data={data} />
//     </div>
//   )
// }

export default function CartPage() {
  const { cartItems } = useOrderCart()
  async function getData(): Promise<ICart[]> {
    // Fetch data from your API here.
    return [
      {
        _id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        quantity: 12,
        bookId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
      {
        _id: '4fa85f64-5717-4562-b3fc-2c963f66afa6',
        quantity: 12,
        bookId: '4fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
      {
        _id: '4fa85f64-5717-4562-b3fc-2c963f66afa6',
        quantity: 12,
        bookId: '4fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
      {
        _id: '4fa85f64-5717-4562-b3fc-2c963f66afa6',
        quantity: 12,
        bookId: '4fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
      {
        _id: '4fa85f64-5717-4562-b3fc-2c963f66afa6',
        quantity: 12,
        bookId: '4fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
      {
        _id: '4fa85f64-5717-4562-b3fc-2c963f66afa6',
        quantity: 12,
        bookId: '4fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
      // ...
    ]
  }
  const [data, setData] = React.useState<ICart[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getData()
      setData(result)
    }

    fetchData()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={cartItems} />
    </div>
  )
}
