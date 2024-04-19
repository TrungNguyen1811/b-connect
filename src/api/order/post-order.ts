import { IOrder } from 'src/types/order'
import { authAxiosClient, axiosClient } from '../../lib/axios'
import { ICheckout } from 'src/types/order-cart'

async function createOrder(orderData: IOrder) {
  return await authAxiosClient
    .post('/Order/create-order', orderData, {})
    .then((response) => {
      if (response.status === 200) {
        return response.status
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

export { createOrder }

async function checkout(orderData: ICheckout) {
  return await axiosClient
    .post('/Order/check-out', orderData, {})
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

export { checkout }
interface IPaymentReturn {
  paymentReturnDTO: {
    paymentId: string
    paymentStatus: number
    paymentMessage: string
    paymentDate: Date
    paymentRefId: string
    amount: 0
    signature: string
  }
}
