import { IResponseAgencyOrder, IResponseAgencyOrderDetail, IResponseOrder } from 'src/types/order'
import { authAxiosClient, axiosClient } from '../../lib/axios'
import { IResponse, IResponsePagination } from 'src/types/response'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'

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

export type GetManyOrderParams = {
  Address?: string
  MinPrice?: number
  MaxPrice?: number
  Method?: string
  QuantityMin?: number
  QuantityMax?: number
  BookName?: string
  CustomerName?: string
  OrderId?: string
  startDate?: string
  endDate?: string
  Status?: string
  PageNumber?: number
  PageSize?: number
} & Partial<IQueryPagination & IQuerySearch>
async function getAllOrderOfAgency(params: GetManyOrderParams) {
  return await authAxiosClient.get(`/Order/GetAllOrderOfAgency`, { params }).then((response) => {
    const data: IResponseAgencyOrder[] = response.data
    const pagination = response.headers['x-pagination']
    const parseJson: IResponsePagination = JSON.parse(pagination)
    const dataAll: IResponse<IResponseAgencyOrder[]> = {
      data: data,
      _metadata: data,
      _pagination: parseJson,
    }
    return dataAll
  })
}
export { getAllOrderOfAgency }

async function getOrderDetail(orderId: string) {
  return await authAxiosClient.get(`/Order/GetOrderDetail?id=${orderId}`).then((response) => {
    const data: IResponseAgencyOrderDetail = response.data
    return data
  })
}
export { getOrderDetail }
