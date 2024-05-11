import { Dialog, DialogContent, DialogHeader, DialogTrigger } from 'src/components/ui/dialog'
import { Button } from '../ui/button'
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from 'src/components/ui/form'
import { Input } from '../ui/input'
import { z } from 'zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IEvidence } from 'src/types/blog'
import { postEvidenceTrade } from 'src/api/blog/interested'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  deliveryCode: z.string(),
  video: z.any().optional(),
})
type FormData = z.infer<typeof formSchema>

function Evidence({ tradeDetailsId }: { tradeDetailsId: string }) {
  const [open, setOpen] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })
  const postEvidence = useMutation((formData: IEvidence) => postEvidenceTrade(formData), {
    onSuccess: (status) => {
      if (status === 200) {
        toast({
          title: 'Successful!!!',
          description: 'Update Evidence Success!',
        })
        queryClient.invalidateQueries()
        setOpen(false)
      } else {
        toast({
          title: 'Failed!!!',
          description: 'Update Evidence Failed!',
        })
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error Submitting Evidence',
        description: error.message,
      })
    },
  })
  const onSubmit = async (data: FormData) => {
    const formData: IEvidence = {
      tradeDetailsId: tradeDetailsId as string,
      video: data.video,
      ...data,
    }
    postEvidence.mutate(formData)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex">
        <Button>Evidence</Button>
      </DialogTrigger>
      <DialogContent className="h-[20rem] w-[36rem]">
        <DialogHeader className="font-semibold">
          Provide information to ensure your order does not have unexpected events
        </DialogHeader>
        <div className="flex flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="deliveryCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-4">DeliveryCode</FormLabel>
                    <FormControl>
                      <Input placeholder="DeliveryCode..." {...field} />
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
              <Button type="submit" disabled={postEvidence.isLoading} className="mt-4 w-full">
                {postEvidence.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''} Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default Evidence
