import { faker } from '@faker-js/faker'
import { IResponse, IResponsePagination } from 'src/types/response'
import { ICategory } from 'src/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getCategoryById(id: string) {
  // TODO: Replace this with an actual API call
  const category: ICategory = {
    cateId: faker.string.uuid(),
    description: faker.lorem.paragraphs(),
    cateName: faker.lorem.word(),
    imageDir: faker.image.urlLoremFlickr({
      height: 100,
      width: 100,
    }),
  }

  return new Promise<ICategory>((resolve) => {
    setTimeout(() => resolve(category), 1000)
  })
  // return authAxiosClient.get(`/book/${id}`);
}

export function getAllCategories(): Promise<ICategory[]> {
  // TODO: Replace this with an actual API call

  const categories: ICategory[] = Array.from({ length: 20 }, () => ({
    cateId: faker.string.uuid(),
    description: faker.lorem.paragraphs(),
    cateName: faker.lorem.sentence(),
    imageDir: faker.image.urlLoremFlickr({
      height: 100,
      width: 100,
    }),
  }))

  const response: IResponse<ICategory[]> = {
    data: categories,
  }
  return new Promise<ICategory[]>((resolve) => {
    setTimeout(() => resolve(response.data), 1000) // Resolve with the correct type
  })
}

export function getManyCategories() {
  // TODO: Replace this with an actual API call

  const categories: ICategory[] = Array.from({ length: 20 }, () => ({
    cateId: faker.string.uuid(),
    description: faker.lorem.paragraphs(),
    cateName: faker.lorem.sentence(),
    imageDir: faker.image.urlLoremFlickr({
      height: 100,
      width: 100,
    }),
  }))

  const response: IResponse<ICategory[]> = {
    data: categories,
  }
  return new Promise<IResponse<ICategory[]>>((resolve) => {
    setTimeout(() => resolve(response), 1000)
  })
}
import { axiosClient } from 'src/lib/axios'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'

export async function getAllCategory() {
  return axiosClient.get('/Category/get-all-category?PageNumber=1&PageSize=30').then((res) => {
    const data = res.data
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
  return axiosClient.get('/Category/get-all-category?PageNumber=1&PageSize=30', {}).then((res) => {
    const data = res.data
    // const pagination = res.headers['x-pagination']
    // const parseJson: IQueryPagination = JSON.parse(pagination)
    // // console.log('a', parseJson)
    // const dataAll: IResponse<ICategory[]> = {
    //   data: data,
    //   _metadata: data,
    //   _pagination: parseJson,
    // }
    return data
  })
}

export async function getCategoryApi(id: string) {
  return axiosClient.get(`Category/get-category-by-id?cateId=${id}`).then((res) => res.data)
}

export async function getSearchCategory(params: Partial<IQueryPagination & IQuerySearch>) {
  return axiosClient
    .get('/Category/search-category', {
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
