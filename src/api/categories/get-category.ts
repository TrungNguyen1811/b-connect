import { IResponse, IResponsePagination } from 'src/types/response'
import { ICategory } from 'src/types'
import { axiosClient } from 'src/lib/axios'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'

export async function getAllCategory() {
  return axiosClient.get('/category/get-all-category').then((res) => {
    const data: ICategory[] = res.data
    const pagination = res.headers['x-pagination']
    const parseJson: IResponsePagination = JSON.parse(pagination)
    // console.log('a', parseJson)
    const dataAll: IResponse<ICategory[]> = {
      data: data,
      _metadata: data,
      _pagination: parseJson,
    }
    return dataAll
  })
}

export async function getAllCategoryNoParam() {
  return axiosClient.get('/category/get-all-category', {}).then((res) => {
    const data: ICategory[] = res.data
    return data
  })
}

export async function getCategoryById(id: string) {
  return axiosClient.get(`/category/get-category-by-id?cateId=${id}`).then((res) => {
    const data: ICategory = res.data
    return data
  })
}

export async function getSearchCategory(params: Partial<IQueryPagination & IQuerySearch>) {
  return axiosClient
    .get('/category/search-category', {
      params,
    })
    .then((res) => {
      const data: ICategory[] = res.data
      console.log('data', data)
      const pagination = res.headers['x-pagination']
      const parseJson: IResponsePagination = JSON.parse(pagination)
      console.log('a', parseJson)
      const dataAll: IResponse<ICategory[]> = {
        data: data,
        _metadata: data,
        _pagination: parseJson,
      }
      console.log('dataAll', dataAll)

      return dataAll
    })
}
