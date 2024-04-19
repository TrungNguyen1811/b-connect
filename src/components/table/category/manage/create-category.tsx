import { z } from 'zod'
import { CategorySchema } from './validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { Button } from 'src/components/ui/button'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from 'src/components/ui/dialog'
import { toast } from 'src/components/ui/use-toast'
import { postCategoryApi } from 'src/api/categories/post-categogy'

export const IMG_MAX_LIMIT = 5
type CategoryFormValues = z.infer<typeof CategorySchema>

export function CreateCategoryForm() {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CategorySchema),
  })

  const queryClient = useQueryClient()

  const { mutate: addCategory } = useMutation({
    mutationFn: (data: CategoryFormValues) => {
      const formData = {
        ...data,
        imageDir: data.imageDir,
      }
      return postCategoryApi(formData)
    },
    onSuccess: (data) => {
      if (data) {
        toast({
          title: 'Success',
          description: 'Add Category Success!!!',
        })
        queryClient.invalidateQueries()
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
    addCategory(data)
  }

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
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="cateName"
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
                name="imageDir"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0] || null)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-4">
                <Button type="submit" className="text-xs md:text-sm">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
