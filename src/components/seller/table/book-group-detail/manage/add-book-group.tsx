import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'src/components/ui/use-toast'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog'
import { Button } from 'src/components/ui/button'
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from 'src/components/ui/form'
import { Textarea } from 'src/components/ui/text-area'
import { bookGroupSchema } from './validation'
import { addBookToBookGroup } from 'src/api/books/post-add-book'

type FormData = z.infer<typeof bookGroupSchema>

export function AddBookGroup() {
  const queryClient = useQueryClient()
  const form = useForm<FormData>({
    resolver: zodResolver(bookGroupSchema),
  })

  const { mutate: addBookGroup } = useMutation({
    mutationFn: (data: FormData) => {
      return addBookToBookGroup(data)
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
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Book</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="bg-gray-100 px-12 pb-16 pt-8">
                  <div className="mx-4">
                    <FormField
                      control={form.control}
                      name="productId"
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
                <div className="fixed bottom-0 flex-grow border-t-2 bg-orange-50 text-right">
                  <div className="w-[90rem]">
                    <Button className="my-2 mr-8 w-32" type="submit">
                      Cancel
                    </Button>
                    <Button className="my-2 mr-96 w-32" type="submit">
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
