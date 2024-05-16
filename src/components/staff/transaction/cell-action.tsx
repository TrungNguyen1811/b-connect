import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import { Button } from 'src/components/ui/button'
import { CopyCheckIcon, CopyIcon, Loader2, MoreHorizontal } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'src/components/ui/use-toast'
import { ITransaction } from 'src/types/transaction'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from 'src/components/ui/form'
import { Textarea } from 'src/components/ui/text-area'
import { IPaymentRefund } from 'src/types/blog'
import { postPaymentRefund } from 'src/api/payment/post-payment'

interface CellActionProps {
  data: ITransaction
}
const formSchema = z.object({
  amount: z.number(),
})
type FormData = z.infer<typeof formSchema>
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const transactionId = data.transactionId
  const [copyId, setCopyId] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })
  const onCopyId = () => {
    navigator.clipboard
      .writeText(transactionId as string)
      .then(() => {
        setCopyId(true)
        setTimeout(() => setCopyId(false), 2000)
      })
      .catch(() => setCopyId(false))
  }

  const createRefund = useMutation((formData: IPaymentRefund) => postPaymentRefund(formData), {
    onSuccess: (formData) => {
      if (formData) {
        toast({
          title: 'Success',
          description: 'Refund Success!!!',
        })
        setOpen(false)
        queryClient.invalidateQueries()
      } else {
        toast({
          title: 'Failed',
          description: 'Refund Failed!!!',
        })
      }
    },
    onError: (error: any) => {
      toast({
        title: 'Error Refund',
        description: error.response.data,
      })
    },
  })

  const onSubmit = (data: FormData) => {
    const formData: IPaymentRefund = {
      transId: transactionId,
      amount: data.amount,
    }
    createRefund.mutate(formData)
  }
  return (
    <div className="flex w-12 flex-row gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[50vw]">
          <DialogHeader>
            <DialogTitle>Refund</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className=" bg-gray-100">
                    <div className="mx-4">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center py-4">
                            <FormLabel className="w-40 pr-2 text-right">Amount</FormLabel>
                            <FormControl>
                              <Textarea className="b-4 h-40 bg-orange-50" placeholder="Amount..." {...field} />
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
                      <Button disabled={createRefund.isLoading} className="" type="submit">
                        {createRefund.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''} Submit
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={onCopyId}>
            {copyId ? (
              <span className="flex flex-row items-center">
                <CopyCheckIcon className="mr-2 h-4 w-4" /> Copied!
              </span>
            ) : (
              <span className="flex flex-row items-center">
                <CopyIcon className="mr-2 h-4 w-4" /> CopyId
              </span>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button onClick={() => setOpen(true)}>Refund</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
