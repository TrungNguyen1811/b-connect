import { IBook, IResponseBookGroup } from 'src/types/books'
// import { faker } from '@faker-js/faker'
import { IResponse, IResponsePagination } from 'src/types/response'
import { authAxiosClient, axiosClient } from 'src/lib/axios'
import { IBookGroupSearch, IDefaultQuery, IQueryPagination, IQuerySearch } from 'src/types/requests'

export type IGetBookResponse = IResponse<IBook>

export async function getBookById(book_Id: string) {
  return await axiosClient
    .get(`/products/get-product-by-id?bookId=${book_Id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      const data: IBook = res.data
      return data
    })
}

export async function SearchBookInInventory(params: Partial<IQueryPagination & IQuerySearch>) {
  return await authAxiosClient
    .get(`/products/SellerManager/SearchBookInInventory`, {
      params,
    })
    .then((res) => {
      const data: IBook[] = res.data
      const pagination = res.headers['x-pagination']
      const parseJson: IResponsePagination = JSON.parse(pagination)
      const dataAll: IResponse<IBook[]> = {
        data: data,
        _metadata: data,
        _pagination: parseJson,
      }
      return dataAll
    })
}

export async function GetAllBookInInventoryByAgencyId(
  params: Partial<IQueryPagination & IQuerySearch>,
  agencyId: string,
) {
  const data = {
    ...params,
    agencyId: agencyId,
  }
  return await authAxiosClient
    .get(`/products/SellerManager/GetAllBookInInventoryByAgencyId`, { params: data })
    .then((res) => {
      const data: IBook[] = res.data
      const pagination = res.headers['x-pagination']
      const parseJson: IResponsePagination = JSON.parse(pagination)
      const dataAll: IResponse<IBook[]> = {
        data: data,
        _metadata: data,
        _pagination: parseJson,
      }
      return dataAll
    })
}

export async function GetListBestSellerProductIdByNumberOfBookSoldAndAgencyId(
  params: Partial<IQueryPagination & IQuerySearch>,
  agencyId: string,
) {
  const data = {
    ...params,
    agencyId: agencyId,
  }
  return await authAxiosClient
    .get(`/products/SellerManager/GetListBestSellerProductIdByNumberOfBookSoldAndAgencyId`, { params: data })
    .then((res) => {
      const data: IBook[] = res.data
      // const pagination = res.headers['x-pagination']
      // const parseJson: IResponsePagination = JSON.parse(pagination)
      // const dataAll: IResponse<IBook[]> = {
      //   data: data,
      //   _metadata: data,
      //   _pagination: parseJson,
      // }
      return data
    })
}
export async function GetAllBookInInventory(params: GetManyBooksParams) {
  return await authAxiosClient
    .get(`/products/SellerManager/GetAllBookInInventory`, {
      params,
    })
    .then((res) => {
      const data: IBook[] = res.data
      const pagination = res.headers['x-pagination']
      const parseJson: IResponsePagination = JSON.parse(pagination)
      const dataAll: IResponse<IBook[]> = {
        data: data,
        _metadata: data,
        _pagination: parseJson,
      }
      return dataAll
    })
}

export type GetManyBooksParams = {
  Name?: string
  CategoryIds?: string
  MinPrice?: string
  MaxPrice?: string
  OverRating?: string
  Type?: string
} & Partial<IDefaultQuery>

export async function getManyBooks(params: GetManyBooksParams) {
  return axiosClient
    .get('/products/get-book-by-all', {
      params,
    })
    .then((res) => {
      const data: IBook[] = res.data
      const pagination = res.headers['x-pagination']
      const parseJson: IResponsePagination = JSON.parse(pagination)
      const dataAll: IResponse<IBook[]> = {
        data: data,
        _metadata: data,
        _pagination: parseJson,
      }
      return dataAll
    })
}

export async function getAllBooks() {
  return axiosClient.get('/products/get-all-book').then((res) => {
    const data: IBook[] = res.data
    const pagination = res.headers['x-pagination']
    const parseJson: IResponsePagination = JSON.parse(pagination)
    const dataAll: IResponse<IBook[]> = {
      data: data,
      _metadata: data,
      _pagination: parseJson,
    }
    return dataAll
  })
}

export async function getTopBooks(params: GetManyBooksParams) {
  return axiosClient.get('/products/get-book-by-quantity', { params }).then((res) => {
    const data: IBook[] = res.data
    const pagination = res.headers['x-pagination']
    const dataAll: IResponse<IBook[]> = {
      data: data,
      _metadata: data,
      _pagination: pagination,
    }
    return dataAll
  })
}

export async function getAllBookGroupOfBook() {
  return axiosClient.get('/products/BookGroup/GetAllBookGroupOfBook', {}).then((res) => {
    const data: IBook[] = res.data
    const pagination = res.headers['x-pagination']
    const dataAll: IResponse<IBook[]> = {
      data: data,
      _metadata: data,
      _pagination: pagination,
    }
    return dataAll
  })
}

export async function getBookGroupById(id: string) {
  return axiosClient.get(`/BookGroup/GetBookGroupById?bookGroupId=${id}`).then((res) => {
    const data: IResponseBookGroup = res.data
    return data
  })
}
export type GetManyBookGroupsParams = {
  inputString: string
} & Partial<IDefaultQuery>

export async function searchBookGroup(params: GetManyBookGroupsParams) {
  return axiosClient.get('BookGroup/SearchBookGroup', { params }).then((res) => {
    const data: IBook[] = res.data
    const pagination = res.headers['x-pagination']
    const dataAll: IResponse<IBook[]> = {
      data: data,
      _metadata: data,
      _pagination: pagination,
    }
    return dataAll
  })
}

export type GetManyBooksGroupParams = Partial<IQueryPagination & IQuerySearch & IBookGroupSearch>
export async function getAllBookOfBookGroup(params: GetManyBooksGroupParams) {
  return axiosClient.get('/products/BookGroup/GetAllBookOfBookGroup', { params }).then((res) => {
    const data: IBook[] = res.data
    const pagination = res.headers['x-pagination']
    const dataAll: IResponse<IBook[]> = {
      data: data,
      _metadata: data,
      _pagination: pagination,
    }
    return dataAll
  })
}

export type GetParams = Partial<IDefaultQuery>

export async function findAllBookGroupsByAgency(params: GetParams) {
  return axiosClient.get('/products/BookGroup/FindAllBookGroupsByAgency', { params }).then((res) => {
    const data: IBook[] = res.data
    const pagination = res.headers['x-pagination']
    const dataAll: IResponse<IBook[]> = {
      data: data,
      _metadata: data,
      _pagination: pagination,
    }
    return dataAll
  })
}

export async function getAllBookGroupsForAgency(params: GetParams) {
  return authAxiosClient.get('/products/BookGroup/GetAllBookGroupsForAgency', { params }).then((res) => {
    const data: IResponseBookGroup[] = res.data
    const pagination = res.headers['x-pagination']
    const dataAll: IResponse<IResponseBookGroup[]> = {
      data: data,
      _metadata: data,
      _pagination: pagination,
    }
    return dataAll
  })
}

export async function getAllBookInInventory(params: GetParams) {
  return axiosClient.get('/products/BookGroup/GetAllBookGroupsForAgency', { params }).then((res) => {
    const data: IBook[] = res.data
    const pagination = res.headers['x-pagination']
    const dataAll: IResponse<IBook[]> = {
      data: data,
      _metadata: data,
      _pagination: pagination,
    }
    return dataAll
  })
}

export async function getAllBookGroup(params: GetParams) {
  return axiosClient.get('/BookGroup/GetAllBookGroup', { params }).then((res) => {
    const data: IResponseBookGroup[] = res.data
    const pagination = res.headers['x-pagination']
    const dataAll: IResponse<IResponseBookGroup[]> = {
      data: data,
      _metadata: data,
      _pagination: pagination,
    }
    return dataAll
  })
}
