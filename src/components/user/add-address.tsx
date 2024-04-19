import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from 'src/hooks/useAuth'
import { faker } from '@faker-js/faker'
import { IAddress } from 'src/types/address'
import postAddress from 'src/api/address/post-address'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import MetaData from 'src/components/metadata'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'
import { Button } from 'src/components/ui/button'
import { cn } from 'src/lib/utils'
import { CheckIcon, SortAscIcon } from 'lucide-react'
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from 'src/components/ui/command'
import { ScrollArea } from 'src/components/ui/scroll-area'
import AddressData from 'src/components/cart/address.json'
import { Input } from 'src/components/ui/input'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
import { Checkbox } from '../ui/check-box'

export const AddressSchema = z.object({
  city_Province: z.string(),
  district: z.string() || null,
  subDistrict: z.string() || null,
  rendezvous: z.string(),
  default: z.boolean().default(false),
})

type FormData = z.infer<typeof AddressSchema>

const AddNewAddress = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(AddressSchema),
  })
  const { user } = useAuth()
  const [city, setCity] = useState('')
  const [getDistrict, setDistrict] = useState('')
  const queryClient = useQueryClient()
  // const provinces = Object.keys(AddressData)
  // const navigate = useNavigate()

  const { mutate: addAddress } = useMutation(postAddress, {
    onSuccess: () => {
      toast({
        title: 'Add new address success',
      }),
        queryClient.invalidateQueries()
    },
    onError: (error: Error) => {
      throw error.message
    },
  })

  const onSubmit = async (data: FormData) => {
    const address: IAddress = {
      addressId: faker.string.uuid(),
      city_Province: data.city_Province,
      district: data.district,
      subDistrict: data.subDistrict,
      rendezvous: data.rendezvous,
      default: data.default,
      userId: user?.userId as string,
    }

    await addAddress(address)
  }

  return (
    <div className="p-4">
      <MetaData title="Address" />
      <Dialog>
        <DialogTrigger>
          <Button>Add New Address</Button>
        </DialogTrigger>
        <DialogContent className="w-[30vw]">
          <div className="rounded-lg border border-gray-200 p-4">
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full max-w-sm ">
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
                                  className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                                >
                                  {field.value
                                    ? AddressData.find((province) => province.Name === field.value)?.Name
                                    : 'Select Province'}
                                  <SortAscIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
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
                                  className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
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
                        <FormItem className="flex flex-col pb-4">
                          <FormLabel className="mt-4">Wards</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
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
                        <FormItem className="mb-2">
                          <FormLabel>Rendezvous</FormLabel>
                          <FormControl>
                            <Input placeholder="ABC..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="default"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center">
                          <FormLabel className="mr-2 mt-2">Default</FormLabel>
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                  <Button type="submit" className="mt-4 w-full">
                    Save
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default AddNewAddress
