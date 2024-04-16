import { IResponseOrder } from 'src/types/order'
import { authAxiosClient, axiosClient } from '../../lib/axios'
import { IResponse } from 'src/types/response'

async function getOrderApi(_id: string) {
  return await authAxiosClient.get(`/Order/${_id}`, {}).then((response) => {
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

async function getOrderHistoryApi(userId: string) {
  return await axiosClient.get(`/Order/order-history?userId=${userId}`, {}).then((response) => {
    const data: IResponseOrder[] = response.data
    // const pagination = response.headers['x-pagination']
    // const parseJson: IResponsePagination = JSON.parse(pagination)
    const dataAll: IResponse<IResponseOrder[]> = {
      data: data,
      _metadata: data,
      // _pagination: parseJson,
    }
    return dataAll
  })
}

export { getOrderHistoryApi }
