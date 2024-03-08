import { authAxiosClient } from '../../lib/axios'

async function getOrderApi(_id: string) {
  return await authAxiosClient.get(`/order/${_id}`, {}).then((response) => {
    return response.data
  })
}

export { getOrderApi }

async function getTransaction(_id: string) {
  return await authAxiosClient.get(`/Order/get-transaction-by-id?refId=${_id}`, {}).then((response) => {
    return response.data
  })
}

export { getTransaction }
