'use client'

import * as React from 'react'

import { cn } from 'src/lib/utils'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Facebook, Loader2, Mail } from 'lucide-react'
import { LoginSchema } from 'src/pages/(auth)/login/validation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from 'src/hooks/useAuth'
import { AxiosError } from 'axios'
import { loginApi } from 'src/api/apis/auth/login.api'
import { toast } from '../ui/use-toast'
import { profileApi } from 'src/api/apis/auth/profile.api'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Checkbox } from '../ui/check-box'
import { IToken } from 'src/types/token'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>
type FormData = z.infer<typeof LoginSchema>
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const form = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      remember: false,
    },
  })
  const navigate = useNavigate()

  const { login } = useAuth()
  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    let token: IToken
    let error: AxiosError | null = null
    await loginApi(data, (err, result) => {
      if (err) {
        error = err
        return
      } else {
        toast({
          title: 'Login Success',
          variant: 'success',
        })
        token = result!
        console.log(result)
      }
    })

    if (!error) {
      await profileApi(token!.accessToken, (err, user) => {
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
          toast({
            title: 'Login Success',
            description: 'Welcome to BConnect!!!',
            variant: 'success',
          })
          login({
            user,
            token,
          })
          // if (user.role === ROLE.ADMIN) {
          //   navigate('/admin/dashboard')
          // } else {
          //   navigate('/')
          // }
          navigate('/')
        }
      })
    }
    if (error) {
      toast({
        title: 'Login Failed',
        variant: 'destructive',
      })
    }
    setIsLoading(false)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn('mx-auto mt-10 grid w-[50%] gap-6', className)} {...props}>
      <div className="mb-5 flex flex-col items-start justify-start p-0">
        <p className="opacity-50">LOGIN</p>
        <h4 className="text-4xl font-extrabold">Welcome back</h4>
        <p className="opacity-50">Login to manage your account.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input disabled={isLoading} placeholder="example@mail.com" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input disabled={isLoading} placeholder="*******" type="password" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between text-xs">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                  </FormControl>
                  <FormLabel>Remember me</FormLabel>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link to="/forgot" className="text-primary">
              Forgot password ?
            </Link>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className=" h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button variant="outline" type="button" disabled={isLoading} className="mr-10 w-[10rem]">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Facebook className="mr-2 h-4 w-4" />}{' '}
            Facebook
          </Button>
          <Button variant="outline" type="button" disabled={isLoading} className="w-[10rem]">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />} Email
          </Button>
        </div>
      </Form>
    </div>
  )
}
