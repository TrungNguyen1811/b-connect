import { ICart } from 'src/types'
import { authAxiosClient } from '../../lib/axios'

async function postCartApi(postCartApi: ICart[]) {
  return await authAxiosClient
    .post('/Cart/add-products-to-cart', postCartApi, {})
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
