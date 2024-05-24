import { faker } from '@faker-js/faker'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { postCheckoutAds } from 'src/api/advertisement/post-checkout-ads'
import AdvertisementTable from 'src/components/admin/advertisement/ads-table'
import Breadcrumb from 'src/components/breadcrumb/breadcrumb'
import { IBreadcrumb } from 'src/components/breadcrumb/type'
import MetaData from 'src/components/metadata'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'src/components/ui/accordion'
import { Button } from 'src/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog'
import { Form, FormField, FormItem, FormLabel } from 'src/components/ui/form'
import { Heading } from 'src/components/ui/heading'
import { Input } from 'src/components/ui/input'
import { Separator } from 'src/components/ui/separator'
import { toast } from 'src/components/ui/use-toast'
import { ICheckoutAds } from 'src/types/advertisement'
import { z } from 'zod'

const displaySchema = z.object({
  displayBid: z.coerce.number().min(0),
  bannerImg: z.any(),
  bannerTitle: z.string(),
  agencyId: z.string(),
})

type FormDisplayData = z.infer<typeof displaySchema>
function AdvertisementAdminPage() {
  const title = `Advertisement`
  const description = 'Create ads to let users know more about your store'
  const breadcrumb = useMemo<IBreadcrumb[]>(() => {
    return [
      {
        label: 'DashBoard',
        key: 'dashboard',
        href: '/admin/dashboard',
        icon: 'dashboard',
      },
      {
        key: 'advertisement',
        label: 'Advertisement',
      },
    ]
  }, [])

  const [bid, setBid] = useState<number>()

  useEffect(() => {
    form.setValue('displayBid', bid as number)
  }, [bid])

  const Confirm = ({ displayBid }: { displayBid: number }) => {
    return (
      <div className="mt-4 px-4">
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
      agencyId: data.agencyId as string,
      bannerTitle: data.bannerTitle,
    }

    const base64String = await fileToBase64(data.bannerImg)
    const base64Data = base64String.split(',')[1]

    formData.bannerImg = base64Data

    localStorage.setItem('checkoutAdsData', JSON.stringify(formData))
    checkoutAds(formData)
  }

  return (
    <div className="mx-8 w-full">
      <MetaData title={'Advertisement'} />
      {<Breadcrumb items={breadcrumb} className="max-w-7xl py-4" />}
      <div className="flex items-start justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator className="mt-4" />
      <div>
        <AdvertisementTable />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl">Advertisement Banner</AccordionTrigger>
            <AccordionContent>
              <div className="w-full">
                <div className="mr-24">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                        control={form.control}
                        name="agencyId"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-start gap-2">
                            <FormLabel className=" w-24">Seller Id</FormLabel>
                            <Input className="w-80" placeholder="Seller Id" {...field} />
                          </FormItem>
                        )}
                      />
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
export default AdvertisementAdminPage
