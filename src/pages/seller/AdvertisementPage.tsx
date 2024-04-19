import { faker } from '@faker-js/faker'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CheckIcon, SortAscIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getTopBanner } from 'src/api/advertisement/get-top-banner'
import { postCheckoutAds } from 'src/api/advertisement/post-checkout-ads'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'src/components/ui/accordion'
import { Button } from 'src/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from 'src/components/ui/command'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Heading } from 'src/components/ui/heading'
import { Input } from 'src/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover'
import { Separator } from 'src/components/ui/separator'
import { toast } from 'src/components/ui/use-toast'
import { useAuth } from 'src/hooks/useAuth'
import { cn } from 'src/lib/utils'
import { Duration, ICheckoutAds, ITopBanner } from 'src/types/advertisement'
import { z } from 'zod'

const displaySchema = z.object({
  bookId: z.string().optional(),
  displayBid: z.coerce.number().min(0),
  bannerImg: z.any(),
  bannerTitle: z.string(),
})

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
type FormDisplayData = z.infer<typeof displaySchema>
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

  const [banners, setBanners] = useState<ITopBanner[]>()

  useEffect(() => {
    const fetchTopBanner = async () => {
      const banners: ITopBanner[] = (await getTopBanner()) as ITopBanner[]
      setBanners(banners)
    }
    fetchTopBanner()
  }, [])

  const [bid, setBid] = useState<number>()

  useEffect(() => {
    form.setValue('displayBid', bid as number)
  }, [bid])

  const Confirm = ({ displayBid }: { displayBid: number }) => {
    return (
      <div className="ml-80 mt-4 px-4">
        <Dialog>
          <DialogTrigger className="my-2 flex">
            <Button>Checkout</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="pb-4 text-xl font-bold">Confirm your bid displayBid for payment</DialogTitle>
              <Separator />
              <p className="py-2">Your bid: {displayBid}VND</p>
              <DialogDescription className="flex flex-row">
                <Button type="submit" className="mr-4 bg-red-600">
                  Checkout
                </Button>
                <Button>
                  <DialogClose>No, I have a change</DialogClose>
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
  const form = useForm<FormDisplayData>({
    resolver: zodResolver(displaySchema),
  })
  const queryClient = useQueryClient()

  const { mutate: checkoutAds } = useMutation({
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

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const onSubmit = async (data: FormDisplayData) => {
    const formData: ICheckoutAds = {
      transactionId: faker.string.uuid(),
      bannerImg: '',
      campaignType: 0,
      duration: 'week',
      displayBid: data.displayBid,
      agencyId: user?.agencies?.[0].agencyId as string,
      bannerTitle: data.bannerTitle,
      bookId: data.bookId || '',
    }

    const base64String = await fileToBase64(data.bannerImg)
    const base64Data = base64String.split(',')[1]

    formData.bannerImg = base64Data

    localStorage.setItem('checkoutAdsData', JSON.stringify(formData))
    checkoutAds(formData)
  }

  // relevant
  const formRelevant = useForm<FormRelevantData>({
    resolver: zodResolver(relevantSchema),
  })
  const { mutate: checkoutRelevantAds } = useMutation({
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
    checkoutRelevantAds(formCheckoutData)
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
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl">Advertisement Banner</AccordionTrigger>
            <AccordionContent>
              <div className="w-full">
                <p className="text-lg font-semibold">Top 10 stores will have banners displayed next week</p>
                <p className="text-xs italic">Stores outside the top 10 will receive refunds early next week</p>
                <div className="flex flex-row items-start justify-between">
                  <div className="border-1 m-4 border p-4">
                    <tr>
                      <th className="text-md">Title Banner</th>
                      <th className="text-md pl-16">Price</th>
                    </tr>
                    {banners?.map((banner, index) => (
                      <tr key={index}>
                        <td className="text-md font-semibold">{banner.bannerTitle}</td>
                        <td className="pl-16 text-center text-red-600">{banner.price}</td>
                      </tr>
                    ))}
                  </div>
                  <div className="mr-24">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                          control={form.control}
                          name="bannerTitle"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-start gap-2">
                              <FormLabel className=" w-24">Title Banner</FormLabel>
                              <Input className="w-80" placeholder="Tittle Banner" {...field} />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="bannerImg"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-start gap-2">
                              <FormLabel className="w-24">Image Banner</FormLabel>
                              <Input
                                className="w-80"
                                type="file"
                                accept="image/*"
                                onChange={(e) => field.onChange(e.target.files?.[0] || '')}
                              />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="bookId"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-start gap-2">
                              <FormLabel className=" w-24">BookId</FormLabel>
                              <Input className="w-80" placeholder="bid" {...field} />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="displayBid"
                          render={() => (
                            <FormItem className="flex flex-row items-center justify-start gap-2">
                              <FormLabel className=" w-24">Bid</FormLabel>
                              <Input
                                className="w-80"
                                placeholder="bid"
                                value={bid}
                                onChange={(e) => setBid(Number(e.target.value))}
                              />
                            </FormItem>
                          )}
                        />
                        <Confirm displayBid={bid as number} />
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl">Advertisement Recommend</AccordionTrigger>
            <AccordionContent>
              <div>
                <p className="text-md inline-flex items-start italic">
                  Helps increase product visibility in sections such as
                  <p className="mr-1 font-medium">Today&apos;s Suggestions, Similar Products and You May Also Like</p>of
                  BConnect.
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
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    'ml-2 w-48 justify-between bg-white',
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
                    <Button className="ml-40 mt-4 " type="submit">
                      Checkout
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
