import { authAxiosClient } from '../../lib/axios'

async function getCartApi(_id: string) {
  return await authAxiosClient.get(`/Cart/view-cart-details?userId=${_id}`, {}).then((response) => {
    return response.data
  })
}

export { getCartApi }
