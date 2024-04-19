import { authAxiosClient } from '../../lib/axios'

async function getCartApi(userId: string) {
  return await authAxiosClient.get(`/Cart/view-cart-details?userId=${userId}`, {}).then((response) => {
    return response.data
  })
}

export { getCartApi }
