import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, SortAscIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from 'src/components/ui/command'
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Popover, PopoverTrigger, PopoverContent } from 'src/components/ui/popover'
import { ScrollArea } from 'src/components/ui/scroll-area'
import { cn } from 'src/lib/utils'
import { z } from 'zod'
import AddressData from 'src/components/cart/address.json'

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

export const TradeForm = ({ onSubmit, disabled }: { onSubmit: any; disabled: boolean }) => {
  const form = useForm<FormData>({ resolver: zodResolver(formSchema) })
  const [city, setCity] = useState('')
  const [getDistrict, setDistrict] = useState('')
  return (
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
        <Button type="submit" disabled={disabled}>
          Submit
        </Button>
      </form>
    </Form>
  )
}
