import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, SortAscIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { UpdateAgency } from 'src/api/agency/put-agency'
import { ProfileShopSchema } from 'src/components/seller/schema/profile-shop'
import { Avatar, AvatarImage } from 'src/components/ui/avatar'
import { Button } from 'src/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from 'src/components/ui/command'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group'
import { ScrollArea } from 'src/components/ui/scroll-area'
import { Separator } from 'src/components/ui/separator'
import { toast } from 'src/components/ui/use-toast'
import { useAuth } from 'src/hooks/useAuth'
import { cn } from 'src/lib/utils'
import { IAgency } from 'src/types/agency'
import AddressData from 'src/components/cart/address.json'
import { getAddressByAddressId } from 'src/api/address/get-address'
import { IAddress } from 'src/types/address'

type FormData = Zod.infer<typeof ProfileShopSchema>
function ProfileSeller() {
  const { user } = useAuth()
  const [isEdit, setIsEdit] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [city, setCity] = useState('')
  const [getDistrict, setDistrict] = useState('')
  const agency = user?.agencies?.[0]
  const [address, setAddress] = useState<IAddress>()
  const getAddress = address
    ? `${address.city_Province},${address.district},${address.subDistrict},${address.rendezvous}`
    : ''
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const address = await getAddressByAddressId(agency?.postAddressId as string)
        setAddress(address)
        setCity(address.city_Province)
        setDistrict(address.district)
        console.log('address', address)
      } catch (error) {
        console.error('Error fetching trade details:', error)
      }
    }
    fetchAddress()
  }, [agency?.postAddressId])

  const form = useForm<FormData>({
    resolver: zodResolver(ProfileShopSchema),
    defaultValues: {
      agencyName: agency?.agencyName || '',
      logoImg: agency?.logoUrl,
      businessType: agency?.businessType,
      city_Province: city,
      subDistrict: getDistrict,
      district: address?.district,
      rendezvous: address?.rendezvous,
    },
  })

  const navigate = useNavigate()

  const onSubmit = async (data: FormData) => {
    console.log('Form submitted with data:', data)

    setIsLoading(true)
    const address = {
      postAddress: data.city_Province + ', ' + data.district + ', ' + data.subDistrict + ', ' + data.rendezvous,
    }

    const formData: IAgency = {
      postAddress: address.postAddress,
      ownerId: user?.userId,
      agencyId: agency?.agencyId,
      logoImg: data.logoImg as File,
      agencyName: data.agencyName,
      businessType: data.businessType,
    }

    await UpdateAgency(formData, (err, result) => {
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
        console.log(result)
        toast({
          title: 'Register Success',
          variant: 'success',
        })
      }
    })
    setIsLoading(false)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="mx-24 my-12 ">
      <div className="rounded-md border-2">
        <div className="flex flex-col items-start p-4">
          <p className="text-2xl font-bold">Profile Shop</p>
          <p className="text-sm font-light">View Shop status and update your Shop profile</p>
        </div>
        <div className="flex flex-row">
          <Link to={'/seller/profile'}>
            <div className="p-4 pb-0 font-semibold  text-orange-400">
              <p className="underline-animation h-10 px-4 pb-0 ">Information</p>
            </div>
          </Link>

          {/* <div className="p-4 font-semibold text-orange-400">
            <p className="underline-animation h-10">Identification Information</p>
          </div> */}
          <Link to={'/seller/profile/identity-information'}>
            <div className="py-4 pb-0  font-semibold">
              <p className=" pb-0">Identification Information</p>
            </div>
          </Link>
        </div>
        <Separator className="mt-0 p-0" />
        {isEdit ? (
          <div className=" mb-8 w-[61rem]">
            <p className="p-4 text-2xl">Information</p>
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="agencyName"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center">
                        <FormLabel className="w-36 text-right">Name Shop</FormLabel>
                        <FormControl className="ml-8">
                          <Input disabled={isLoading} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="logoImg"
                    render={({ field }) => (
                      <FormItem className="my-4 flex flex-row items-center">
                        <FormLabel className="w-32 text-right">Logo Shop</FormLabel>
                        <FormLabel className="ml-8">
                          <Avatar className="h-36 w-36">
                            <AvatarImage src={agency?.logoUrl} />
                          </Avatar>
                        </FormLabel>
                        <FormControl className="ml-2 w-[50%]">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-row items-center justify-around">
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
                                    : 'Select Wards'}{' '}
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
                        <FormItem className="mb-2">
                          <FormLabel>Rendezvous</FormLabel>
                          <FormControl>
                            <Input placeholder="ABC..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="businessType"
                    render={() => (
                      <FormItem className="flex flex-row items-baseline">
                        <FormLabel className="w-36 text-right">Business Type Shop</FormLabel>
                        <FormControl className="ml-8">
                          <RadioGroup
                            onValueChange={(value) => form.setValue('businessType', value as 'Individual' | 'Company')}
                            className="flex flex-row justify-between"
                            defaultChecked={true}
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Individual" />
                              </FormControl>
                              <FormLabel className="font-normal">Individual</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Company" />
                              </FormControl>
                              <FormLabel className="font-normal">Company</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mt-8 flex flex-row">
                    <Button type="submit" className="ml-40 mr-6 w-20">
                      Save
                    </Button>
                    <Button onClick={() => setIsEdit(false)} className="w-20">
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        ) : (
          <div className="mb-8 w-[61rem]">
            <div className=" flex flex-row items-center justify-between">
              <p className="p-4 text-2xl">Information</p>
              <div className="flex flex-row justify-between">
                <Button onClick={() => navigate(`/shop/${agency?.agencyId}`)} className="mr-4">
                  View My Shop
                </Button>
                <Button onClick={() => setIsEdit(true)} className="mr-8">
                  Edit
                </Button>
              </div>
            </div>
            <div className="ml-16 flex flex-col">
              <div className="flex flex-row">
                <p className="w-36 text-right">Name Shop</p>
                <p className="ml-8">{agency?.agencyName}</p>
              </div>
              <div className="flex flex-row py-2">
                <p className=" w-36 text-right">Logo Shop</p>
                <Avatar className="ml-8 h-36 w-36">
                  <AvatarImage src={agency?.logoUrl as string} />
                </Avatar>
              </div>
              <div className="flex flex-row py-2">
                <p className="w-36 text-right">Address Shop</p>
                <p className="ml-8">{getAddress}</p>
              </div>
              <div className="flex flex-row">
                <p className="w-36 text-right">Business Type</p>
                <p className="ml-8">{agency?.businessType}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default ProfileSeller
