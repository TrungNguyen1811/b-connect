import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Loader } from 'lucide-react'
import { RegisterSchema } from 'src/pages/(auth)/register/validation'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { signUpApi } from 'src/api/apis/auth/sign-up'
import { toast } from '../ui/use-toast'

type FormData = z.infer<typeof RegisterSchema>
function RegisterForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {},
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    await signUpApi(data, (err) => {
      if (err) {
        toast({
          title: 'Error',
          description: err.response?.data.message,
          variant: 'destructive',
        })
        return
      }
      toast({
        title: 'Success',
        description: 'Register successfully',
        variant: 'success',
      })
    })
    setIsLoading(false)
  }

  useEffect(() => {
    form.formState.errors && console.log(form.formState.errors)
  }, [form.formState.errors])
  return (
    <div className="container relative mx-auto flex items-center justify-center ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="md:grid-cols my-12 mt-0 grid grid-cols-1 gap-8">
          {/* <form className="md:grid-cols my-12 mt-0 grid grid-cols-1 gap-8"> */}
          <div className="mx-auto w-full max-w-sm space-y-4">
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Email </FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} type="email" placeholder="example@mail.com" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Username </FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="usename123" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <div className="flex gap-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Full Name </FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="Full name" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Phone number </FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="+84 1234567890" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Password </FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="*******" type="password" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Confirm Password </FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="*******" type="password" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-full">
            <Button disabled={isLoading} variant="default" type="submit" className="w-full">
              {isLoading && <Loader className="mr-2 h-5 w-5 animate-spin" />}
              Register
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default RegisterForm
