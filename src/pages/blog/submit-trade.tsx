import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ISetTradeStatus,
  ITradeDetail,
  getPostTraderByPostId,
  getTradeDetailByPostId,
  postAddBookCheckList,
  postRateUserPostTrade,
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
import { Label } from 'src/components/ui/label'
import { IAddress } from 'src/types/address'
import { getAddressByAddressId } from 'src/api/address/get-address'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from 'src/components/ui/dialog'
import { IReviewUser } from 'src/types'
import { ISubmitTrade } from 'src/types/blog'
import { ReactTags, Tag } from 'react-tag-autocomplete'
import './style.css'

interface Options {
  readonly value: string
  readonly label: string
}
export const ITradeStatus = {
  0: 'Unsubmitted',
  1: 'Submitted',
  2: 'OnDelivery',
  3: 'Successful',
  4: 'Cancel',
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

const formReviewSchema = z.object({
  comment: z.string(),
  ratingPoint: z.string(),
  image: z.any().optional(),
  video: z.any().optional(),
})

type FormData = z.infer<typeof formSchema>
type FormReview = z.infer<typeof formReviewSchema>

export default function SubmitTrade() {
  const { id } = useParams()
  const [users, setUsers] = useState<IResponseTraderList>()
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [authorized, setAuthorized] = useState<boolean>(true)
  const [tradeDetail, setTradeDetail] = useState<ITradeDetail[]>()
  const [tradeDetailsIdOther, setTradeDetailsIdOther] = useState<string>()
  const [userTrade, setUserTrader] = useState<ITradeDetail | null>(null)
  const [partnerTrade, setPartnerTrader] = useState<ITradeDetail | null>(null)
  const [interester, setInterester] = useState<ITradeDetail | null>(null)
  const [owner, setOwner] = useState<ITradeDetail | null>(null)
  const [isOwner, setIsOwner] = useState<boolean>(true)
  const [address, setAddress] = useState<IAddress>()
  const [addressId, setAddressId] = useState<string>()
  const [open, setOpen] = useState(false)

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
        console.log('otherUserTradeFound', otherUserTradeFound)
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

  const Targets = () => {
    const reactTags = useRef(null)
    const [selected, setSelected] = useState<Tag[]>([])
    const [options, setOptions] = useState<Options[]>([])
    const listTags = useMemo(() => {
      if (!selected) return
      else return selected.map((ct) => ct.label)
    }, [selected])

    const onAdd = useCallback(
      (newTag: Tag) => {
        setSelected([...selected, newTag])
      },
      [selected],
    )

    const onDelete = useCallback(
      (tagIndex: number) => {
        setSelected(selected.filter((_, i) => i !== tagIndex))
      },
      [selected],
    )

    const postTarget = useMutation(
      (data: { targets: string[]; tradeDetailsId: string }) => postAddBookCheckList(data),
      {
        onSuccess: (status) => {
          if (status === 200) {
            console.log('Successful!!!')
            toast({
              title: 'Successful!!!',
              description: 'Add Target Success!',
            })
            queryClient.invalidateQueries()
          } else {
            toast({
              title: 'Invalid Target response',
              description: 'No Target in the response.',
            })
          }
        },
        onError: (error: Error) => {
          toast({
            title: 'Error Submitting Target',
            description: error.message,
          })
        },
      },
    )
    const onSubmitTarget = async () => {
      const data = {
        targets: listTags!,
        tradeDetailsId: userTrade?.details.tradeDetailId as string,
      }
      postTarget.mutate(data)
    }
    return (
      <Dialog>
        <DialogTrigger className="flex">
          <Button>Targets</Button>
        </DialogTrigger>
        <DialogContent className="h-[12rem] w-[36rem]">
          <DialogHeader className="font-semibold">Add 3 targets that require book review</DialogHeader>
          <ReactTags
            labelText="Add to 3 targets"
            selected={selected}
            suggestions={options}
            onAdd={onAdd}
            onDelete={onDelete}
            noOptionsText="No matching target"
            delimiterKeys={[',', 'Enter']}
            allowNew={true}
            ref={reactTags}
          />
          <div className="flex flex-row justify-between">
            <Button onClick={() => onSubmitTarget()}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

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
    onError: (error: Error) => {
      toast({
        title: 'Error Update User',
        description: error.message,
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

  const reviewUser = useMutation((formData: IReviewUser) => postRateUserPostTrade(formData), {
    onSuccess: (formData) => {
      if (formData) {
        toast({
          title: 'Success',
          description: 'Review User Success!!!',
        })
        queryClient.invalidateQueries()
        setOpen(false)
      } else {
        toast({
          title: 'Failed',
          description: 'Review User Failed!!!',
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Review User',
        description: error.message,
      })
    },
  })

  const onSubmitReview = async (data: FormReview) => {
    const formData: IReviewUser = {
      revieweeId: partnerTrade?.traderId as string,
      tradeDetailsId: partnerTrade?.details.tradeDetailId as string,
      comment: data.comment,
      ratingPoint: data.ratingPoint,
      // video: data.video,
      // image: data.image,
    }
    reviewUser.mutate(formData)
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
  const formReview = useForm<FormReview>({
    resolver: zodResolver(formReviewSchema),
  })
  const [city, setCity] = useState('')
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

  const renderTraderComponent = (userTrader: ITradeDetail) => {
    const status = userTrader?.details.status
    const tradeDetailId = userTrader?.details.tradeDetailId

    const handlePutStatusTrade = (newStatus: number) => {
      putStatusTrade(tradeDetailId as string, newStatus)
    }

    switch (status) {
      case 2:
        return (
          <p>
            {/* Confirm receipt of goods and user{' '}
            <Button className="" onClick={() => handlePutStatusTrade(3)}>
              reviews
            </Button> */}
          </p>
        )

      case 3:
        return (
          <div>
            <Button className="ml-4" onClick={() => setOpen(true)}>
              Reviews
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="h-[70vh] w-[40vw]">
                <DialogHeader className="mb-2 px-12">
                  <p className="text-4xl font-extrabold">Feedback</p>
                </DialogHeader>
                <div className="flex flex-col">
                  <Form {...formReview}>
                    <form onSubmit={formReview.handleSubmit(onSubmitReview)}>
                      <FormField
                        control={formReview.control}
                        name="ratingPoint"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mt-4">Rating</FormLabel>
                            <FormControl>
                              <Input placeholder="5*" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formReview.control}
                        name="comment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mt-4">Comment</FormLabel>
                            <FormControl>
                              <Textarea className="h-32" placeholder="ABC..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* <FormField
                        control={formReview.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mt-4">Image</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="ABC..."
                                type="file"
                                accept="image/*"
                                onChange={(e) => field.onChange(e.target.value?.[0] || '')}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formReview.control}
                        name="video"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mt-4">Video</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="ABC..."
                                type="file"
                                accept="image/*"
                                onChange={(e) => field.onChange(e.target.value?.[0] || '')}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      /> */}
                      <Button type="submit" className="mt-4 w-full">
                        Submit
                      </Button>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )

      case 0:
        return (
          <div className="min-w-[33vw] px-4 pb-4">
            <div className="text-red-600">Interested person has not confirmed</div>
          </div>
        )

      case 1:
        return (
          <div className="min-w-[33vw] px-4 pb-4">
            <div className="">
              <div className="flex flex-row items-center">
                <p className="ml-4">
                  <button className="font-normal text-red-600 underline" onClick={() => handlePutStatusTrade(2)}>
                    Accept
                  </button>{' '}
                  to confirm the trade information
                </p>
              </div>
            </div>
          </div>
        )

      default:
        return renderTrader(userTrader)
    }
  }

  const renderTrader = (userTrade: ITradeDetail) => {
    return (
      <div className="px-4 pb-4 sm:h-[16rem] sm:w-[16rem] md:h-[32rem] md:w-[32rem]">
        {/* <div className="flex flex-row items-center">
          <Label className="text-md">TraderId:</Label>
          <p className="ml-2">{userTrade?.traderId}</p>
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">TradeDetailId:</Label>
          <p className="ml-2">{userTrade?.details.tradeDetailId}</p>
        </div> */}
        {/* <div className="flex flex-row items-center">
          <Label className="text-md">RatingRecordId:</Label>
          <p className="ml-2">{userTrade?.details.ratingRecordId}</p>
        </div> */}
        {/* <div className="flex flex-row items-center">
          <Label className="text-md">Rating:</Label>
          <p className="ml-2">{userTrade?.details.ratingRecord}</p>
        </div> */}
        {/* <div className="flex flex-row items-center">
          <Label className="text-md">LockedRecordId:</Label>
          <p className="ml-2">{userTrade?.details.lockedRecordId}</p>
        </div> */}
        <div className="flex flex-row items-center">
          <Label className="text-md">IsPostOwner:</Label>
          {userTrade?.details.isPostOwner ? <p className="ml-2">True</p> : <p className="ml-2">False</p>}
        </div>
        <div className="flex flex-row items-center">
          <Label className="text-md">Status:</Label>
          <p className="ml-2">{ITradeStatus[userTrade?.details.status as keyof typeof ITradeStatus]}</p>
        </div>
        {/* <div className="flex flex-row items-center">
          <Label className="text-md">AddressId:</Label>
          <p className="ml-2">{userTrade?.details.addressId}</p>
        </div> */}
        <div className="flex flex-row items-start">
          <Label className="text-md">Address:</Label>
          <p className="ml-2">{userTrade?.address}</p>
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

  return (
    <div className="mx-32 min-h-[42rem]">
      <div className="flex flex-row justify-center">
        {isOwner ? (
          <div className="m-4 flex flex-row justify-center">
            <div className="rounded-md border-2 bg-white">
              <p className="m-4 text-lg font-medium">Interester</p> {interester && renderTraderComponent(interester)}
              {interester && renderTrader(interester)}
            </div>
            <Separator className="mx-8" orientation={'vertical'} />
            <div className="rounded-md border-2 bg-white">
              <div className="flex flex-row items-center justify-between pr-4">
                <p className="m-4 text-lg font-medium">Owner</p>
                {userTrade?.details.status == 0 || userTrade?.details.status == 1 || userTrade?.details.status == 2 ? (
                  <Targets />
                ) : (
                  ''
                )}
              </div>
              {userTrade?.details.status == 0 || userTrade?.details.status == 1 ? (
                <div className="min-w-[33vw] px-4 pb-4">
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
                userTrade && renderTrader(userTrade)
              )}
            </div>
          </div>
        ) : (
          <div className="m-4 flex flex-row justify-center">
            <div className="rounded-md border-2">
              <div className="flex flex-row items-center justify-between pr-4">
                <p className="m-4 text-lg font-medium">Interester</p>
                {userTrade?.details.status == 0 || userTrade?.details.status == 1 || userTrade?.details.status == 2 ? (
                  <Targets />
                ) : (
                  ''
                )}
              </div>
              {userTrade?.details.status === 0 || userTrade?.details.status == 1 ? (
                <div className="min-w-[33vw] px-4 pb-4">
                  <Targets />
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
                userTrade && renderTrader(userTrade)
              )}
            </div>
            <Separator className="mx-8" orientation={'vertical'} />
            <div className="rounded-md border-2">
              <p className="m-4 text-lg font-medium">Owner</p>
              {owner && renderTraderComponent(owner)}
              {owner && renderTrader(owner)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
