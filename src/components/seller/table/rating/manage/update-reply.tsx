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
import { updateReplyReview } from 'src/api/review/post-rating-review'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

type FormData = z.infer<typeof replySchema>

export function UpdateReplyCustomer({ data }: { data: IListReplyResponse }) {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const [open, setOpen] = useState<boolean>(false)
  const form = useForm<FormData>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      ReplyText: data.reply.replyText,
    },
  })

  const updateReply = useMutation({
    mutationFn: (updatedData: FormData) => {
      const formData: IReply = {
        replyText: updatedData.ReplyText,
        ReplyId: data.reply.replyId,
        ratingRecordId: data.ratingRecordId,
        agencyId: user?.agencies?.[0]?.agencyId as string,
      }
      return updateReplyReview(formData)
    },
    onSuccess: () => {
      toast({
        title: 'Successful!!',
        description: 'Reply Success',
      })
      setOpen(false)
      queryClient.invalidateQueries()
    },
    onError: () => {
      toast({
        title: 'Error updating reply',
      })
    },
  })

  const onSubmit = (data: FormData) => {
    updateReply.mutate(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Reply</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reply</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className=" ">
                  <div className="mx-4">
                    <FormField
                      control={form.control}
                      name="ReplyText"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <FormLabel className="pr-2 text-right">Reply</FormLabel>
                          <FormControl>
                            <Textarea className="h-40 bg-orange-50" placeholder="Reply..." {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="bottom-0 flex-grow text-right">
                  <div className="">
                    <Button className="my-2 mr-2" variant={'destructive'} onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button disabled={updateReply.isLoading} className="" type="submit">
                      {updateReply.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''} Submit
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
