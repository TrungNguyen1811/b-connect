import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { ProfileShopSchema } from 'src/components/seller/schema/profile-shop'
import { Avatar, AvatarImage } from 'src/components/ui/avatar'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Separator } from 'src/components/ui/separator'
import { Textarea } from 'src/components/ui/text-area'

type FormData = Zod.infer<typeof ProfileShopSchema>
function ProfileSeller() {
  const [isEdit, setIsEdit] = useState(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const form = useForm<FormData>({
    resolver: zodResolver(ProfileShopSchema),
  })

  //   const onSubmit = async (data: FormData) => {
  //     setIsLoading(true)

  //     // await updateProfileSeller()
  //     setIsLoading(false)
  //     setTimeout(() => {
  //       setIsLoading(false)
  //     }, 3000)
  //   }

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
                {/* <form onSubmit={form.handleSubmit(onSubmit)}> */}
                <form>
                  <FormField
                    control={form.control}
                    name="name"
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
                    name="image"
                    render={({ field }) => (
                      <FormItem className="my-4 flex flex-row items-center">
                        <FormLabel className="w-32 text-right">Logo Shop</FormLabel>
                        <FormLabel className="ml-8">
                          <Avatar className="h-36 w-36">
                            <AvatarImage src="https://scontent.fdad3-5.fna.fbcdn.net/v/t1.6435-9/152548127_1142266502879868_4370024121540699291_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=h46o93PwZ3sAX9oKYRI&_nc_ht=scontent.fdad3-5.fna&oh=00_AfA1QaidP-PACYyZ_lOE_GEICodpH-tyobrtoOu-Wfg1-g&oe=661CE105" />
                          </Avatar>
                        </FormLabel>
                        <FormControl className="ml-2 w-[50%]">
                          <Input type="file" accept="image/*" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-baseline">
                        <FormLabel className="w-36 text-right">Description Shop</FormLabel>
                        <FormControl className="ml-8">
                          <Textarea className="h-24" disabled={isLoading} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="mt-8 flex flex-row">
                    <Button className="ml-40 mr-6 w-20">Save</Button>
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
                <p className="ml-8">a</p>
              </div>
              <div className="flex flex-row py-2">
                <p className="w-36 text-right">Logo Shop</p>
                <p className="ml-8">b</p>
              </div>
              <div className="flex flex-row">
                <p className="w-36 text-right">Description Shop</p>
                <p className="ml-8">c</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default ProfileSeller
