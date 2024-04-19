import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CheckIcon, Loader2, SortAscIcon } from 'lucide-react'
import { z } from 'zod'
import { CartSchema } from './validation-cart'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getBookById } from 'src/api/books/get-book'
import { ICheckout, IOrderCart } from 'src/types/order-cart'
import { checkout, createOrder } from 'src/api/order/post-order'
import { useAuth } from 'src/hooks/useAuth'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Table, TableBody, TableCell, TableHead, TableRow } from '../ui/table'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { faker } from '@faker-js/faker'
import { IBook } from 'src/types/books'
import { ICart } from 'src/types/cart'
import MetaData from '../metadata'
import CheckoutSuccess from './success'
import CheckoutFailed from './failed'
import { IAddress } from 'src/types/address'
import { getAllAddress } from 'src/api/address/get-address'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from 'src/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command'
import AddressData from './address.json'
import { ScrollArea } from '../ui/scroll-area'
import { Input } from '../ui/input'
import postAddress from 'src/api/address/post-address'
import { Checkbox } from '../ui/check-box'
import { postCartApi } from 'src/api/cart/post-cart'
import { DataCart } from 'src/hooks/useOrderCart'
import { getCartIdApi } from 'src/api/cart/get-cart-id'

type FormData = z.infer<typeof CartSchema>

const CheckoutPage = () => {
  const [address, setAddress] = useState<IAddress[]>([])
  const [addressDefault, setAddressDefault] = useState<IAddress | undefined>(undefined)

  useEffect(() => {
    if (address) {
      setAddressDefault(address[0])
    }
  }, [address])

  const form = useForm<FormData>({
    resolver: zodResolver(CartSchema),
  })
  const { user } = useAuth()
  const userId = user?.userId
  const [checkoutUrl, setCheckoutUrl] = useState<string>('')
  const { state } = useParams()
  const [order, setOrder] = useState<ICart[]>([])
  const [city, setCity] = useState('')
  const [getDistrict, setDistrict] = useState('')
  const [checkbox, setCheckbox] = useState<boolean>(false)
  const [cartData, setCartData] = useState<DataCart[]>([])
  const [cartId, setCartId] = useState<string>()

  useEffect(() => {
    const fetchCartId = async () => {
      try {
        const fetchedCartId = await getCartIdApi(userId as string)
        setCartId(fetchedCartId)
      } catch (error) {
        console.error('Error retrieving cartId:', error)
      }
    }

    if (userId) {
      fetchCartId()
    }
  }, [userId])

  useEffect(() => {
    const updateCartData = () => {
      if (order && order.length > 0) {
        const updatedCartData = order.map((book) => ({
          productId: book.productId as string,
          cartId: cartId || '',
          quantity: book.quantity,
        }))
        setCartData(updatedCartData)
      } else {
        setCartData([])
      }
    }

    updateCartData()
  }, [order, cartId])

  useEffect(() => {
    const saveData = async () => {
      if (order.length > 0) {
        await saveCartToDatabase(cartData)
      }
    }

    saveData()
  }, [cartData])

  const saveCartToDatabase = async (cartData: DataCart[]) => {
    try {
      await postCartApi(cartData)
    } catch (error) {
      console.error('Error saving cart to the database:', error)
    }
  }

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

  useEffect(() => {
    const getAddressById = async () => {
      try {
        const data: IAddress[] = await getAllAddress(user?.userId as string)
        if (data) {
          setAddress(data)
          console.log('Addresses fetched:', data)
        } else {
          console.log('No address data received.')
        }
      } catch (error) {
        console.error('Error fetching addresses:', error)
      }
    }

    console.log('Fetching addresses...')
    getAddressById()
  }, [user?.userId])

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
              productId: book.productId as string,
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
      const address: IAddress = {
        addressId: faker.string.uuid(),
        city_Province: dataOrder.city_Province,
        district: dataOrder.district,
        subDistrict: dataOrder.subDistrict,
        rendezvous: dataOrder.rendezvous,
        default: true,
        userId: user?.userId as string,
      }

      if (checkbox == false) {
        await postAddress(address)
      }
      if (dataOrder.paymentMethod === 'COD') {
        const mergedData = checkbox
          ? {
              addressId: addressDefault?.addressId,
              customerId: user?.userId,
              paymentMethod: dataOrder.paymentMethod,
              products: checkoutData?.products,
            }
          : {
              addressId: address.addressId,
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
        const mergedData = checkbox
          ? {
              addressId: addressDefault?.addressId,
              customerId: user?.userId,
              paymentMethod: dataOrder.paymentMethod,
              products: checkoutData?.products,
            }
          : {
              addressId: address.addressId,
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
                <TableRow>
                  <TableCell colSpan={4} className="font-bold">
                    {cartItemsByStore[seller][0].book.agencyName}
                  </TableCell>
                </TableRow>
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
              <div className="flex flex-row items-center gap-2">
                <p>Use Address Default</p>
                <Checkbox checked={checkbox} onCheckedChange={(checked: boolean) => setCheckbox(checked)} />
              </div>
              {checkbox == true ? (
                <p>
                  Address Default: {addressDefault?.rendezvous}, {addressDefault?.subDistrict},{' '}
                  {addressDefault?.district}, {addressDefault?.city_Province}
                </p>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="city_Province"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>City/Province</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                              >
                                {field.value
                                  ? AddressData.find((province) => province.Name === field.value)?.Name
                                  : 'Select Province'}
                                <SortAscIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search city..." className="h-9" />
                              <CommandEmpty>No city found.</CommandEmpty>
                              <CommandGroup>
                                <ScrollArea className="h-48">
                                  {AddressData.map((province) => (
                                    <CommandItem
                                      value={province.Id}
                                      key={province.Id}
                                      onSelect={() => {
                                        form.setValue('city_Province', province.Name)
                                        const city = form.getValues('city_Province')
                                        setCity(city as string)
                                      }}
                                    >
                                      {province.Name}
                                      <CheckIcon
                                        className={cn(
                                          'ml-auto h-4 w-4',
                                          province.Name === field.value ? 'opacity-100' : 'opacity-0',
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </ScrollArea>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormDescription>This is the province in the selected city.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>District</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                              >
                                {field.value
                                  ? AddressData.find((province) => province.Name === city) // Find selected province
                                      ?.district.find((district) => district.Name === field.value)?.Name // Find selected district
                                  : 'Select District'}
                                <SortAscIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search district..." className="h-9" />
                              <CommandEmpty>No district found.</CommandEmpty>
                              <CommandGroup>
                                <ScrollArea className="h-48">
                                  {AddressData.find((province) => province.Name === form.getValues('city_Province')) // Find selected province
                                    ?.district.map((district) => (
                                      <CommandItem
                                        value={district.Id}
                                        key={district.Id}
                                        onSelect={() => {
                                          form.setValue('district', district.Name)
                                          const dis = form.getValues('district')
                                          setDistrict(dis)
                                        }}
                                      >
                                        {district.Name}
                                        <CheckIcon
                                          className={cn(
                                            'ml-auto h-4 w-4',
                                            district.Id === field.value ? 'opacity-100' : 'opacity-0',
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                </ScrollArea>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormDescription>This is the district in the selected city.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subDistrict"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Wards</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                              >
                                {field.value
                                  ? AddressData.find((province) => province.Name === city) // Find selected province
                                      ?.district.find((district) => district.Name === getDistrict)
                                      ?.subDistrict.find((subDistrict) => subDistrict.Name === field.value)?.Name // Find selected district
                                  : 'Select District'}{' '}
                                <SortAscIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search district..." className="h-9" />
                              <CommandEmpty>No district found.</CommandEmpty>
                              <CommandGroup>
                                <ScrollArea className="h-48">
                                  {AddressData.find((province) => province.Name === form.getValues('city_Province'))
                                    ?.district.find((district) => district.Name === form.getValues('district'))
                                    ?.subDistrict.map((subDistrict) => (
                                      <CommandItem
                                        value={subDistrict.Id}
                                        key={subDistrict.Id}
                                        onSelect={() => {
                                          form.setValue('subDistrict', subDistrict.Name)
                                        }}
                                      >
                                        {subDistrict.Name}
                                        <CheckIcon
                                          className={cn(
                                            'ml-auto h-4 w-4',
                                            subDistrict.Id === field.value ? 'opacity-100' : 'opacity-0',
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                </ScrollArea>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormDescription>This is the wards in the selected city.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rendezvous"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rendezvous</FormLabel>
                        <FormControl>
                          <Input placeholder="ABC..." {...field} />
                        </FormControl>
                        <FormDescription>This is the rendezvous in the selected city.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

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
