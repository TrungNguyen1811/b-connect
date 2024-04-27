import { authAxiosClient } from 'src/lib/axios'
import { IPostResponse } from 'src/types/blog'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { IResponse } from 'src/types/response'

export async function getAllTradePostForMiddle(params: Partial<IQueryPagination & IQuerySearch>) {
  return await authAxiosClient
    .get(`/trading/get-all-trade-post-for-middle`, {
      params,
    })
    .then((res) => {
      const data: IPostResponse[] = res.data
      // const pagination = res.headers['x-pagination']
      // const parseJson: IResponsePagination = JSON.parse(pagination)
      const dataAll: IResponse<IPostResponse[]> = {
        data: data,
        _metadata: data,
        _pagination: { TotalCount: 11, PageSize: 10, CurrentPage: 1, TotalPages: 2, HasNext: true, HasPrevious: false },
      }
      return dataAll
    })
}
