import { authAxiosClient } from 'src/lib/axios'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { IResponse, IResponsePagination } from 'src/types/response'
import { User } from 'src/types/user'

export async function getAllUser(params: Partial<IQueryPagination & IQuerySearch>) {
  return authAxiosClient
    .get('/Admin/get-all-user', {
      params,
    })
    .then((res) => {
      const data: User[] = res.data
      const pagination = res.headers['x-pagination']
      const parseJson: IResponsePagination = JSON.parse(pagination)
      const dataAll: IResponse<User[]> = {
        data: data,
        _metadata: data,
        _pagination: parseJson,
      }

      return dataAll
    })
}
