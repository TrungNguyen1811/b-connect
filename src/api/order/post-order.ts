import { IOrder } from 'src/types/order'
import { axiosClient } from '../../lib/axios'
import { IOrderCart } from 'src/types/order-cart'

async function createOrder(orderData: IOrder) {
  return await axiosClient
    .post('/Order/create-order', orderData, {})
    .then((response) => {
      if (response.status === 201) {
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

export { createOrder }

async function checkout(orderData: IOrderCart[]) {
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
