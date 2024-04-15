import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'src/components/ui/use-toast'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog'
import { Button } from 'src/components/ui/button'
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { Textarea } from 'src/components/ui/text-area'
import { bookGroupSchema } from './validation'
import { postAddBookGroup } from 'src/api/books/post-add-book'

type FormData = z.infer<typeof bookGroupSchema>

export function AddBookGroup() {
  const queryClient = useQueryClient()
  const form = useForm<FormData>({
    resolver: zodResolver(bookGroupSchema),
  })

  const { mutate: addBookGroup } = useMutation({
    mutationFn: (updatedData: FormData) => {
      return postAddBookGroup(updatedData)
    },
    onSuccess: () => {
      toast({
        title: 'Successful!!',
        description: 'Add Book Group Success',
      })
      // setBookGroup(updatedBookGroup)
      queryClient.invalidateQueries()
    },
    onError: () => {
      toast({
        title: 'Error add book group',
      })
    },
  })

  const onSubmit = (data: FormData) => {
    addBookGroup(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Book Group</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50rem]">
        <DialogHeader>
          <DialogTitle>Add Book Group</DialogTitle>
        </DialogHeader>
        <div className=" flex  items-center space-x-2">
          <div className=" grid flex-1 gap-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="rounded-sm bg-gray-100 px-2 pt-2">
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
                  <div className=" flex flex-row items-center">
                    <Button className="my-2 ml-40 mr-2 w-16" type="submit">
                      Cancel
                    </Button>
                    <Button className="my-2 w-16" type="submit">
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
