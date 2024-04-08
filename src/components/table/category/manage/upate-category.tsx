import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ICategory } from 'src/types'
import { z } from 'zod'
import { UpdateCategorySchema } from './validation'
import { toast } from 'src/components/ui/use-toast'
import { updateCategoryApi } from 'src/api/categories/update-category'
import { getCategoryById } from 'src/api/categories/get-category'
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from 'src/components/ui/dialog'
import { Button } from 'src/components/ui/button'
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'

type FormData = z.infer<typeof UpdateCategorySchema>

export function UpdateCategory({ categoryId }: { categoryId: string }) {
  const queryClient = useQueryClient()
  const [category, setCategory] = useState<ICategory | undefined>(undefined)

  const form = useForm<FormData>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: {
      cateName: category?.cateName || '',
      description: category?.description || '',
      //   imageDir: category?.imageDir || '',
    },
  })

  const { mutate: updateCategory } = useMutation({
    mutationFn: (updatedData: FormData) => {
      const formData = {
        ...updatedData,
        imageDir: updatedData.image,
      }
      return updateCategoryApi(categoryId, formData)
    },
    onSuccess: (updatedCategory) => {
      toast({
        title: 'Successful!!',
        description: 'Update Category Success',
      })
      setCategory(updatedCategory)
      queryClient.invalidateQueries()
    },
    onError: () => {
      toast({
        title: 'Error updating category',
      })
    },
  })

  const fetchDataAndUpdateForm = async () => {
    try {
      const fetchedCategory: ICategory = await getCategoryById(categoryId)
      if (fetchedCategory && fetchedCategory.cateId) {
        setCategory(fetchedCategory)
        form.reset(fetchedCategory)
      } else {
        toast({
          title: 'Invalid category response',
          description: 'No category ID in the response.',
        })
      }
    } catch (error) {
      toast({
        title: 'Error category detail',
      })
    }
  }

  useEffect(() => {
    fetchDataAndUpdateForm()
  }, [categoryId]) // Add key as dependency

  const onSubmit = (data: FormData) => {
    const updatedData: Partial<FormData> = {}

    updatedData.cateName = data.cateName as string
    updatedData.description = data.description as string
    updatedData.image = data.image as File

    console.log('data.image', data.image as File)

    updateCategory(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="m-4 mx-auto w-full max-w-sm space-y-4 rounded-lg border border-gray-200 p-4"
              >
                <FormField
                  control={form.control}
                  name="cateName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Name </FormLabel>
                      <FormControl>
                        <Input defaultValue={category?.cateName} {...field} />
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
                        <Input defaultValue={category?.description} {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Image </FormLabel>
                      <FormLabel>
                        <img width="50px" src={category?.imageDir as string} />
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <DialogFooter className="sm:justify-start">
                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                    <DialogClose>Close</DialogClose>
                  </DialogFooter>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
