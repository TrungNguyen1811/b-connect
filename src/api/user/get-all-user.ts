import { authAxiosClient } from 'src/lib/axios'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'

export async function getAllUser(params: Partial<IQueryPagination & IQuerySearch>) {
  return authAxiosClient
    .get('user', {
      params,
    })
    .then((res) => res.data)
}
