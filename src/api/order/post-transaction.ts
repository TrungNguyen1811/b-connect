import { authAxiosClient } from '../../lib/axios'

async function SaveTransaction(transactionId: string) {
  return await authAxiosClient
    .post(`/Payment/save-transactor?transactionId=${transactionId}`)
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

export { SaveTransaction }
