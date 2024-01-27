import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Separator } from 'src/components/ui/separator'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'src/components/ui/resizable'
import { Avatar, AvatarImage } from 'src/components/ui/avatar'
// import { useEffect, useState } from 'react'
// import { User } from 'src/types'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { toast } from 'src/components/ui/use-toast'

const formSchema = z.object({
  username: z.string(),
  email: z.string(),
  phone: z.string(),
  Address: z.string(),
  avatar: z.string(),
})

// type FormData = z.infer<typeof formSchema>

function InfoAccount() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  // const queryClient = useQueryClient()
  // const [user, setUser] = useState<User | undefined>(undefined)

  // const fetchDataAndUpdateForm = async () => {
  //   try {
  //     const fetchedUser = await getUserApi(user?.userId)
  //     if (fetchedUser && fetchedUser.userId) {
  //       setUser(fetchedUser)
  //       form.reset(fetchedUser)
  //     } else {
  //       toast({
  //         title: 'Invalid user response',
  //         description: 'No user ID in the response.',
  //       })
  //     }
  //   } catch (error) {
  //     toast({
  //       title: 'Error user detail',
  //     })
  //   }
  // }

  // useEffect(() => {
  //   fetchDataAndUpdateForm()
  // }, [user?.userId])

  // const { mutate: updateUser } = useMutation(
  //   (updateUser: Partial<User>) => updateUserApi(user?.userId, updateUser as User),
  //   {
  //     onSuccess: (updateUser) => {
  //       toast({
  //         title: 'Successful!!',
  //         description: 'Update User Success',
  //       })
  //       setUser(updateUser)
  //       queryClient.invalidateQueries()
  //     },
  //     onError: () => {
  //       toast({
  //         title: 'Error updating user',
  //       })
  //     },
  //   },
  // )
  const onSubmit = (data: FormData) => {
    // Xử lý logic cập nhật thông tin người dùng
    // const updatedData: Partial<User> = {}
    // if (data.email !== user?.email) {
    //   updatedData.email = data.email
    // }
    // if (data.phone !== user?.phone) {
    //   updatedData.phone = data.phone
    // }
    // updateUser(updatedData)
  }

  return (
    <div className="w-[75vw] rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="px-8 py-2">
        <p className="text-xl">My Profile</p>
        <p className="text-gray-500">Manage and protect your account</p>
      </div>
      <Separator />
      <div>
        <Form {...form}>
          {/* <form onSubmit={form.handleSubmit(onSubmit)} className=""> */}
          <form className="">
            <ResizablePanelGroup direction="horizontal" className="max-w-6xl rounded-lg border">
              <ResizablePanel defaultSize={60}>
                <div className="flex h-[500px] flex-col p-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" mb-2">Username</FormLabel>
                        <FormControl>
                          <Input className=" w-full px-3 py-2 " placeholder="Enter your username" {...field} />
                        </FormControl>
                        <FormDescription className=" mt-1">This is your public display name.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" mb-2">Email</FormLabel>
                        <FormControl>
                          <Input className=" w-full px-3 py-2 " placeholder="Enter your email" {...field} />
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
                        <FormLabel className="mb-2">Phone Number</FormLabel>
                        <FormControl>
                          <Input className=" w-full px-3 py-2" placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2">Address</FormLabel>
                        <FormControl>
                          <Input
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                            placeholder="Enter your address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={40}>
                <div className="flex h-[200px] flex-col items-center p-6 pt-24">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://down-vn.img.susercontent.com/file/sg-11134004-7qvg8-limw3k5iiy5v7e_tn"></AvatarImage>
                  </Avatar>
                  <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2">Avatar User</FormLabel>
                        <FormControl>
                          <Input className="py-0" type="file" accept="image/*" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className=" mt-5 px-4 py-2  ">
                    Save
                  </Button>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </form>
        </Form>
      </div>
    </div>
  )
}
export default InfoAccount
