import { axiosClient } from 'src/lib/axios'
import { ICategory } from 'src/types'

export async function postCategoryApi(data: ICategory) {
  return await axiosClient
    .post('/category/create', data, {})
    .then((res) => {
      if (res.status === 201) {
        return res.data
      } else {
        throw new Error('Request failed with status' + res.status)
      }
    })
    .catch((error) => {
      throw error
    })
}
