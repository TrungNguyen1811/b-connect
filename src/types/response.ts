export type IResponse<T> = {
  data: T
  _metadata?: T | undefined
  _pagination?: {
    TotalCount: number
    PageSize: number
    CurrentPage: number
    TotalPages: number
    HasNext: boolean
    HasPrevious: boolean
  }
}

export type IErrorResponse = {
  message: string
}

export interface IResponsePagination {
  TotalCount: number
  PageSize: number
  CurrentPage: number
  TotalPages: number
  HasNext: boolean
  HasPrevious: boolean
}
