import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { CartSchema } from './validation-cart'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getBookById } from 'src/api/books/get-book'
import { ICheckout, IOrderCart } from 'src/types/order-cart'
import { checkout, createOrder } from 'src/api/order/post-order'
import { useAuth } from 'src/hooks/useAuth'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Table, TableBody, TableCell, TableHead, TableRow } from '../ui/table'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { faker } from '@faker-js/faker'
import { IOrder } from 'src/types/order'
import { IBook } from 'src/types/books'
import { ICart } from 'src/types/cart'
import MetaData from '../metadata'
import CheckoutSuccess from './success'
import CheckoutFailed from './failed'

type FormData = z.infer<typeof CartSchema>

const CheckoutPage = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(CartSchema),
  })
  const { user } = useAuth()
  const [checkoutUrl, setCheckoutUrl] = useState<string>('')
  console.log('checkoutUrl', checkoutUrl)
  const { state } = useParams()
  const [order, setOrder] = useState<ICart[]>([])

  const [checkoutData, setCheckoutData] = useState<ICheckout | null>(null)
  // const navigate = useNavigate()
  console.log('checkoutData', checkoutData)

  useEffect(() => {
    if (state) {
      try {
        const decodedState = JSON.parse(atob(state))
        setOrder(decodedState)
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
    [key: string]: { book: IBook; productId: string; quantity: number; agencyId: string }[]
  }

  const [cartItemsByStore, setCartItemsByStore] = useState<GroupedByStore>({})

  useEffect(() => {
    const groupedByStore: GroupedByStore = {}

    const processAllBooksData = async () => {
      try {
        for (const book of bookData) {
          if (book && book.agencyId) {
            if (!groupedByStore[book.agencyId]) {
              groupedByStore[book.agencyId] = []
            }
            groupedByStore[book.agencyId].push({
              book: book,
              productId: book.productId,
              quantity: order.find((item) => item.productId === book.productId)?.quantity || 0,
              agencyId: book.agencyId,
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
    const getCheckoutData = () => {
      const newData: IOrderCart[] = Object.entries(cartItemsByStore)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(([storeId, items]) => {
          return items.map(({ book, quantity, agencyId }) => ({
            productId: book.productId,
            agencyId: agencyId,
            quantity: quantity,
          }))
        })
        .flat()

      const dataCheckout: ICheckout = {
        referenceId: faker.string.uuid(),
        products: newData,
      }
      setCheckoutData(dataCheckout)
    }

    getCheckoutData()
  }, [cartItemsByStore])

  useEffect(() => {
    if (checkoutData) {
      checkout(checkoutData)
        .then((res: string) => {
          if (res) {
            setCheckoutUrl(res)
          }
        })
        .catch((error) => {
          console.error('Error fetching order:', error)
        })
    }
  }, [checkoutData])

  const onSubmit = async (dataOrder: FormData) => {
    if (dataOrder) {
      if (dataOrder.paymentMethod === 'COD') {
        const mergedData: IOrder = {
          addressId: '5bc177bc-6231-4cca-8f38-746809147f3f',
          customerId: user?.userId,
          paymentMethod: dataOrder.paymentMethod,
          products: checkoutData?.products,
        }

        try {
          const data = await createOrder(mergedData)
          if (data) {
            return <CheckoutSuccess />
          }
        } catch (error) {
          console.error('Error creating order:', error)
          return <CheckoutFailed />
        }
      } else {
        const mergedData: IOrder = {
          addressId: '5bc177bc-6231-4cca-8f38-746809147f3f',
          customerId: user?.userId,
          paymentMethod: dataOrder.paymentMethod,
          products: checkoutData?.products,
        }
        localStorage.setItem('mergedData', JSON.stringify(mergedData))
        return window.location.replace(checkoutUrl)
      }
    }
  }

  if (!order) {
    return (
      <div className="container mx-auto min-h-screen">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-4">
      <MetaData title="Checkout" />
      <div className="rounded-lg border border-gray-200 p-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(cartItemsByStore).map((seller, index) => (
              <React.Fragment key={index}>
                {cartItemsByStore[seller].map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell colSpan={4} className="font-bold">
                      Store {item.book.agencyName}
                    </TableCell>
                  </TableRow>
                ))}
                {cartItemsByStore[seller].map((item, idx) => (
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
        <div>
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
                      <Input
                        placeholder="Placeholder"
                        {...field}
                        defaultValue={user?.username as string}
                        value={field.value}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposit Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => form.setValue('paymentMethod', value as 'VnPay' | 'COD')}
                        defaultValue={field.value}
                        className="flex flex-row justify-between"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="VnPay" />
                          </FormControl>
                          <FormLabel className="font-normal">VnPay</FormLabel>
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
              {/* {form.watch('paymentMethod') === 'ONLINE' ? (
                <Button size="lg" className="mx-4 px-2" variant="default">
                  <Link to={checkoutUrl}> Check out</Link>
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button type="submit" className="w-full">
                    Pay deposit
                  </Button>
                </div>
              )} */}
              <Button type="submit" className="w-full">
                Pay deposit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default CheckoutPage
