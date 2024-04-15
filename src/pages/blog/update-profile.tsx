import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Avatar, AvatarImage } from '../../components/ui/avatar'
import { useAuth } from 'src/hooks/useAuth'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { User } from 'src/types'
import { toast } from '../../components/ui/use-toast'
import { getUserById } from 'src/api/user/get-user'
import { updateUserProfileApi } from 'src/api/user/post-user'

const formSchema = z.object({
  username: z.string(),
  email: z.string(),
  addressId: z.string(),
  avatarDir: z.string(),
  fullName: z.string(),
  url: z.string(),
  bio: z.string(),
})

interface IChangePassword {
  oldPassword: string
  confirmPassword: string
  newPassword: string
}
const formSchemaPassword = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

type FormData = z.infer<typeof formSchema>
type FormPassWordData = z.infer<typeof formSchemaPassword>

function UpdateProfile() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [userDetail, setUserDetail] = useState<User | undefined>(undefined)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: userDetail?.username || '',
      email: userDetail?.email || '',
      addressId: userDetail?.addressId || '',
      avatarDir: userDetail?.avatarDir as string,
      fullName: userDetail?.fullName || '',
      url: userDetail?.url || '',
      bio: userDetail?.bio || '',
    },
  })

  const { mutate: updatedUser } = useMutation(
    (updatedData: Partial<User>) => updateUserProfileApi(updatedData as User),
    {
      onSuccess: (updatedUser) => {
        if (updatedUser) {
          toast({
            title: 'Successful!!',
            description: 'Update User Success',
          })
          setUserDetail(updatedUser)
          queryClient.invalidateQueries()
        } else {
          // Handle the case where updatedUser is undefined
        }
      },
      onError: () => {
        toast({
          title: 'Error updating user',
        })
      },
    },
  )

  const fetchDataAndUpdateForm = async () => {
    try {
      const fetchedUser: any = await getUserById(user?.userId as string)
      if (fetchedUser && fetchedUser.userId) {
        setUserDetail(fetchedUser)
        // Reset the form with the fetched data
        form.reset(fetchedUser)
      } else {
        toast({
          title: 'Invalid category response',
          description: 'No category ID in the response.',
        })
      }
    } catch (error) {
      toast({
        title: 'Error category detail',
      })
    }
  }
  useEffect(() => {
    fetchDataAndUpdateForm()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.userId])

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const updatedData: Partial<User> = {}
    Object.keys(data).forEach((key) => {
      if (data[key as keyof typeof data] !== userDetail?.[key as keyof User]) {
        updatedData[key as keyof typeof data] = data[key as keyof typeof data]
      }
    })
    updatedUser(updatedData)
  }

  const formPassword = useForm<FormPassWordData>({
    resolver: zodResolver(formSchemaPassword),
  })

  const onSubmitPassword = (data: IChangePassword) => {
    //
  }
  return (
    <div className="mx-36">
      <div>
        <p className="mt-8 text-2xl font-bold">
          Update Profile{' '}
          {
            <Link
              className="text-blue-600 transition-colors duration-300 hover:text-blue-800"
              to={`/blog/profile/${user?.username}`}
            >
              @{user?.username}
            </Link>
          }
        </p>
      </div>
      <Form {...form}>
        {/* <form onSubmit={form.handleSubmit(onSubmit)}> */}
        <form>
          <div className="mt-8 flex flex-row justify-between">
            <div className="mx-4 mb-8 flex w-1/2 flex-col rounded-md border border-2 bg-orange-100 px-4 py-8">
              <p className="text-lg font-semibold">User</p>
              <div className="py-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="py-2">
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
              </div>
              <div className="py-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" mb-2">Username</FormLabel>
                      <FormControl>
                        <Input className=" w-full px-3 py-2 " placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col items-start py-2">
                <FormLabel className="mb-2">Avatar User</FormLabel>
                <div className="flex flex-row items-center">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://down-vn.img.susercontent.com/file/sg-11134004-7qvg8-limw3k5iiy5v7e_tn"></AvatarImage>
                  </Avatar>
                  <FormField
                    control={form.control}
                    name="avatarDir"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="mx-4 mb-8 flex w-1/2 flex-col rounded-md border border-2 bg-orange-100 px-4 py-8">
              <p className="text-lg font-semibold">Basic</p>
              <div className="py-2">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" mb-2">Website URL</FormLabel>
                      <FormControl>
                        <Input className=" w-full px-3 py-2 " placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="py-2">
                <FormField
                  control={form.control}
                  name="addressId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" mb-2">Address</FormLabel>
                      <FormControl>
                        <Input className=" w-full px-3 py-2 " placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="py-2">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" mb-2">Bio</FormLabel>
                      <FormControl>
                        <Input className=" w-full px-3 py-2 " placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="mx-6 my-4 mb-16 px-8">
            Save
          </Button>
        </form>
      </Form>
      <div>
        <Form {...formPassword}>
          <form>
            <div className="ml-4 flex flex-row items-center">
              <div className="flex w-2/3 flex-col  rounded-md border border-2 bg-orange-100 px-4 py-8">
                <p className="text-lg font-semibold">Change Password</p>

                {/* <form onSubmit={formPassword.handleSubmit(onSubmitPassword)}> */}
                <div className="py-2">
                  <FormField
                    control={formPassword.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" mb-2">Currently Password</FormLabel>
                        <FormControl>
                          <Input className=" w-full px-3 py-2 " placeholder="Enter your username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-2">
                  <FormField
                    control={formPassword.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" mb-2">Confirm Password</FormLabel>
                        <FormControl>
                          <Input className=" w-full px-3 py-2 " placeholder="Enter your username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-2">
                  <FormField
                    control={formPassword.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" mb-2">New Password</FormLabel>
                        <FormControl>
                          <Input className=" w-full px-3 py-2 " placeholder="Enter your username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="m-8 w-1/3">
                <p className="font-bold">Note</p>
                <p className="">
                  If your account was created using social account authentication, you may prefer to add an email log
                  in. If you signed up with a social media account, please reset the password for your primary email
                  address (trung4atlam@gmail.com) in order to enable this. Please note that email login is in addition
                  to social login rather than a replacement for it, so your authenticated social account will continue
                  to be linked to your account.
                </p>
              </div>
            </div>
            <Button type="submit" className="mx-4 my-4 px-8 py-2  ">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
export default UpdateProfile
