import { authAxiosClient } from '../../lib/axios'
import { DataCart } from 'src/hooks/useOrderCart'

async function postCartApi(dataCart: DataCart) {
  return await authAxiosClient
    .post('/Cart/add-products-to-cart', dataCart, {})
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

export { postCartApi }
