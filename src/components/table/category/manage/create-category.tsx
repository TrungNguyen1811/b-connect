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
import { Loader2 } from 'lucide-react'

export const IMG_MAX_LIMIT = 5
type CategoryFormValues = z.infer<typeof CategorySchema>

export function CreateCategoryForm() {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(CategorySchema),
  })

  const queryClient = useQueryClient()

  const addCategory = useMutation({
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
    addCategory.mutate(data)
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
                <Button disabled={addCategory.isLoading} className="text-xs md:text-sm" type="submit">
                  {addCategory.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''} Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
