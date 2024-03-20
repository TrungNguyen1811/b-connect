import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { UpdateAgency } from 'src/api/agency/put-agency'
import { ProfileShopSchema } from 'src/components/seller/schema/profile-shop'
import { Avatar, AvatarImage } from 'src/components/ui/avatar'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group'
import { Separator } from 'src/components/ui/separator'
import { Textarea } from 'src/components/ui/text-area'
import { toast } from 'src/components/ui/use-toast'
import { useAuth } from 'src/hooks/useAuth'
import { IAgency } from 'src/types/agency'

type FormData = Zod.infer<typeof ProfileShopSchema>
function ProfileSeller() {
  const { user } = useAuth()
  const [isEdit, setIsEdit] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const agency = user?.agencies?.[0]
  console.log('agency', agency)
  const form = useForm<FormData>({
    resolver: zodResolver(ProfileShopSchema),
    defaultValues: {
      agencyName: agency?.agencyName || '',
      logoImg: agency?.logoUrl,
      businessType: agency?.businessType,
      postAddress: agency?.postAddressId,
    },
  })

  const onSubmit = async (data: FormData) => {
    console.log('submit', data)
    setIsLoading(true)
    const formData: IAgency = {
      ...data,
      ownerId: user?.userId,
      agencyId: agency?.agencyId,
      logoImg: data.logoImg as File,
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
                  <FormField
                    control={form.control}
                    name="postAddress"
                    render={({ field }) => (
                      <FormItem className="my-4 flex flex-row items-baseline">
                        <FormLabel className="w-36 text-right">Address</FormLabel>
                        <FormControl className="ml-8">
                          <Textarea className="h-24" disabled={isLoading} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
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
                <Button className="mr-4">View My Shop</Button>
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
                <p className="ml-8">{agency?.postAddressId}</p>
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
