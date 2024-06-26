import { authAxiosClient } from 'src/lib/axios'
import { IRefund } from 'src/types/transaction'

export async function postCreateRefundRequest(data: IRefund) {
  return await authAxiosClient
    .post(`/transaction/create-refund-request`, {
      transactionId: data.transactionId,
      reason: data.reason,
    })
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

export async function deleteRefundRequest(refundRequestId: string) {
  return await authAxiosClient
    .delete(`transaction/delete-refund-request?refundRequestId=${refundRequestId}`)
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
