import { IResponseOrderAgency, IResponseOrderAgencyDetail, IResponseOrder } from 'src/types/order'
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

async function getOrderHistoryApi(type: string, userId: string) {
  return await axiosClient.get(`/Order/order-history?userId=${userId}&type=${type}`, {}).then((response) => {
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
  address?: string
  bookName?: string
  customerName?: string
  startDate?: string
  endDate?: string
  status?: string
  PageNumber?: number
  PageSize?: number
} & Partial<IQueryPagination & IQuerySearch>
async function SearchOrders(params: GetManyOrderParams) {
  return await authAxiosClient.get(`/Order/SearchOrders`, { params }).then((response) => {
    const data: IResponseOrderAgency[] = response.data
    const pagination = response.headers['x-pagination']
    const parseJson: IResponsePagination = JSON.parse(pagination)
    const dataAll: IResponse<IResponseOrderAgency[]> = {
      data: data,
      _metadata: data,
      _pagination: parseJson,
    }
    return dataAll
  })
}
export { SearchOrders }

async function getOrderDetail(orderId: string) {
  return await authAxiosClient.get(`/Order/GetOrderDetail?id=${orderId}`).then((response) => {
    const data: IResponseOrderAgencyDetail = response.data
    return data
  })
}
export { getOrderDetail }
