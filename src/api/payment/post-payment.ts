import { authAxiosClient } from 'src/lib/axios'
import { IPaymentRefund, IPaymentTrade } from 'src/types/blog'

async function postPaymentTrade(data: IPaymentTrade) {
  return await authAxiosClient
    .post('/Payment/pre-trade-checkout', {
      tradeDetailsId: data.tradeDetailsId,
      transactionId: data.transactionId,
      isUsingMiddle: data.isUsingMiddle,
      amount: data.amount ? data.amount : '',
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        // Handle other HTTP statuses as needed
        throw new Error('Request failed with status ' + response.status)
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      throw error
    })
}
export { postPaymentTrade }

async function postPaymentRefund(data: IPaymentRefund) {
  return await authAxiosClient
    .post('/Payment/vnpay/create-refund-request', {
      transactionId: data.transId,
      amount: data.amount,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        // Handle other HTTP statuses as needed
        throw new Error('Request failed with status ' + response.status)
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      throw error
    })
}
export { postPaymentRefund }
