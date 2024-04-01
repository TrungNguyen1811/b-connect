import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ITradeDetail, getPostTraderByPostId, getTradeDetailByPostId, putSubmitTrade } from 'src/api/blog/interested'
import { Separator } from 'src/components/ui/separator'
import { useAuth } from 'src/hooks/useAuth'
import { IResponseTraderList } from 'src/types/interester'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'src/components/ui/use-toast'
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from 'src/components/ui/command'
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Popover, PopoverTrigger, PopoverContent } from 'src/components/ui/popover'
import { ScrollArea } from 'src/components/ui/scroll-area'
import { Button } from 'src/components/ui/button'
import { SortAscIcon, CheckIcon } from 'lucide-react'
import { cn } from 'src/lib/utils'
import AddressData from 'src/components/cart/address.json'
import { Textarea } from 'src/components/ui/text-area'
import { Label } from 'src/components/ui/label'
import { IAddress } from 'src/types/address'
import { getAddressbyAddressId } from 'src/api/address/get-address'

export const ITradeStatus = {
  0: 'Unsubmitted',
  1: 'Submitted',
  2: 'OnDelivery',
  3: 'Successful',
  4: 'Cancel',
}

export interface ISubmitTrade {
  postId: string
  tradeDetailsId: string
  isPostOwner: boolean
  city_Province: string
  district: string
  subDistrict: string
  rendezvous: string
  phone: string
  note: string
}

const formSchema = z.object({
  postId: z.string().optional(),
  city_Province: z.string(),
  district: z.string(),
  subDistrict: z.string(),
  rendezvous: z.string(),
  phone: z.string(),
  note: z.string(),
})

type FormData = z.infer<typeof formSchema>

export default function SubmitTrade() {
  const { id } = useParams()
  const [users, setUsers] = useState<IResponseTraderList>()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [authorized, setAuthorized] = useState<boolean>(true)
  const [tradeDetail, setTradeDetail] = useState<ITradeDetail[]>()
  const [userTrade, setUserTrader] = useState<ITradeDetail | null>(null)
  const [interester, setInterester] = useState<ITradeDetail | null>(null)
  const [owner, setOwner] = useState<ITradeDetail | null>(null)
  const [isOwner, setIsOwner] = useState<boolean>(true)
  const [address, setAddress] = useState<IAddress>()
  const [addressId, setAddressId] = useState<string>()
  useEffect(() => {
    const fetchTradeDetail = async () => {
      try {
        const trade = await getTradeDetailByPostId(id as string)
        setTradeDetail(trade)
        console.log('trade', trade)
      } catch (error) {
        console.error('Error fetching trade details:', error)
      }
    }
    fetchTradeDetail()
  }, [id])

  useEffect(() => {
    const fetchUsersAndSetAuthorization = async () => {
      try {
        const getTwoUser = await getPostTraderByPostId(id as string)
        setUsers(getTwoUser)

        if (user?.userId !== getTwoUser.ownerId && user?.userId !== getTwoUser.interesterId) {
          setAuthorized(false)
        }

        setIsOwner(getTwoUser.ownerId === user?.userId)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUsersAndSetAuthorization()
  }, [id, user?.userId])

  useEffect(() => {
    if (!authorized) {
      navigate('/')
    }
  }, [authorized, navigate])

  useEffect(() => {
    if (tradeDetail) {
      const userTrade: ITradeDetail = tradeDetail.find((trade) => trade.details.isPostOwner === true) as ITradeDetail
      setOwner(userTrade)
      console.log('owner', userTrade.details.isPostOwner)
    }
  }, [tradeDetail, isOwner])

  useEffect(() => {
    if (tradeDetail) {
      const userTrade: ITradeDetail = tradeDetail.find((trade) => trade.details.isPostOwner === false) as ITradeDetail
      setInterester(userTrade)
      console.log('interester', userTrade)
    }
  }, [tradeDetail, isOwner])

  useEffect(() => {
    if (tradeDetail) {
      const userTradeFound = tradeDetail.find((trade) => {
        if (isOwner) {
          return trade.details.isPostOwner && trade.traderId === user?.userId
        } else {
          return !trade.details.isPostOwner && trade.traderId === user?.userId
        }
      })

      if (userTradeFound) {
        console.log('userTradeFound', userTradeFound)
        setAddressId(userTradeFound.details.addressId)
        setUserTrader(userTradeFound)
      }
    }
  }, [tradeDetail, isOwner, user?.userId])

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const address = await getAddressbyAddressId(addressId as string)
        setAddress(address)
        setCity(address.city_Province)
        setDistrict(address.district)
        console.log('address', address)
      } catch (error) {
        console.error('Error fetching trade details:', error)
      }
    }
    fetchAddress()
  }, [addressId])

  useEffect(() => {
    if (address && Object.keys(address).length !== 0) {
      form.reset({
        city_Province: address.city_Province,
        district: address.district,
        subDistrict: address.subDistrict,
        rendezvous: address.rendezvous,
        phone: userTrade?.details.phone,
        note: userTrade?.details.note,
      })
    }
  }, [address])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city_Province: address?.city_Province,
      district: address?.district,
      subDistrict: address?.subDistrict,
      rendezvous: address?.rendezvous,
      phone: userTrade?.details.phone,
      note: userTrade?.details.note,
    },
  })
  const [city, setCity] = useState('h')
  const [getDistrict, setDistrict] = useState('')

  const submitTradeMutation = useMutation((formData: ISubmitTrade) => putSubmitTrade(formData), {
    onSuccess: (formData) => {
      if (formData) {
        toast({
          title: 'Success',
          description: 'Submit Trade Success!!!',
        })
      } else {
        toast({
          title: 'Failed',
          description: 'Submit Trade Failed!!!',
        })
      }
      queryClient.invalidateQueries()
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Update User',
        description: error.message,
      })
    },
  })

  const onSubmit = async (data: FormData) => {
    const formData: ISubmitTrade = {
      postId: id as string,
      tradeDetailsId: userTrade?.details.tradeDetailId as string,
      isPostOwner: isOwner,
      city_Province: data.city_Province,
      district: data.district,
      subDistrict: data.subDistrict,
      rendezvous: data.rendezvous,
      phone: data.phone,
      note: data.note,
    }

    submitTradeMutation.mutate(formData)
  }

  const renderTrader = (userTrade: ITradeDetail) => {
    return (
      <div className="px-4 pb-4">
        <div className="flex flex-row items-center">
          <Label className="text-md">TraderId:</Label>
          <p className="ml-2">{userTrade?.traderId}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">TradeDetailId:</Label>
          <p className="ml-2">{userTrade?.details.tradeDetailId}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">RatingRecordId:</Label>
          <p className="ml-2">{userTrade?.details.ratingRecordId}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">RatingRecord:</Label>
          <p className="ml-2">{userTrade?.details.ratingRecord}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">LockedRecordId:</Label>
          <p className="ml-2">{userTrade?.details.lockedRecordId}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">Status:</Label>
          <p className="ml-2">{ITradeStatus[userTrade?.details.status as keyof typeof ITradeStatus]}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">IsPostOwner:</Label>
          {userTrade?.details.isPostOwner ? <p className="ml-2">True</p> : <p className="ml-2">False</p>}
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">AddressId:</Label>
          <p className="ml-2">{userTrade?.details.addressId}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">Address:</Label>
          <p className="ml-2">{userTrade?.details.address}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">Phone:</Label>
          <p className="ml-2">{userTrade?.details.phone}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">Note:</Label>
          <p className="ml-2">{userTrade?.details.note}</p>
        </div>
      </div>
    )
  }

  const renderOwner = (userTrade: ITradeDetail) => {
    return (
      <div className="px-4 pb-4">
        <div className="flex flex-row items-center">
          <Label className="text-md">TraderId:</Label>
          <p className="ml-2">{userTrade?.traderId}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">TradeDetailId:</Label>
          <p className="ml-2">{userTrade?.details.tradeDetailId}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">RatingRecordId:</Label>
          <p className="ml-2">{userTrade?.details.ratingRecordId}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">RatingRecord:</Label>
          <p className="ml-2">{userTrade?.details.ratingRecord}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">LockedRecordId:</Label>
          <p className="ml-2">{userTrade?.details.lockedRecordId}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">Status:</Label>
          <p className="ml-2">{ITradeStatus[userTrade?.details.status as keyof typeof ITradeStatus]}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">IsPostOwner:</Label>
          {userTrade?.details.isPostOwner ? <p className="ml-2">True</p> : <p className="ml-2">False</p>}
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">AddressId:</Label>
          <p className="ml-2">{userTrade?.details.addressId}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">Address:</Label>
          <p className="ml-2">{userTrade?.details.address}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">Phone:</Label>
          <p className="ml-2">{userTrade?.details.phone}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">Note:</Label>
          <p className="ml-2">{userTrade?.details.note}</p>
        </div>
      </div>
    )
  }
  console.log('citycity', city)

  return (
    <div className="mx-32">
      <div className="flex flex-row justify-center">
        {isOwner ? (
          <div className="m-4 flex flex-row justify-center">
            <div className="rounded-md border-2">
              <p className="m-4 text-lg font-medium">Interester</p>
              {interester?.details.status === 0 ? (
                <div className="w-full px-4 pb-4">
                  <div className="text-red-600">Interested person has not confirmed</div>
                  {renderTrader(interester!)}
                </div>
              ) : (
                renderTrader(interester!)
              )}
            </div>
            <Separator className="mx-8" orientation={'vertical'} />
            <div className="rounded-md border-2">
              <p className="m-4 text-lg font-medium">Owner</p>
              {userTrade?.details.status == 0 || userTrade?.details.status == 1 ? (
                <div className="w-full px-4 pb-4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="mt-4">District</FormLabel>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subDistrict"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="mt-4">Wards</FormLabel>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="rendezvous"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mt-4">Rendezvous</FormLabel>
                            <FormControl>
                              <Input placeholder="ABC..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mt-4">Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="ABC..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mt-4">Note</FormLabel>
                            <FormControl>
                              <Textarea placeholder="ABC..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button className="mt-4" type="submit">
                        Submit
                      </Button>
                    </form>
                  </Form>
                </div>
              ) : (
                renderOwner(userTrade!)
              )}
            </div>
          </div>
        ) : (
          <div className="m-4 flex flex-row justify-center">
            <div className="rounded-md border-2">
              <p className="m-4 text-lg font-medium">Interester</p>
              {userTrade?.details.status === 0 ? (
                <div>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="mt-4">District</FormLabel>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subDistrict"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="mt-4">Wards</FormLabel>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="rendezvous"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mt-4">Rendezvous</FormLabel>
                            <FormControl>
                              <Input placeholder="ABC..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mt-4">Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="ABC..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mt-4">Note</FormLabel>
                            <FormControl>
                              <Textarea placeholder="ABC..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button className="mt-4" type="submit">
                        Submit
                      </Button>
                    </form>
                  </Form>
                </div>
              ) : (
                renderTrader(userTrade!)
              )}
            </div>
            <Separator className="mx-8" orientation={'vertical'} />
            <div className="rounded-md border-2">
              <p className="m-4 text-lg font-medium">Owner</p>
              {owner?.details.status === 0 ? (
                <div>
                  <div className="text-red-600">Interested person has not confirmed</div>
                  {renderOwner(owner!)}
                </div>
              ) : (
                renderOwner(owner!)
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
