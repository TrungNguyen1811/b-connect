import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { postChangePasswordApi } from 'src/api/user/post-user'
import { Button } from 'src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { toast } from 'src/components/ui/use-toast'
import { useAuth } from 'src/hooks/useAuth'
import { z } from 'zod'

export interface IChangePassword {
  email: string
  currentPassword: string
  confirmPassword: string
  newPassword: string
}

const formSchemaPassword = z
  .object({
    currentPassword: z.string(),
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

type FormData = z.infer<typeof formSchemaPassword>

function ChangePassword() {
  const formPassword = useForm<FormData>({
    resolver: zodResolver(formSchemaPassword),
  })
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const changePassword = useMutation((data: IChangePassword) => postChangePasswordApi(data), {
    onSuccess: (data) => {
      if (data == 1) {
        toast({
          title: 'Change Password Successful',
        })
        logout()
        navigate('/login')
      } else if (data == 0) {
        toast({
          title: 'Change Password Failed',
        })
      }
    },
    onError: (error: any) => {
      toast({
        title: 'Error when handle action change password',
      })
    },
  })
  const onSubmitPassword = (data: FormData) => {
    const formData: IChangePassword = {
      email: user?.email as string,
      currentPassword: data.currentPassword,
      confirmPassword: data.confirmPassword,
      newPassword: data.newPassword,
    }
    changePassword.mutate(formData)
  }
  return (
    <Card className="justify-center p-4">
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Change your password here. After saving, you will be logged out.</CardDescription>
      </CardHeader>
      <CardContent className="mx-10 space-y-2">
        <Form {...formPassword}>
          <form onSubmit={formPassword.handleSubmit(onSubmitPassword)}>
            <div className="ml-4 flex flex-row items-center">
              <div className="flex w-2/3 flex-col  rounded-md border bg-white px-4 py-8">
                <p className="text-lg font-semibold">Change Password</p>

                <div className="py-2">
                  <FormField
                    control={formPassword.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" mb-2">Currently Password</FormLabel>
                        <FormControl>
                          <Input
                            className=" w-full px-3 py-2"
                            type="password"
                            placeholder="Enter old password"
                            {...field}
                          />
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
                          <Input
                            className=" w-full px-3 py-2"
                            type="password"
                            placeholder="Enter confirm password"
                            {...field}
                          />
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
                          <Input
                            className=" w-full px-3 py-2"
                            type="password"
                            placeholder="Enter new password"
                            {...field}
                          />
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
                  address in order to enable this. Please note that email login is in addition to social login rather
                  than a replacement for it, so your authenticated social account will continue to be linked to your
                  account.
                </p>
              </div>
            </div>
            <Button type="submit" className="mx-4 my-4 px-8 py-2  ">
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
export default ChangePassword
