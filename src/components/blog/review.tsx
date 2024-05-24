import { Dialog, DialogContent, DialogHeader, DialogTrigger } from 'src/components/ui/dialog'
import { Button } from '../ui/button'
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from 'src/components/ui/form'
import { Input } from '../ui/input'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { ISetTradeStatus, postRateUserPostTrade, putSetTradeStatus } from 'src/api/blog/interested'
import { Textarea } from '../ui/text-area'
import { IReviewUser } from 'src/types/user'

const formSchema = z.object({
  comment: z.string(),
  ratingPoint: z.string(),
})
type FormData = z.infer<typeof formSchema>
interface Props {
  tradeDetailsId: string
  revieweeId: string
  postId: string
}

function ReviewTrade({ tradeDetailsId, revieweeId, postId }: Props) {
  const [open, setOpen] = useState<boolean>(false)

  const queryClient = useQueryClient()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const tradeStatus = useMutation((formData: ISetTradeStatus) => putSetTradeStatus(formData), {
    onSuccess: (formData) => {
      if (formData) {
        toast({
          title: 'Success',
          description: 'Accept Trade Information Success!!!',
        })
        queryClient.invalidateQueries()
      } else {
        toast({
          title: 'Failed',
          description: 'Accept Trade Information Failed!!!',
        })
      }
    },
    onError: (error: any) => {
      toast({
        title: 'Error Update User',
        description: error.response.data,
      })
    },
  })

  const putStatusTrade = async (tradeDetailsId: string, status: number) => {
    const data: ISetTradeStatus = {
      postId: postId as string,
      tradeDetailsId: tradeDetailsId,
      updatedStatus: status,
    }
    tradeStatus.mutate(data)
  }

  const reviewUser = useMutation((formData: IReviewUser) => postRateUserPostTrade(formData), {
    onSuccess: (formData) => {
      if (formData) {
        toast({
          title: 'Success',
          description: 'Review User Success!!!',
        })
        queryClient.invalidateQueries()
        setOpen(false)
      } else {
        toast({
          title: 'Failed',
          description: 'Review User Failed!!!',
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Review User',
        description: error.message,
      })
    },
  })

  const onSubmit = async (data: FormData) => {
    const formData: IReviewUser = {
      revieweeId: revieweeId as string,
      tradeDetailsId: tradeDetailsId as string,
      comment: data.comment,
      ratingPoint: data.ratingPoint,
    }
    putStatusTrade(tradeDetailsId as string, 7)
    reviewUser.mutate(formData)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex">
        <Button>Feedback</Button>
      </DialogTrigger>
      <DialogContent className="min-h-[56vh] w-[40vw]">
        <DialogHeader className="mb-2 px-12">
          <p className="text-4xl font-extrabold">Feedback</p>
        </DialogHeader>
        <div className="flex flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="ratingPoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-4">Rating</FormLabel>
                    <FormControl>
                      <Input placeholder="5*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-4">Comment</FormLabel>
                    <FormControl>
                      <Textarea className="h-32" placeholder="ABC..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-4 w-full">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default ReviewTrade
