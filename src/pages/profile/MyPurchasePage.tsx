import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import { getOrderHistoryApi } from 'src/api/order/get-order'
import { getCompareMonth, getTotalSpend } from 'src/api/user/get-user'
import BlockGridLoading from 'src/components/book/block-grid-loading'
import { Button } from 'src/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from 'src/components/ui/card'
import { Form, FormControl, FormField, FormItem } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { ScrollArea } from 'src/components/ui/scroll-area'
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from 'src/components/ui/select'
import { Separator } from 'src/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs'
import { useAuth } from 'src/hooks/useAuth'
import { useCustomQuery } from 'src/hooks/useCustomQuery'
import { formatPrice } from 'src/lib/utils'
import { IResponseOrder } from 'src/types/order'
import { z } from 'zod'
const formSchema = z.object({
  month: z.string(),
  year: z.string(),
})

type FormData = z.infer<typeof formSchema>
function MyPurchase() {
  const form = useForm<FormData>({ resolver: zodResolver(formSchema) })
  const { user } = useAuth()
  const [mess, setMess] = useState('')
  const [compare, setCompare] = useState('')
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const type = searchParams.get('type')

  console.log('type', type)

  useEffect(() => {
    const fetch = async () => {
      const compare = await getCompareMonth(user?.userId as string)
      setCompare(compare)
    }
    fetch()
  }, [user?.userId])

  const { data, isLoading, isError } = useCustomQuery<IResponseOrder[]>(
    () => getOrderHistoryApi(user?.userId as string),
    {
      refetchOnWindowFocus: false,
    },
  )
  console.log('data', data)

  const onSubmit = async (data: FormData) => {
    const formData = {
      ...data,
      customerId: user?.userId as string,
    }
    const mess = await getTotalSpend(formData)
    setMess(mess)
  }
  const Order = ({ order }: { order: IResponseOrder }) => {
    return (
      <div>
        <div>
          {order.items.map((o) => (
            <div key={o.bookId}>
              <div className="border-1 mb-8 rounded-sm border bg-white p-4">
                <div className="mb-2 flex flex-row items-center justify-start">
                  <p className="text-sm font-semibold">Agene Name</p>
                  <Link
                    className="ml-2 rounded-sm border px-2 py-1 text-xs text-gray-500 hover:bg-orange-400 hover:text-white"
                    to={`/shop/${o.agencyId}`}
                  >
                    View Shop
                  </Link>
                  <p className="flex flex-grow"></p>
                  {/* <p>{o.status}</p> */}
                  <p>Complete</p>
                </div>
                <Separator />
                <div className="flex flex-row items-end justify-between">
                  <div className="my-4 flex flex-row items-stretch justify-start">
                    <img src={o.bookDir} className="w-20 border" />
                    <div className="ml-4 flex flex-col">
                      <p>{o.bookName}</p>
                      <p className="text-sm text-gray-500">Type: Old</p>
                      {/* <p className="text-sm text-gray-500">{o.type}</p> */}
                      <p className="mt-1 text-sm">x{o.quantity}</p>
                    </div>
                  </div>
                  <p className="text-orange-500">{formatPrice(o.price)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div>
          <p>{order.date}</p>
          <p>{order.totalPrice}</p>
        </div> */}
      </div>
    )
  }

  const renderOrder = useMemo(() => {
    if (isLoading) return <BlockGridLoading pageSize={8} className="col-span-full grid grid-cols-4 gap-4" />
    if (!data?.data || data.data.length === 0)
      return (
        <div className="col-span-full row-span-full  w-full">
          <h3 className="h-96 pt-48 text-center text-slate-300">No result found</h3>
        </div>
      )
    return data?.data.map((order) => {
      return (
        <div key={order.orderId}>
          <Order order={order} />
        </div>
      )
    })
  }, [data?.data, isLoading])
  return (
    <div className="flex w-full flex-row">
      <div className="w-full">
        <Tabs defaultValue="1" className="w-full ">
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
          <TabsContent value={type as string}>{renderOrder}</TabsContent>
        </Tabs>
      </div>
      <div className="mx-4 flex w-2/5 flex-col">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Total Spend</CardTitle>
            <CardDescription>{compare}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex w-full flex-row items-center justify-end gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name="month"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Month" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent position="popper">
                              <ScrollArea className="h-32">
                                {Array.from({ length: 11 }, (_, index) => (
                                  <SelectItem key={index} value={`${index + 1}`}>
                                    Month {index + 1}
                                  </SelectItem>
                                ))}
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center">
                          <FormControl>
                            <Input placeholder="year" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit">Check</Button>
                </div>
                <p className="text-sm italic text-orange-500">&rdquo;{mess}&rdquo;</p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
export default MyPurchase
