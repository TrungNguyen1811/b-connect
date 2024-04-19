import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { IListReplyResponse, IReply } from 'src/types'
import { z } from 'zod'
import { toast } from 'src/components/ui/use-toast'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog'
import { Button } from 'src/components/ui/button'
import { Form, FormItem, FormLabel, FormControl, FormField } from 'src/components/ui/form'
import { Textarea } from 'src/components/ui/text-area'
import { replySchema } from './validation'
import { useAuth } from 'src/hooks/useAuth'
import { replyReview } from 'src/api/review/post-rating-review'

type FormData = z.infer<typeof replySchema>

export function ReplyCustomer({ data }: { data: IListReplyResponse }) {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const form = useForm<FormData>({
    resolver: zodResolver(replySchema),
  })

  const { mutate: updateBookGroup } = useMutation({
    mutationFn: (updatedData: FormData) => {
      const formData: IReply = {
        replyText: updatedData.ReplyText,
        ratingRecordId: data.ratingRecordId,
        agencyId: user?.agencies?.[0]?.agencyId as string,
      }
      return replyReview(formData)
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

  const onSubmit = (data: FormData) => {
    updateBookGroup(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Reply</Button>
      </DialogTrigger>
      <DialogContent className="w-[50vw]">
        <DialogHeader>
          <DialogTitle>Reply</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className=" bg-gray-100">
                  <div className="mx-4">
                    <FormField
                      control={form.control}
                      name="ReplyText"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center">
                          <FormLabel className="w-40 pr-2 text-right">Reply</FormLabel>
                          <FormControl>
                            <Textarea
                              className="h-40 bg-orange-50"
                              placeholder="Show more detail about bookGroup"
                              {...field}
                            />
                          </FormControl>
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
