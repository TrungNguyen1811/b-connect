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
import { Loader2 } from 'lucide-react'
import { IReportUser } from 'src/types/user'
import { ISetTradeStatus, postReportUserPostTrade, putSetTradeStatus } from 'src/api/blog/interested'

const formSchema = z.object({
  reason: z.string(),
  video: z.any(),
})
type FormData = z.infer<typeof formSchema>
interface Props {
  tradeDetailsId: string
  postId: string
}

function ReportTrade({ tradeDetailsId, postId }: Props) {
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

  const reportUser = useMutation((formData: IReportUser) => postReportUserPostTrade(formData), {
    onSuccess: (formData) => {
      if (formData) {
        toast({
          title: 'Success',
          description: 'Report User Success!!!',
        })
        queryClient.invalidateQueries()
        setOpen(false)
      } else {
        toast({
          title: 'Failed',
          description: 'Report User Failed!!!',
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Report User',
        description: error.message,
      })
    },
  })

  const onSubmit = async (data: FormData) => {
    const formData: IReportUser = {
      tradeDetailsId: tradeDetailsId as string,
      reason: data.reason,
      video: data.video,
    }
    putStatusTrade(tradeDetailsId as string, 7)
    reportUser.mutate(formData)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex">
        <Button>Report</Button>
      </DialogTrigger>
      <DialogContent className="h-[20rem] w-[36rem]">
        <DialogHeader className="font-semibold">Report</DialogHeader>
        <div className="flex flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-4">Reason</FormLabel>
                    <FormControl>
                      <Input placeholder="Reason..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="video"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2">Video</FormLabel>
                    <FormControl>
                      <Input
                        className="py-0"
                        type="file"
                        accept="video/*"
                        onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={reportUser.isLoading} className="mt-4 w-full">
                {reportUser.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''} Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default ReportTrade
