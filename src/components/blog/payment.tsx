import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
import { IPaymentTrade } from 'src/types/blog'
import { Loader2 } from 'lucide-react'
import { faker } from '@faker-js/faker'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogDescription } from '../ui/dialog'
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { postPaymentTrade } from 'src/api/payment/post-payment'

interface Props {
  tradeDetailsId: string
}
const FormSchema = z.object({
  amount: z.coerce.number().min(0),
})
type FormData = z.infer<typeof FormSchema>
function PaymentTrade({ tradeDetailsId }: Props) {
  const transactionId = faker.string.uuid()
  const [open, setOpen] = useState<boolean>(false)
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  })
  const postPayment = useMutation((formData: IPaymentTrade) => postPaymentTrade(formData), {
    onSuccess: (data) => {
      if (data) {
        window.location.replace(data)
      } else {
        toast({
          title: 'Failed!!!',
          description: 'Payment Failed!',
        })
      }
    },
    onError: (error: any) => {
      toast({
        title: 'Error Payment',
        description: error.response.data,
      })
    },
  })
  const onSubmit = async (data: FormData) => {
    const formData: IPaymentTrade = {
      tradeDetailsId: tradeDetailsId as string,
      transactionId: transactionId as string,
      isUsingMiddle: false,
      amount: data.amount,
    }
    postPayment.mutate(formData)
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex">
          <Button>Payment</Button>
        </DialogTrigger>
        <DialogContent className="min-h-[20rem] w-[36rem]">
          <DialogHeader className="text-lg font-semibold">
            Enter the amount you want to deposit, it will ensure a safer book exchange.
          </DialogHeader>
          <div className="mt-2 flex flex-col">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mt-4">Amount</FormLabel>
                      <FormControl>
                        <Input placeholder="Amount..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-2 flex flex-row gap-2">
                  <Button type="submit" disabled={postPayment.isLoading} className="w-24">
                    {postPayment.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''} Payment
                  </Button>
                  <Button onClick={() => setOpen(false)} className="w-24" variant={'destructive'}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <DialogDescription>
            Note: Please discuss with your book exchange partner the deposit amount.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default PaymentTrade
