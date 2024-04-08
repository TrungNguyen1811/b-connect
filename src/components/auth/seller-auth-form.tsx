'use client'

import * as React from 'react'

import { cn } from 'src/lib/utils'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { CheckIcon, Loader2, SortAscIcon } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/hooks/useAuth'
import { AxiosError } from 'axios'
import { toast } from '../ui/use-toast'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { SetIsAccountValidates } from 'src/api/agency/set-is-account-validated'
import { RegisterAgency } from 'src/api/agency/post-register-agency'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { getUserProfileApi } from 'src/api/apis/auth/profile.api'
import { ROLE } from 'src/types/user'
import { Carousel, CarouselButtonNext, CarouselButtonPrevious, CarouselContent, CarouselItem } from '../ui/carousel'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'
import IdentificationSeller from '../user/ctc'
import { Checkbox } from '../ui/check-box'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from '../ui/command'
import { ScrollArea } from '../ui/scroll-area'
import { useEffect, useState } from 'react'
import { IAddress } from 'src/types/address'
import { getAllAddress } from 'src/api/address/get-address'
import AddressData from 'src/components/cart/address.json'
import { faker } from '@faker-js/faker'
import postAddress from 'src/api/address/post-address'

const SubscribeSchema = z.object({
  agencyName: z.string().min(3),
  logoImg: z.any(),
  city_Province: z.string(),
  district: z.string() || null,
  subDistrict: z.string() || null,
  rendezvous: z.string(),
  businessType: z.enum(['Individual', 'Company']),
})

type UserSubscribeFormProps = React.HTMLAttributes<HTMLDivElement>
type FormData = z.infer<typeof SubscribeSchema>
export function SubscribeAgencyForm({ className, ...props }: UserSubscribeFormProps) {
  const { user, login } = useAuth()
  console.log(user?.isValidated)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const form = useForm<FormData>({
    resolver: zodResolver(SubscribeSchema),
  })
  const navigate = useNavigate()
  const [city, setCity] = useState('')
  const [getDistrict, setDistrict] = useState('')
  const [checkbox, setCheckbox] = useState<boolean>(false)
  const [address, setAddress] = useState<IAddress[]>([])
  const [addressDefault, setAddressDefault] = useState<IAddress | undefined>(undefined)
  useEffect(() => {
    if (address) {
      setAddressDefault(address[0])
    }
  }, [address])
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

  const resetUser = async () => {
    await getUserProfileApi((err, user) => {
      if (err) {
        toast({
          title: err.message,
          description: err.cause?.message,
          variant: 'destructive',
        })
      } else {
        if (!user) {
          return
        }
        const token = localStorage.getItem('token') as string
        login({ user, token })
        console.log(user.roles)
        if (user?.roles && user.roles.includes(ROLE.AGENCY)) {
          navigate('/seller')
        }
        // const agency = user?.roles?.find((role) => role === 'Agency')
        // console.log('agency', agency)
        // if (agency === 'Agency') {
        //   navigate('/seller')
        // }
      }
    })
  }

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    const address: IAddress = {
      addressId: faker.string.uuid(),
      city_Province: data.city_Province,
      district: data.district,
      subDistrict: data.subDistrict,
      rendezvous: data.rendezvous,
      default: true,
      userId: user?.userId as string,
    }

    if (checkbox == false) {
      await postAddress(address)
    }
    const mergedData = {
      businessType: data.businessType,
      Rendezvous: data.rendezvous,
      agencyName: data.agencyName,
      ownerId: user?.userId,
      logoImg: data.logoImg as File,
    }
    let error: AxiosError | null = null
    console.log('user?.isValidated', user?.isValidated)
    resetUser()
    if (user?.isValidated == false) {
      await SetIsAccountValidates(user?.userId as string, async (err, data) => {
        if (err) {
          error = err
          return
        } else {
          resetUser()
          toast({
            title: 'Update validate success',
            description: data,
            variant: 'success',
          })
        }
      })
      if (!error) {
        await RegisterAgency(mergedData, async (err, data) => {
          if (err) {
            toast({
              title: err.message,
              description: err.cause?.message,
              variant: 'destructive',
            })
          } else {
            if (!user) {
              return
            }
            toast({
              title: 'Register Success',
              description: data,
              variant: 'success',
            })
            resetUser()
          }
        })
      }
      if (error) {
        toast({
          title: 'Register Failed',
          variant: 'destructive',
        })
      }
    }
    if (user?.isValidated == true) {
      await RegisterAgency(mergedData, async (err, data) => {
        if (err) {
          toast({
            title: err.message,
            description: err.cause?.message,
            variant: 'destructive',
          })
        } else {
          if (!user) {
            return
          }
          toast({
            title: 'Register Success',
            description: data,
            variant: 'success',
          })
          resetUser()
        }
      })
    }

    setIsLoading(false)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn('mx-auto mt-10 grid w-[70vw]', className)} {...props}>
      <div className="mb-5 flex flex-col items-start justify-start p-0">
        <p className="opacity-50">Subscribe Account Agency</p>
        <h4 className="text-4xl font-extrabold">Welcome to BConnect Agency</h4>
        <p className="opacity-50">Subscribe to manage your store.</p>
      </div>
      <Carousel className="m-4 min-h-[32rem] w-full" plugins={[]}>
        <CarouselContent>
          <CarouselItem className="mb-8">
            <Card>
              <CardContent className=" items-top flex aspect-square max-h-[28rem] w-full justify-center p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-row gap-2">
                      <FormField
                        control={form.control}
                        name="agencyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name Shop</FormLabel>
                            <FormControl>
                              <Input
                                defaultValue={user?.username}
                                disabled={isLoading}
                                placeholder="Store A"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="logoImg"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Logo Shop</FormLabel>
                            <FormControl>
                              <Input type="file" accept="image/*" disabled={isLoading} {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-row items-center gap-2 pt-2">
                      <p className="">Use Address Default</p>
                      <Checkbox checked={checkbox} onCheckedChange={(checked: boolean) => setCheckbox(checked)} />
                    </div>
                    {checkbox == true ? (
                      <p className="my-2 flex flex-row items-center">
                        <p className="mr-2 text-sm font-semibold">Address Default:</p> {addressDefault?.rendezvous},{' '}
                        {addressDefault?.subDistrict}, {addressDefault?.district}, {addressDefault?.city_Province}
                      </p>
                    ) : (
                      <>
                        <div className=" mb-2 flex flex-row justify-between gap-2">
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
                                        className={cn(
                                          'w-[200px] justify-between',
                                          !field.value && 'text-muted-foreground',
                                        )}
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
                                <FormLabel>District</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                          'w-[200px] justify-between',
                                          !field.value && 'text-muted-foreground',
                                        )}
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
                                          {AddressData.find(
                                            (province) => province.Name === form.getValues('city_Province'),
                                          ) // Find selected province
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
                                <FormLabel>Wards</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                          'w-[200px] justify-between',
                                          !field.value && 'text-muted-foreground',
                                        )}
                                      >
                                        {field.value
                                          ? AddressData.find((province) => province.Name === city) // Find selected province
                                              ?.district.find((district) => district.Name === getDistrict)
                                              ?.subDistrict.find((subDistrict) => subDistrict.Name === field.value)
                                              ?.Name // Find selected district
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
                                          {AddressData.find(
                                            (province) => province.Name === form.getValues('city_Province'),
                                          )
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
                        </div>
                        <FormField
                          control={form.control}
                          name="rendezvous"
                          render={({ field }) => (
                            <FormItem className="mb-2">
                              <FormLabel>Rendezvous</FormLabel>
                              <FormControl>
                                <Input placeholder="ABC..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    <FormField
                      control={form.control}
                      name="businessType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              className="flex flex-row justify-evenly"
                              onValueChange={(value) =>
                                form.setValue('businessType', value as 'Individual' | 'Company')
                              }
                              defaultValue={field.value}
                            >
                              <FormItem>
                                <FormControl>
                                  <RadioGroupItem value="Individual" />
                                </FormControl>
                                <FormLabel>Individual</FormLabel>
                              </FormItem>
                              <FormItem>
                                <FormControl>
                                  <RadioGroupItem value="Company" />
                                </FormControl>
                                <FormLabel>Company</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="mt-4 flex items-center justify-center">
                      <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading && <Loader2 className=" h-4 w-4 animate-spin" />}
                        Submit
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </CarouselItem>

          {user?.isValidated === false && (
            <CarouselItem className="">
              <Card className="">
                <CardContent className="aspect-square max-h-[28rem] w-full items-center justify-center">
                  <IdentificationSeller />
                </CardContent>
              </Card>
            </CarouselItem>
          )}

          <Separator />
        </CarouselContent>
        <CarouselButtonPrevious />
        <CarouselButtonNext />
      </Carousel>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="agencyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name Shop</FormLabel>
                <FormControl>
                  <Input defaultValue={user?.username} disabled={isLoading} placeholder="Store A" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logoImg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo Shop</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" disabled={isLoading} {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rendezvous"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup address</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="ABC" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => form.setValue('businessType', value as 'Individual' | 'Company')}
                    defaultValue={field.value}
                  >
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="Individual" />
                      </FormControl>
                      <FormLabel>Individual</FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="Company" />
                      </FormControl>
                      <FormLabel>Company</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4 flex items-center justify-center">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className=" h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </div>
        </form>
      </Form> */}
    </div>
  )
}
