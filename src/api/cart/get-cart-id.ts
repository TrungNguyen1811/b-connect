import { authAxiosClient } from '../../lib/axios'

async function getCartIdApi(userId: string) {
  return await authAxiosClient.get(`/cart/get-cart-id?userId=${userId}`, {}).then((response) => {
    return response.data
  })
}

export { getCartIdApi }
