import { User } from 'src/types/user'
import { authAxiosClient } from '../../lib/axios'

async function postUserApi(userData: User) {
  return await authAxiosClient
    .post('/user', userData, {})
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

export { postUserApi }