import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IResponseBookGroup } from 'src/types'
import { z } from 'zod'
import { toast } from 'src/components/ui/use-toast'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog'
import { Button } from 'src/components/ui/button'
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Textarea } from 'src/components/ui/text-area'
import { bookGroupSchema } from './validation'
import { getBookGroupById } from 'src/api/books/get-book'
import { putUpdateBookGroup } from 'src/api/books/put-book'

type FormData = z.infer<typeof bookGroupSchema>

export function UpdateBookGroup({ bookGroupId }: { bookGroupId: string }) {
  const queryClient = useQueryClient()
  const [bookGroup, setBookGroup] = useState<IResponseBookGroup | undefined>(undefined)
  const form = useForm<FormData>({
    resolver: zodResolver(bookGroupSchema),
    defaultValues: {
      bookGroupName: bookGroup?.bookGroupName,
      bookGroupImg: bookGroup?.imgDir,
      description: bookGroup?.description,
    },
  })

  const { mutate: updateBookGroup } = useMutation({
    mutationFn: (updatedData: FormData) => {
      const formData = {
        ...updatedData,
        bookGroupId: bookGroupId,
      }
      return putUpdateBookGroup(formData)
    },
    onSuccess: () => {
      toast({
        title: 'Successful!!',
        description: 'Update Category Success',
      })
      // setBookGroup(updatedBookGroup)
      queryClient.invalidateQueries()
    },
    onError: () => {
      toast({
        title: 'Error updating book group',
      })
    },
  })

  const fetchDataAndUpdateForm = async () => {
    try {
      const fetchedBookGroup: IResponseBookGroup = await getBookGroupById(bookGroupId)
      if (fetchedBookGroup && fetchedBookGroup.bookGroupId) {
        setBookGroup(fetchedBookGroup)
        form.reset(fetchedBookGroup)
      } else {
        toast({
          title: 'Invalid book group response',
          description: 'No book group ID in the response.',
        })
      }
    } catch (error) {
      toast({
        title: 'Error book group detail',
      })
    }
  }

  useEffect(() => {
    fetchDataAndUpdateForm()
  }, [bookGroupId])

  const onSubmit = (data: FormData) => {
    updateBookGroup(data)
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
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className=" bg-gray-100 px-12 pb-16 pt-8">
                  <p className="py-2 text-lg font-semibold">Basic Information</p>
                  <div className="mx-4">
                    <FormField
                      control={form.control}
                      name="bookGroupImg"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center">
                          <FormLabel className="w-40 pr-2 text-right">BookGroup Img</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bookGroupName"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center">
                          <FormLabel className="w-40 pr-2 text-right"> Name bookGroup</FormLabel>
                          <FormControl>
                            <Input placeholder="bookGroup name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start">
                          <FormLabel className="w-40 pr-2 text-right"> Description</FormLabel>
                          <FormControl>
                            <Textarea
                              className="h-40 bg-orange-50"
                              placeholder="Show more detail about bookGroup"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="bottom-0 flex-grow text-right">
                  <div className="">
                    <Button className="my-2 mr-2" type="submit">
                      Cancel
                    </Button>
                    <Button className="my-2" type="submit">
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
