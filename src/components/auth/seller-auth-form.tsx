'use client'

import * as React from 'react'

import { cn } from 'src/lib/utils'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/hooks/useAuth'
import { AxiosError } from 'axios'
import { toast } from '../ui/use-toast'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { SetIsAccountValidates } from 'src/api/agency/set-is-account-validated'
import { RegisterAgency } from 'src/api/agency/post-register-agency'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { getUserProfileApi } from 'src/api/apis/auth/profile.api'

const SubscribeSchema = z.object({
  agencyName: z.string().min(3),
  rendezvous: z.string(),
  businessType: z.enum(['Individual', 'Company']),
})

type UserSubscribeFormProps = React.HTMLAttributes<HTMLDivElement>
type FormData = z.infer<typeof SubscribeSchema>
export function SubscribeAgencyForm({ className, ...props }: UserSubscribeFormProps) {
  const { user, login } = useAuth()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const form = useForm<FormData>({
    resolver: zodResolver(SubscribeSchema),
  })
  const navigate = useNavigate()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    const mergedData = {
      ...data,
      ownerId: user?.userId,
    }
    let error: AxiosError | null = null
    if (user?.isValidated === false) {
      await SetIsAccountValidates(user?.userId as string, (err, data) => {
        if (err) {
          error = err
          return
        } else {
          toast({
            title: 'Update validate success',
            description: data,
            variant: 'success',
          })
        }
      })
    }

    if (!error) {
      await RegisterAgency(mergedData, async (err, data) => {
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
            title: 'Register Success',
            description: data,
            variant: 'success',
          })
          await getUserProfileApi((err, user) => {
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
              const token = localStorage.getItem('token') as string
              login({ user, token })
              if (user.isSeller === true || user.isValidated === true) {
                navigate('/seller')
              } else {
                navigate('/')
              }
            }
          })
          //   if (err.isSeller === true || err.isValidated === true) {
          //     navigate('/seller/dashboard')
          //   } else {
          //     navigate('/')
          //   }
          //   navigate('/seller')
        }
      })
    }
    if (error) {
      toast({
        title: 'Register Failed',
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
        <p className="opacity-50">Subscribe Account Agency</p>
        <h4 className="text-4xl font-extrabold">Welcome to BConnect Agency</h4>
        <p className="opacity-50">Subscribe to manage your store.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="agencyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name Shop</FormLabel>
                <FormControl>
                  <Input defaultValue={user?.username} disabled={isLoading} placeholder="Store A" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rendezvous"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup address</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="ABC" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => form.setValue('businessType', value as 'Individual' | 'Company')}
                    defaultValue={field.value}
                  >
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="Individual" />
                      </FormControl>
                      <FormLabel>Individual</FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="Company" />
                      </FormControl>
                      <FormLabel>Company</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4 flex items-center justify-center">
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className=" h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
