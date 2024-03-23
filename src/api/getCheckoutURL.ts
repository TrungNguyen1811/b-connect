import { axiosClient } from 'src/lib/axios'

const BASED_URL = import.meta.env.VERCEL_BASE || 'http://localhost:5173/'
const RETURN_URL = BASED_URL + 'checkout-result'

export async function getCheckoutUrlApi(amount: number, orderId: string): Promise<string> {
  return axiosClient
    .post('/transaction/checkoutUrl', {
      amount,
      orderId,
      returnUrl: RETURN_URL,
    })
    .then((res) => res.data)
}
