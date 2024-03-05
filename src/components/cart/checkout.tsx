import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Loader2, LoaderIcon } from 'lucide-react'
import MetaData from '../metadata'
import { IBook } from 'src/types/books'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { z } from 'zod'
import { CartSchema } from './validation-cart'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ICart } from 'src/types'
import { getBookById } from 'src/api/books/get-book'
import { IOrderCart } from 'src/types/order-cart'
import { checkout } from 'src/api/order/post-order'

type FormData = z.infer<typeof CartSchema>

export default function CheckOutPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(CartSchema),
  })
  const [checkoutUrl, setCheckoutUrl] = useState<string>('')

  const { state } = useParams()
  const [order, setOrder] = useState<ICart[]>([])
  const [checkoutData, setCheckoutData] = useState<IOrderCart[]>([])

  useEffect(() => {
    const getCheckoutData = () => {
      const newData: IOrderCart[] = order.map((item) => {
        const { productId, quantity } = item
        return { productId, quantity }
      })
      setCheckoutData(newData)
    }

    getCheckoutData()
  }, [order])

  // useEffect(() => {
  //   if (order?.totalPrice && order._id) {
  //     getCheckoutUrlApi(order?.totalPrice, order?._id)
  //       .then((res) => {
  //         if (res) {
  //           console.log(res)
  //           setCheckoutUrl(res)
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching order:', error)
  //       })
  //   }
  // }, [order])

  useEffect(() => {
    if (state) {
      try {
        const decodedState = JSON.parse(atob(state))
        setOrder(decodedState)
        console.log('state', decodedState)
      } catch (error) {
        console.error('Error decoding state parameter:', error)
      }
    } else {
      console.error('No state parameter found in URL')
    }
  }, [state])

  const [bookData, setBookData] = useState<IBook[]>([])
  useEffect(() => {
    if (order && order.length > 0) {
      const promises = order
        .filter((cart) => typeof cart.productId === 'string')
        .map((cart) => getBookById(cart.productId as string))

      Promise.all(promises)
        .then((bookDataArray) => {
          setBookData(bookDataArray)
        })
        .catch((error) => {
          console.error('Error fetching book data:', error)
        })
    }
  }, [order])

  interface GroupedByStore {
    [key: string]: { book: IBook; quantity: number; sellerName: string }[] // Mảng của đối tượng chứa thông tin sách và số lượng trong giỏ hàng
  }

  const [cartItemsByStore, setCartItemsByStore] = useState<GroupedByStore>({})

  useEffect(() => {
    const groupedByStore: GroupedByStore = {}

    const processBookData = async (book: IBook) => {
      try {
        if (book && book.productId) {
          if (!groupedByStore[book.sellerId]) {
            groupedByStore[book.sellerId] = []
          }
          groupedByStore[book.sellerId].push({
            book: book,
            quantity: order.find((item) => item.productId === book.productId)?.quantity || 0,
            sellerName: book.sellerName,
          })
        }
      } catch (error) {
        console.error('Error processing book data:', error)
      }
    }

    const processAllBooksData = async () => {
      try {
        for (const book of bookData) {
          if (book && book.sellerId) {
            if (!groupedByStore[book.sellerId]) {
              groupedByStore[book.sellerId] = []
            }
            groupedByStore[book.sellerId].push({
              book: book,
              quantity: order.find((item) => item.productId === book.productId)?.quantity || 0,
              sellerName: book.sellerName,
            })
          }
        }
        setCartItemsByStore(groupedByStore)
      } catch (error) {
        console.error('Error processing all books data:', error)
      }
    }

    processAllBooksData()
  }, [bookData, order])

  useEffect(() => {
    if (checkoutData) {
      checkout(checkoutData)
        .then((res: string) => {
          if (res) {
            console.log(res)
            setCheckoutUrl(res)
          }
        })
        .catch((error) => {
          console.error('Error fetching order:', error)
        })
    }
  }, [checkoutData])

  const checkoutButton = useMemo(() => {
    if (checkoutUrl == '') {
      return (
        <Button size={'lg'} className={'mx-4 px-2'} variant={'default'}>
          <LoaderIcon className="mx-auto h-10 w-10 animate-spin text-secondary" />
        </Button>
      )
    }
    return (
      <Link to={checkoutUrl}>
        <Button size={'lg'} className={'mx-4 px-2'} variant={'default'}>
          Check out
        </Button>
      </Link>
    )
  }, [checkoutUrl])

  if (!order) {
    return (
      <div className="container mx-auto min-h-screen">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  const onSubmit = async (data: FormData) => {
    // const mergedData: IOrder = {
    //   ...data,
    //   cart: order.cart,
    // }
    // await createOrder(mergedData)
    //   .then((order: IOrder) => {
    //     if (order && order._id) {
    //       toast({
    //         title: 'Update address success',
    //         description: 'Update address success',
    //       })
    //     } else {
    //       toast({
    //         title: 'Invalid order response',
    //         description: 'No order ID in the response.',
    //       })
    //     }
    //   })
    //   .catch((error) => {
    //     toast({
    //       title: 'Error submitting order',
    //       description: error.message,
    //     })
    //   })
  }

  return (
    <div className="p-4">
      <MetaData title="Checkout" />
      <div className="rounded-lg border border-gray-200 p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(cartItemsByStore).map((sellerId, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell colSpan={4} className="font-bold">
                    Store {sellerId}
                  </TableCell>
                </TableRow>
                {cartItemsByStore[sellerId].map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.book.name}</TableCell>
                    <TableCell>${item.book.price}</TableCell>
                    <TableCell>
                      <p className="p-2">{item.quantity}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <Separator />
        {/* <Button>Place Order</Button> */}
        {/* <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="m-4 mx-auto w-full max-w-sm space-y-4 rounded-lg border border-gray-200 p-4"
            >
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Address Rental </FormLabel>
                    <FormControl>
                      <Input placeholder="456 CDF" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="depositType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposit Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => form.setValue('depositType', value as 'ONLINE' | 'COD')}
                        defaultValue={field.value}
                        className="flex flex-row justify-between"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="ONLINE" />
                          </FormControl>
                          <FormLabel className="font-normal">Online</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="COD" />
                          </FormControl>
                          <FormLabel className="font-normal">Cash On Delivery</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Button type="submit" className="w-full">
                  Pay deposit
                </Button>
              </div>
              <div className="flex justify-center">{checkoutButton}</div>
            </form>
          </Form>
        </div> */}
        <div className="flex justify-center">{checkoutButton}</div>
      </div>
    </div>
  )
}
