import { authAxiosClient } from 'src/lib/axios'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { IResponse } from 'src/types/response'
import { User } from 'src/types/user'

export async function getAllUser(params: Partial<IQueryPagination & IQuerySearch>) {
  return authAxiosClient
    .get('/Admin/get-all-user', {
      params,
    })
    .then((res) => {
      const data: User[] = res.data
      const pagination = res.headers['x-pagination']
      const parseJson: IQueryPagination = JSON.parse(pagination)
      console.log('a', parseJson)
      const dataAll: IResponse<User[]> = {
        data: data,
        _metadata: data,
        _pagination: parseJson,
      }
      console.log('dataAll', dataAll)

      return dataAll
    })
}
