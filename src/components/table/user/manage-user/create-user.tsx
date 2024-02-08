import { z } from 'zod'
import { UserSchema } from './validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group'
import { Checkbox } from 'src/components/ui/check-box'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'src/components/ui/use-toast'
import { postUserApi } from 'src/api/user/post-user'
import React, { useState } from 'react'
import { Button } from 'src/components/ui/button'
import { TrashIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Separator } from 'src/components/ui/separator'

export const IMG_MAX_LIMIT = 5
type UserFormValues = z.infer<typeof UserSchema>

const createUser = async (data: UserFormValues) => {
  const user = await postUserApi(data)
  return user
}

interface ProductFormProps {
  initialData?: any | null
}
export const CreateUserForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const defaultValues = initialData
    ? initialData
    : {
        username: '',
        email: '',
        role: '',
        address: '',
        blocked: '',
      }
  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues,
  })

  const { mutate } = useMutation(createUser, {
    onSuccess: (data) => {
      if (data && data._id) {
        console.log('User ID:', data.userId)
        toast({
          title: 'Success',
          description: 'Add User Success!!!',
        })
      } else {
        toast({
          title: 'Invalid User Response',
          description: 'No User ID in the Response',
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Submitting User',
        description: error.message,
      })
    },
  })
  const onSubmit = (data: UserFormValues) => {
    mutate(data)
  }

  // const onDelete = async () => {
  //   try {
  //     setLoading(true)
  //     await axiosClient.delete(`/api/${params.storeId}/products/${params.productId}`)
  //     history.go(0)
  //     history.push(`/${params.storeId}/products`)
  //   } catch (error: any) {
  //     console.log(error.message)
  //   } finally {
  //     setLoading(false)
  //     setOpen(false)
  //   }
  // }

  return (
    <>
      <div className="">
        {/* <div> */}
        {/* <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} /> */}
        {/* </div> */}
        {initialData && (
          <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
            <TrashIcon className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form className="" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Email </FormLabel>
                <FormControl>
                  <Input placeholder="abc@gmail.com" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Full Name </FormLabel>
                    <FormControl>
                      <Input placeholder="J.K Rowling" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel> User Name </FormLabel>
                <FormControl>
                  <Input placeholder="J.K Rowling" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Password </FormLabel>
                      <FormControl>
                        <Input placeholder="J.K Rowling" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
          {/* <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Phone </FormLabel>
                    <FormControl>
                      <Input placeholder="0123456789" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Address </FormLabel>
                <FormControl>
                  <Input placeholder="J.K Rowling" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) =>
                      form.setValue('role', value as 'MANAGER' | 'ADMIN' | 'CUSTOMER' | 'SELLER')
                    }
                    defaultValue={field.value}
                    className="flex flex-row justify-between"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="SUPER_ADMIN" />
                      </FormControl>
                      <FormLabel className="font-normal">SUPER ADMIN</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="ADMIN" />
                      </FormControl>
                      <FormLabel className="font-normal">ADMIN</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="BaseUser" />
                      </FormControl>
                      <FormLabel className="font-normal">USER</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="blocked"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blocked</FormLabel>
                <FormControl>
                  <Checkbox checked={field.value ?? false} onCheckedChange={field.onChange} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="space-y-2">
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </div>
    </>
  )
}
