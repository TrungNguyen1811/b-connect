import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from 'src/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Separator } from 'src/components/ui/separator'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'src/components/ui/resizable'
import { Avatar, AvatarImage } from 'src/components/ui/avatar'
import { IVerifySMS, User } from 'src/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'src/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { postPhoneApi, postVerifyPhoneApi, updateUserProfileApi } from 'src/api/user/post-user'
import { getUserById } from 'src/api/user/get-user'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from 'src/components/ui/dialog'

const formSchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  avatarDir: z.any().optional(),
  phone: z.string().optional(),
})

const phoneSchema = z.object({
  phone: z.string(),
})

const otpSchema = z.object({
  otp: z.string(),
})

type FormData = z.infer<typeof formSchema>
type PhoneData = z.infer<typeof phoneSchema>
type OtpData = z.infer<typeof otpSchema>

function InfoAccount() {
  const { user } = useAuth()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
      avatarDir: user?.avatarDir,
      phone: user?.phone,
    },
  })
  const formPhone = useForm<PhoneData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: user?.phone },
  })
  const formOtp = useForm<OtpData>({
    resolver: zodResolver(otpSchema),
  })

  const queryClient = useQueryClient()
  const [users, setUser] = useState<User | undefined>(undefined)
  const [phoneInput, setPhoneInput] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [call, setRecall] = useState<boolean>(false)

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
  }, [call])

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
      avatarDir: data.avatarDir ?? '',
    }
    updateUser(updatedData)
  }

  const { mutate: updatePhone } = useMutation((phone: string) => postPhoneApi(phone), {
    onSuccess: (data) => {
      toast({
        title: 'Successful!!',
        description: 'Update Phone Success',
      })
      setPhoneInput(data.phone)
      queryClient.invalidateQueries()
    },
    onError: () => {
      toast({
        title: 'Error updating phone',
      })
    },
  })

  const onSubmitPhone = async (data: PhoneData) => {
    const phone = data.phone
    updatePhone(phone)
  }

  const { mutate: updateOtp } = useMutation((otp: IVerifySMS) => postVerifyPhoneApi(otp), {
    onSuccess: (data) => {
      toast({
        title: 'Successful!!',
        description: 'Update Phone Success',
      })
      setOpen(false)
      setRecall((v) => (v ? false : true))
      queryClient.invalidateQueries()
    },
    onError: () => {
      toast({
        title: 'Error updating phone',
      })
    },
  })

  const onSubmitOtp = async (data: OtpData) => {
    const otp: IVerifySMS = { phone: phoneInput, inputOTP: data.otp }
    updateOtp(otp)
  }

  return (
    <div className="w-[75vw] rounded-lg border bg-card text-card-foreground shadow-sm">
      <div>
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
                        <FormItem className="mb-4">
                          <FormLabel className="mb-2">Username</FormLabel>
                          <FormControl>
                            <Input className="w-full px-3 py-2" placeholder="Enter your username" {...field} />
                          </FormControl>
                          <FormDescription className="mt-1">This is your public display name.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel className="mb-2">Email</FormLabel>
                          <FormControl>
                            <Input disabled className="w-full px-3 py-2" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div onClick={() => setOpen(true)}>
                      <FormField
                        control={form.control}
                        name="phone"
                        render={() => (
                          <FormItem>
                            <FormLabel className="mb-2">Phone</FormLabel>
                            <FormControl>
                              <Input className="w-full px-3 py-2" placeholder="Enter your phone" value={users?.phone} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
                    <Button type="submit" className="mt-5 px-4 py-2">
                      Save
                    </Button>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </form>
          </Form>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Phone number</DialogTitle>
              </DialogHeader>
              <div className="">
                <div className="">
                  <Form {...formPhone}>
                    <form onSubmit={formPhone.handleSubmit(onSubmitPhone)} className="">
                      <FormField
                        control={formPhone.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="mb-2">Phone</FormLabel>
                            <FormControl>
                              <Input
                                className="w-full px-3 py-2"
                                placeholder="Enter your phone number for verify."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter className="mt-2">
                        <Button type="submit">Send OTP</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                  <Form {...formOtp}>
                    <form onSubmit={formOtp.handleSubmit(onSubmitOtp)} className="">
                      <FormField
                        control={formOtp.control}
                        name="otp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>OTP</FormLabel>
                            <FormControl>
                              <Input
                                className="w-full px-3 py-2"
                                placeholder="Enter otp to verify your phone number."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter className="mt-2">
                        <Button type="submit">Submit OTP</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
export default InfoAccount
