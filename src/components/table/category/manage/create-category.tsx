import { z } from 'zod'
import { CategorySchema } from './validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'src/components/ui/use-toast'
import React, { useState } from 'react'
import { Button } from 'src/components/ui/button'
import { useForm } from 'react-hook-form'
import { postCategoryApi } from 'src/api/categories/post-categogy'
import { updateCategoryApi } from 'src/api/categories/update-category'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from 'src/components/ui/dialog'

export const IMG_MAX_LIMIT = 5
type CategoryFormValues = z.infer<typeof CategorySchema>

const addCategory = async (data: CategoryFormValues) => {
  const category = await postCategoryApi(data)
  return category
}

const updateCategory = async (data: CategoryFormValues) => {
  const category = await updateCategoryApi(data)
  return category
}

interface ProductFormProps {
  initialData?: any | null
}
export const CreateCategoryForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false)

  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        description: '',
        img: '',
      }
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CategorySchema),
    defaultValues,
  })

  const { mutate } = useMutation(initialData ? updateCategory : addCategory, {
    onSuccess: (data) => {
      if (data && data._id) {
        console.log('Category ID:', data._id)
        toast({
          title: 'Success',
          description: 'Add Category Success!!!',
        })
      } else {
        toast({
          title: 'Invalid Category Response',
          description: 'No Category ID in the Response',
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Submitting Category',
        description: error.message,
      })
    },
  })
  const onSubmit = (data: CategoryFormValues) => {
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
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Name </FormLabel>
                    <FormControl>
                      <Input placeholder="abc" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Description </FormLabel>
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
                name="img"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <input type="file" name="img" value={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div className="">
            <Button type="submit" className="text-xs md:text-sm">
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
