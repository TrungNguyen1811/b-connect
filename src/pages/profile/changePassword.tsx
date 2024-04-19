import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from 'src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'src/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { z } from 'zod'

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

type FormData = z.infer<typeof formSchemaPassword>

function ChangePassword() {
  const formPassword = useForm<FormData>({
    resolver: zodResolver(formSchemaPassword),
  })

  const onSubmitPassword = (data: IChangePassword) => {
    //
  }
  return (
    <Card className="justify-center p-4">
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Change your password here. After saving, you will be logged out.</CardDescription>
      </CardHeader>
      <CardContent className="mx-10 space-y-2">
        <Form {...formPassword}>
          <form>
            <div className="ml-4 flex flex-row items-center">
              <div className="flex w-2/3 flex-col  rounded-md border border-2 bg-white px-4 py-8">
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
