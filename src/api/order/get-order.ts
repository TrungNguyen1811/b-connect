import { authAxiosClient } from '../../lib/axios'

async function getOrderApi(_id: string) {
  return await authAxiosClient.get(`/order/${_id}`, {}).then((response) => {
    return response.data
  })
}

export { getOrderApi }
