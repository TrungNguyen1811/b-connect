import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { getBookById } from 'src/api/books/get-book'
import { IBook } from 'src/types'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { CartSchema } from './validation-cart'
import { useOrderCart } from 'src/hooks/useOrderCart'

import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

type FormData = z.infer<typeof CartSchema>

function CartForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(CartSchema),
  })

  const { cartItems, addToCart, decreaseToCart, removeFromCart, clearCart } = useOrderCart()
  const handleAddToCart = (productId: string) => {
    addToCart(productId)
  }

  const handleDecreaseToCart = (productId: string) => {
    decreaseToCart(productId)
  }

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId)
  }

  const onClearCart = React.useCallback(() => {
    clearCart()
  }, [clearCart])

  const [bookData, setBookData] = useState<IBook[]>([])
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const promises = cartItems
        .filter((cart) => typeof cart.productId === 'string')
        .map((cart) => getBookById(cart.productId as string)) // Cast to string

      Promise.all(promises)
        .then((bookDataArray) => {
          setBookData(bookDataArray)
        })
        .catch((error) => {
          console.error('Error fetching book data:', error)
        })
    }
  }, [cartItems])

  //   const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: FormData) => {
    // const mergedData: IOrder = {
    //   ...data,
    //   cart: cartItems,
    // }
    // await postOrderApi(mergedData)
    //   .then((order: IOrder) => {
    //     if (order && order._id) {
    //       console.log('Order ID:', order._id)
    //       navigate(`/view-checkout/${order._id}`)
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
      <div className="rounded-lg border border-gray-200 p-4">
        {/* <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems && bookData && bookData.length > 0 ? (
              cartItems.map((cart, index) => (
                <TableRow key={bookData[index]._id}>
                  <TableCell className="font-medium">{bookData[index].name}</TableCell>
                  <TableCell className="align-center flex items-center gap-2">
                    <Button
                      size="icon"
                      variant={'outline'}
                      onClick={() => handleDecreaseToCart(bookData[index]._id as string)}
                    >
                      -
                    </Button>
                    <p> {cart.quantity}</p>
                    <Button
                      size="icon"
                      variant={'outline'}
                      onClick={() => handleAddToCart(bookData[index]._id as string)}
                    >
                      +
                    </Button>
                  </TableCell>
                  <TableCell>{formatPrice(bookData[index].price * cart.quantity)}</TableCell>
                  <TableCell className="font-medium">
                    <Button
                      size="icon"
                      variant={'outline'}
                      onClick={() => handleRemoveFromCart(bookData[index]._id as string)}
                    >
                      <XIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
            <TableRow />
          </TableBody>
        </Table> */}

        <Separator />
        <Button variant={'outline'} onClick={onClearCart}>
          Clear Cart
        </Button>
      </div>
      <div className="rounded-lg border border-gray-200 p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-4 mx-auto w-full max-w-sm space-y-4 rounded-lg border border-gray-200 p-4"
          >
            <FormField
              control={form.control}
              name="pickupLocation"
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
            {/* <div className="mt-4">
                            <p className="text-gray-700">
                                Confirm address: {result}
                            </p>
                        </div> */}
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CartForm
