export type IResponse<T> = {
  data: T
  _metadata?: T | undefined
  _pagination?: {
    total: number
    totalPage: number
  }
}

export type IErrorResponse = {
  message: string
}
