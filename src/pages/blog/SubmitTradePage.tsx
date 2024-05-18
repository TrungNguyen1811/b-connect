import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ISetTradeStatus,
  ITradeDetail,
  getPostTraderByPostId,
  getTradeDetailByPostId,
  putSetTradeStatus,
  putSubmitTrade,
} from 'src/api/blog/interested'
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
import { IAddress } from 'src/types/address'
import { getAddressByAddressId } from 'src/api/address/get-address'
import { ROLE } from 'src/types'
import { ISubmitTrade } from 'src/types/blog'
import './style.css'
import Evidence from 'src/components/blog/evidence'
import ReportTrade from 'src/components/blog/report'
import ReviewTrade from 'src/components/blog/review'
import TargetsTrade from 'src/components/blog/targets'
import CardProfile from 'src/components/blog/card-profile'
import CardInfoTrade from 'src/components/blog/card-info-trade'
import PaymentMiddleTrade from 'src/components/blog/payment-middle'
import PaymentTrade from 'src/components/blog/payment'

export const ITradeStatus = {
  0: 'Unsubmitted',
  1: 'Submitted',
  2: 'OnDeliveryToMiddle',
  3: 'MiddleReceived',
  4: 'WaitFoeCheckListConfirm',
  5: 'Cancel',
  6: 'OnDeliveryToTrader',
  7: 'Successful',
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
  const [partnerTrade, setPartnerTrader] = useState<ITradeDetail | null>(null)
  const [interester, setInterester] = useState<ITradeDetail | null>(null)
  const [owner, setOwner] = useState<ITradeDetail | null>(null)
  const [isOwner, setIsOwner] = useState<boolean>(true)
  const [address, setAddress] = useState<IAddress>()
  const [addressId, setAddressId] = useState<string>()
  const [openForm, setOpenForm] = useState<boolean>(false)

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
  }, [id, openForm])

  useEffect(() => {
    const fetchUsersAndSetAuthorization = async () => {
      try {
        const getTwoUser = await getPostTraderByPostId(id as string)
        setUsers(getTwoUser)

        if (
          user?.userId !== getTwoUser.ownerId &&
          user?.userId !== getTwoUser.interesterId &&
          !user?.roles?.includes(ROLE.ADMIN)
        ) {
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
    if (tradeDetail && user) {
      const otherUserTradeFound = tradeDetail.find((trade) => {
        if (isOwner) {
          return !trade.details.isPostOwner && trade.traderId !== user.userId
        } else {
          return trade.details.isPostOwner && trade.traderId !== user.userId
        }
      })

      if (otherUserTradeFound) {
        setPartnerTrader(otherUserTradeFound)
      }
    }
  }, [tradeDetail, isOwner, user])

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const address = await getAddressByAddressId(addressId as string)
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

  const tradeStatus = useMutation((formData: ISetTradeStatus) => putSetTradeStatus(formData), {
    onSuccess: (formData) => {
      if (formData) {
        toast({
          title: 'Success',
          description: 'Accept Trade Information Success!!!',
        })
        queryClient.invalidateQueries()
      } else {
        toast({
          title: 'Failed',
          description: 'Accept Trade Information Failed!!!',
        })
      }
    },
    onError: (error: any) => {
      toast({
        title: 'Error Confirm Trade Info',
        description: error.response.data,
      })
    },
  })

  const putStatusTrade = async (tradeDetailsId: string, status: number) => {
    const data: ISetTradeStatus = {
      postId: id as string,
      tradeDetailsId: tradeDetailsId,
      updatedStatus: status,
    }
    tradeStatus.mutate(data)
  }

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
  const [city, setCity] = useState('')
  const [getDistrict, setDistrict] = useState('')

  const SubmitForm = () => {
    return (
      <div className="mx-8">
        <p className="mb-4 text-lg font-semibold">Trade Form</p>
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
                    <Input placeholder="0123456789" {...field} />
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
            <Button className="ml-4 mt-4" variant="outline" onClick={() => setOpenForm(false)}>
              Cancel
            </Button>
          </form>
        </Form>
      </div>
    )
  }

  const submitTradeMutation = useMutation((formData: ISubmitTrade) => putSubmitTrade(formData), {
    onSuccess: (formData) => {
      queryClient.invalidateQueries()
      if (formData) {
        toast({
          title: 'Success',
          description: 'Submit Trade Success!!!',
        })
        setOpenForm(false)
      } else {
        toast({
          title: 'Failed',
          description: 'Submit Trade Failed!!!',
        })
      }
    },
    onError: (error: any) => {
      toast({
        title: 'Error Update Information',
        description: error.response.data,
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
  const renderTraderComponent = (userTrade: ITradeDetail) => {
    const status = userTrade?.details.status

    switch (status) {
      case 2:
        return (
          <div className="mt-4 flex min-w-[33vw] justify-center gap-2 pb-4">
            <div className="flex flex-row items-center justify-end gap-2">
              {userTrade?.details.isUsingMiddle == true && userTrade.details.transactionId == null ? (
                <PaymentMiddleTrade tradeDetailsId={userTrade.details.tradeDetailId} />
              ) : (
                ''
              )}
              {userTrade?.details.isUsingMiddle == false && userTrade.details.transactionId == null ? (
                <PaymentTrade tradeDetailsId={userTrade.details.tradeDetailId} />
              ) : (
                ''
              )}
              <Button onClick={() => navigate(`/blog/dashboard/check-list/${userTrade.details.tradeDetailId}`)}>
                Check List
              </Button>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="mt-4 flex min-w-[33vw] justify-center gap-2 pb-4">
            <Button onClick={() => navigate(`/blog/dashboard/check-list/${userTrade.details.tradeDetailId}`)}>
              Check List
            </Button>
            <Evidence tradeDetailsId={userTrade.details.tradeDetailId} />
          </div>
        )

      case 4:
        return (
          <div className="mt-4 flex min-w-[33vw] justify-center gap-2 pb-4">
            <Button onClick={() => navigate(`/blog/dashboard/check-list/${userTrade.details.tradeDetailId}`)}>
              Check List
            </Button>
            <Evidence tradeDetailsId={userTrade.details.tradeDetailId} />
          </div>
        )

      case 6:
      case 7:
        return (
          <div className="mt-4 flex justify-center gap-2 pb-4">
            {userTrade?.details.isUsingMiddle == true ? (
              <Evidence tradeDetailsId={userTrade.details.tradeDetailId} />
            ) : (
              ''
            )}
          </div>
        )

      case 0:
        return (
          <div className="mt-4 flex min-w-[33vw] justify-center gap-2 pb-4">
            <Button onClick={() => navigate(`/blog/dashboard/check-list/${userTrade.details.tradeDetailId}`)}>
              Check List
            </Button>
            <Button onClick={() => setOpenForm(true)}>Change data</Button>
          </div>
        )

      case 1:
        return (
          <div className="mt-4 flex min-w-[33vw] justify-center gap-2 pb-4">
            <Button onClick={() => navigate(`/blog/dashboard/check-list/${userTrade.details.tradeDetailId}`)}>
              Check List
            </Button>
            <Button onClick={() => setOpenForm(true)}>Change data</Button>
          </div>
        )

      default:
        return renderTrader(userTrade)
    }
  }
  const renderYourTraderComponent = (userTrade: ITradeDetail) => {
    const status = userTrade?.details.status
    const tradeDetailId = userTrade?.details.tradeDetailId
    const traderId = userTrade.traderId

    const handlePutStatusTrade = (newStatus: number) => {
      putStatusTrade(tradeDetailId as string, newStatus)
    }

    switch (status) {
      case 2:
        return (
          <div className="mt-4 flex flex-row gap-2">
            <Button onClick={() => navigate(`/blog/dashboard/check-list/view/${userTrade?.details.tradeDetailId}`)}>
              View Check List
            </Button>
          </div>
        )
      case 3:
        return (
          <div className="mt-4 flex flex-row gap-2">
            <Evidence tradeDetailsId={tradeDetailId} />
            <Button onClick={() => navigate(`/blog/dashboard/check-list/view/${userTrade?.details.tradeDetailId}`)}>
              View Check List
            </Button>
          </div>
        )

      case 4:
        return (
          <div className="mt-4 flex flex-row gap-2">
            <Evidence tradeDetailsId={tradeDetailId} />
            <Button onClick={() => navigate(`/blog/dashboard/check-list/view/${userTrade?.details.tradeDetailId}`)}>
              View Check List
            </Button>
          </div>
        )

      case 6:
      case 7:
        return (
          <div className="mt-4 flex justify-end gap-2">
            {userTrade?.details.isUsingMiddle == true ? <Evidence tradeDetailsId={tradeDetailId} /> : ''}
            <ReviewTrade tradeDetailsId={tradeDetailId} revieweeId={traderId} postId={id as string} />
            <ReportTrade tradeDetailsId={tradeDetailId} postId={id as string} />
          </div>
        )

      case 0:
        return (
          <div className="mt-4 min-w-[33vw] pb-4">
            <div className="flex flex-col items-end justify-end gap-2">
              <div className="flex flex-row justify-end gap-2">
                <TargetsTrade tradeDetailsId={tradeDetailId} />
                <Button onClick={() => navigate(`/blog/dashboard/check-list/view/${userTrade?.details.tradeDetailId}`)}>
                  View Check List
                </Button>
              </div>
              <div className=" text-red-600">Interested person has not confirmed</div>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="mt-4 min-w-[33vw] pb-4">
            {userTrade.details.isUsingMiddle ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex flex-row justify-end gap-2">
                  <Button
                    onClick={() => navigate(`/blog/dashboard/check-list/view/${userTrade?.details.tradeDetailId}`)}
                  >
                    View Check List
                  </Button>
                  <Button className="" onClick={() => handlePutStatusTrade(2)}>
                    Confirm Trade Info
                  </Button>
                </div>
              </div>
            ) : (
              <p className="ml-4 flex justify-end">
                <Button className="" onClick={() => handlePutStatusTrade(6)}>
                  Confirm Trade Info
                </Button>
              </p>
            )}
          </div>
        )

      default:
        return renderTrader(userTrade)
    }
  }

  const renderTrader = (userTrade: ITradeDetail) => {
    return (
      <div className="justify-center px-8 pb-4 sm:h-[16rem] sm:w-[16rem] md:h-[32rem] md:w-[32rem] lg:w-full">
        <div className="px-20">
          <CardProfile userId={userTrade.traderId} />
        </div>
        <Separator className="my-4" />
        <CardInfoTrade userTrade={userTrade} />
      </div>
    )
  }

  return (
    <div className="min-h-[43rem] bg-orange-100 px-32">
      <div className="flex flex-row justify-center">
        {isOwner ? (
          <div className="m-4 flex flex-row justify-center">
            <div className="w-[40vw] rounded-md border-2 border-gray-400 bg-white">
              <p className="m-4 flex justify-center text-lg font-extrabold">YOUR TRADER</p>
              {interester && renderTrader(interester)}
              <div className="flex justify-center">{interester && renderYourTraderComponent(interester)}</div>
            </div>
            <Separator className="mx-8" orientation={'vertical'} />
            <div className="w-[40vw] rounded-md border-2 border-gray-400 bg-white">
              <p className="m-4 flex justify-center text-lg font-extrabold">YOU</p>
              {openForm ? SubmitForm() : userTrade && renderTrader(userTrade)}
              <div className="flex justify-center">{openForm ? '' : userTrade && renderTraderComponent(userTrade)}</div>
            </div>
          </div>
        ) : (
          <div className="m-4 flex flex-row justify-center">
            <div className="w-[40vw] rounded-md border-2 border-gray-400 bg-white">
              <p className="m-4 flex justify-center text-lg font-extrabold">YOU</p>
              {openForm ? SubmitForm() : userTrade && renderTrader(userTrade)}
              <div className="flex justify-center">{openForm ? '' : userTrade && renderTraderComponent(userTrade)}</div>
            </div>
            <Separator className="mx-8" orientation={'vertical'} />
            <div className="w-[40vw] rounded-md border-2 border-gray-400 bg-white">
              <p className="m-4 flex justify-center text-lg font-extrabold">YOUR TRADER</p>
              {owner && renderTrader(owner)}
              <div className="flex justify-center">{owner && renderYourTraderComponent(owner)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
