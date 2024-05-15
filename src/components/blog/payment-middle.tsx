import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
import { IPaymentTrade } from 'src/types/blog'
import { postPaymentTrade } from 'src/api/blog/interested'
import { Loader2 } from 'lucide-react'
import { faker } from '@faker-js/faker'

interface Props {
  tradeDetailsId: string
}
function PaymentMiddleTrade({ tradeDetailsId }: Props) {
  const transactionId = faker.string.uuid()
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
  const onSubmit = async () => {
    const formData: IPaymentTrade = {
      tradeDetailsId: tradeDetailsId as string,
      transactionId: transactionId as string,
      isUsingMiddle: true,
    }
    postPayment.mutate(formData)
  }
  return (
    <Button type="submit" disabled={postPayment.isLoading} onClick={onSubmit} className="w-24">
      {postPayment.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''} Payment
    </Button>
  )
}
export default PaymentMiddleTrade
