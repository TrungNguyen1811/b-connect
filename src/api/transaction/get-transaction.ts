import { authAxiosClient } from 'src/lib/axios'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { IResponse, IResponsePagination } from 'src/types/response'
import { IRefund, ITransaction } from 'src/types/transaction'

export async function getAllTransaction(params: Partial<IQueryPagination & IQuerySearch>) {
  return await authAxiosClient
    .get(`/Transaction/get-all-transaction`, {
      params,
    })
    .then((res) => {
      const data: ITransaction[] = res.data
      const pagination = res.headers['x-pagination']
      const parseJson: IResponsePagination = JSON.parse(pagination)
      const dataAll: IResponse<ITransaction[]> = {
        data: data,
        _metadata: data,
        _pagination: parseJson,
      }
      return dataAll
    })
}
export async function getAllTransactionByUser(params: Partial<IQueryPagination & IQuerySearch>) {
  return await authAxiosClient
    .get(`/Transaction/get-all-user-transaction`, {
      params,
    })
    .then((res) => {
      const data: ITransaction[] = res.data
      const pagination = res.headers['x-pagination']
      const parseJson: IResponsePagination = JSON.parse(pagination)
      const dataAll: IResponse<ITransaction[]> = {
        data: data,
        _metadata: data,
        _pagination: parseJson,
      }
      return dataAll
    })
}

export async function getAllRefund(params: Partial<IQueryPagination & IQuerySearch>) {
  return await authAxiosClient
    .get(`/Transaction/get-all-refund-request`, {
      params,
    })
    .then((res) => {
      const data: IRefund[] = res.data
      const pagination = res.headers['x-pagination']
      const parseJson: IResponsePagination = JSON.parse(pagination)
      const dataAll: IResponse<IRefund[]> = {
        data: data,
        _metadata: data,
        _pagination: parseJson,
      }
      return dataAll
    })
}

export async function getAllRefundByUser(params: Partial<IQueryPagination & IQuerySearch>) {
  return await authAxiosClient
    .get(`/Transaction/get-all-refund-request-by-a-user`, {
      params,
    })
    .then((res) => {
      const data: IRefund[] = res.data
      const pagination = res.headers['x-pagination']
      const parseJson: IResponsePagination = JSON.parse(pagination)
      const dataAll: IResponse<IRefund[]> = {
        data: data,
        _metadata: data,
        _pagination: parseJson,
      }
      return dataAll
    })
}
