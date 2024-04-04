export interface IQueryPagination {
  PageNumber: number
  PageSize: number
}
export interface IQuerySearch {
  search: string
}

export interface IBookGroupSearch {
  bookGroupId: string
}

export interface IDefaultQuery extends IQueryPagination, IQuerySearch {
  [key: string]: unknown
}
