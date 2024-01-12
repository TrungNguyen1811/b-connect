export interface IQueryPagination {
  perPage: number
  page: number
}

export interface IQuerySearch {
  search: string
}

export interface IDefaultQuery extends IQueryPagination, IQuerySearch {
  [key: string]: unknown
}
