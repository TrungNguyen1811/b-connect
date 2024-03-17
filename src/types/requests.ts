export interface IQueryPagination {
  TotalCount: number
  PageSize: number
  CurrentPage: number
  TotalPages: number
  HasNext: boolean
  HasPrevious: boolean
}

export interface IQuerySearch {
  search: string
}

export interface IDefaultQuery extends IQueryPagination, IQuerySearch {
  [key: string]: unknown
}
