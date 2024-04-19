import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Separator } from 'src/components/ui/separator'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'src/components/ui/resizable'
import { Avatar, AvatarImage } from 'src/components/ui/avatar'
import { User } from 'src/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'src/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { updateUserProfileApi } from 'src/api/user/post-user'
import { getUserById } from 'src/api/user/get-user'

const formSchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  avatarDir: z.any().optional(),
})

type FormData = z.infer<typeof formSchema>

function InfoAccount() {
  const { user } = useAuth()
  console.log(user)
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
      avatarDir: user?.avatarDir,
    },
  })
  const queryClient = useQueryClient()
  const [users, setUser] = useState<User | undefined>(undefined)
  const token = localStorage.getItem('token') as string
  const fetchDataAndUpdateForm = async () => {
    try {
      const userData = await getUserById(user?.userId as string)
      if (userData) {
        setUser(userData)
        form.reset(userData)
        toast({
          title: 'Success',
          variant: 'success',
        })
      } else {
        toast({
          title: 'Invalid users response',
          description: 'No users ID in the response.',
        })
      }
    } catch (error) {
      toast({
        title: 'Error users detail',
      })
    }
  }

  useEffect(() => {
    fetchDataAndUpdateForm()
  }, [])

  const { mutate: updateUser } = useMutation((updateUser: User) => updateUserProfileApi(updateUser), {
    onSuccess: (updateUser) => {
      toast({
        title: 'Successful!!',
        description: 'Update User Success',
      })
      setUser(updateUser)
      queryClient.invalidateQueries()
    },
    onError: () => {
      toast({
        title: 'Error updating users',
      })
    },
  })

  const onSubmit = async (data: FormData) => {
    const updatedData: User = {
      userId: user?.userId ?? '',
      username: data.username ?? '',
      email: data.email ?? '',
      phone: data.phone ?? '',
      avatarDir: data.avatarDir ?? '',
    }
    updateUser(updatedData)
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <ResizablePanelGroup direction="horizontal" className="max-w-6xl rounded-lg border-b">
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
                          <Input disabled className="w-full px-3 py-2" placeholder="Enter your email" {...field} />
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
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={40}>
                <div className="flex h-[200px] flex-col items-center p-6 pt-24">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={users?.avatarDir as string} className="" />
                  </Avatar>
                  <FormField
                    control={form.control}
                    name="avatarDir"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2">Avatar User</FormLabel>
                        <FormControl>
                          <Input
                            className="py-0"
                            type="file"
                            accept="image/*"
                            onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                          />
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
