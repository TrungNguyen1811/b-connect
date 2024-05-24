import { faker } from '@faker-js/faker'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckIcon, Loader2, SortAscIcon } from 'lucide-react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { postCheckoutAds } from 'src/api/advertisement/post-checkout-ads'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'src/components/ui/accordion'
import { Button } from 'src/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from 'src/components/ui/command'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Heading } from 'src/components/ui/heading'
import { Input } from 'src/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'
import { Separator } from 'src/components/ui/separator'
import { toast } from 'src/components/ui/use-toast'
import { useAuth } from 'src/hooks/useAuth'
import { cn } from 'src/lib/utils'
import { Duration, ICheckoutAds } from 'src/types/advertisement'
import { z } from 'zod'

const relevantSchema = z.object({
  bookId: z.string(),
  numberOfTargetUser: z.coerce.number().min(0),
  ppc_Price: z.coerce.number().min(0),
  duration: z.string(),
})
const typeDuration = [
  { label: 'Week', value: 'Week' },
  { label: 'Month', value: 'Month' },
  { label: 'Year', value: 'Year' },
]
type FormRelevantData = z.infer<typeof relevantSchema>
function AdvertisementPage() {
  const title = `Advertisement`
  const description = 'Create ads to let users know more about your store'
  const { user } = useAuth()
  const breadcrumb = useMemo<IBreadcrumb[]>(() => {
    return [
      {
        label: 'DashBoard',
        key: 'dashboard',
        href: '/seller/dashboard',
        icon: 'dashboard',
      },
      {
        key: 'advertisement',
        label: 'Advertisement',
      },
    ]
  }, [])

  const queryClient = useQueryClient()

  // relevant
  const formRelevant = useForm<FormRelevantData>({
    resolver: zodResolver(relevantSchema),
  })
  const checkoutRelevantAds = useMutation({
    mutationFn: (data: ICheckoutAds) => {
      return postCheckoutAds(data)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries()
      return window.location.replace(data)
    },
    onError: () => {
      toast({
        title: 'Error Checkout Ads',
      })
    },
  })

  const onSubmitRelevant = async (data: FormRelevantData) => {
    const transactionId = faker.string.uuid()

    const formCheckoutData: ICheckoutAds = {
      transactionId: transactionId,
      campaignType: 1,
      duration: data.duration,
      numberOfTargetUser: data.numberOfTargetUser,
      ppc_Price: data.ppc_Price,
      bookId: data.bookId,
    }

    const formData: ICheckoutAds = {
      transactionId: transactionId,
      agencyId: user?.agencies?.[0].agencyId as string,
      campaignType: 1,
      duration: data.duration,
      numberOfTargetUser: data.numberOfTargetUser,
      ppc_Price: data.ppc_Price,
      bookId: data.bookId,
    }

    localStorage.setItem('checkoutAdsData', JSON.stringify(formData))
    checkoutRelevantAds.mutate(formCheckoutData)
  }
  return (
    <div className="mx-4">
      <MetaData title={'Advertisement'} />
      {<Breadcrumb items={breadcrumb} className="max-w-7xl py-4" />}
      <div className="flex items-start justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator className="mt-4" />
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl">Advertisement Recommend</AccordionTrigger>
            <AccordionContent>
              <div>
                <p className="text-md inline-flex items-start italic">
                  Helps increase product visibility in sections such as
                  <p className="ml-1 mr-1 font-medium">
                    Today&apos;s Suggestions, Similar Products and You May Also Like
                  </p>
                  of BConnect.
                </p>
                <Form {...formRelevant}>
                  <form onSubmit={formRelevant.handleSubmit(onSubmitRelevant)}>
                    <FormField
                      control={formRelevant.control}
                      name="numberOfTargetUser"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-start gap-2">
                          <FormLabel className="w-40 text-right">Number Of Target User</FormLabel>
                          <Input className="w-48" placeholder="100" {...field} />
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formRelevant.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center">
                          <FormLabel className="w-40 text-right">Duration</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  role="combobox"
                                  className={cn(
                                    'ml-2 w-48 justify-between border bg-white text-gray-400 hover:text-white',
                                    !field.value && 'text-muted-foreground',
                                  )}
                                >
                                  {field.value
                                    ? typeDuration.find((type) => type.value === field.value)?.label
                                    : 'Select duration'}
                                  <SortAscIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className=" p-0">
                              <Command>
                                <CommandInput placeholder="Search framework..." className="h-9" />
                                <CommandEmpty>No framework found.</CommandEmpty>
                                <CommandGroup>
                                  {typeDuration.map((type) => (
                                    <CommandItem
                                      value={type.label}
                                      key={type.value}
                                      onSelect={() => {
                                        formRelevant.setValue('duration', type.value as Duration)
                                      }}
                                    >
                                      {type.label}
                                      <CheckIcon
                                        className={cn(
                                          'ml-auto h-4 w-4',
                                          type.value === field.value ? 'opacity-100' : 'opacity-0',
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formRelevant.control}
                      name="ppc_Price"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-start gap-2">
                          <FormLabel className="w-40 text-right">PPC_Price</FormLabel>
                          <Input className="w-48" placeholder="ppc_Price" {...field} />
                          <FormDescription />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formRelevant.control}
                      name="bookId"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-start gap-2">
                          <FormLabel className="w-40 text-right">BookId</FormLabel>
                          <Input className="w-48" placeholder="uuid" {...field} />
                        </FormItem>
                      )}
                    />
                    <Button disabled={checkoutRelevantAds.isLoading} className="my-2 ml-[16.8rem]" type="submit">
                      {checkoutRelevantAds.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''} Checkout
                    </Button>
                  </form>
                </Form>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
export default AdvertisementPage
