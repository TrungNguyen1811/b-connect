export interface IBook {
  productId?: string
  name: string
  author: string
  bookDir?: string
  bookImg?: File | string
  backgroundImg?: File | string
  description: string
  price: number
  quantity: number
  stock: number
  agencyId?: string
  agencyName?: string
  category?: string[]
  reviews?: IReview['ratingRecordId']
  ratingId?: string
  isAvailable?: boolean | undefined
  type?: 'NEW' | 'OLD'
  genres?: 'popular' | 'best'
  createdDate?: Date
  publishDate?: Date
}
export enum BOOK_TYPE {
  NEW = 'NEW',
  OLD = 'OLD',
}

export interface IReview {
  ratingRecordId?: string
  ratingId: string
  userId: string
  ratingPoint: string
  comment: string
  purchasesVerify?: string
  createdAt?: string
  updatedAt?: string
}

export interface IReviewResponse {
  ratingRecordId?: string
  ratingId?: string
  userId: string
  ratingPoint: number
  comment: string
  username?: string
  avatarDir?: string
  email?: string
  createdDate?: string
  updatedAt?: string
}

export interface IBookGroup {
  bookGroupId?: string
  bookGroupName: string
  bookGroupImg?: File
  description: string
}

export interface IResponseBookGroup {
  bookGroupId: string
  bookGroupName: string
  imgDir: string
  description: string
  agencyId: string
}

export interface IBookTest {
  productId?: string
  name: string
  author: string
  bookDir?: string
  bookImg?: File | string
  backgroundImg?: File | string
  description: string
  price: number
  quantity: number
  agencyId?: string
  agencyName?: string
  category?: string[]
  reviews?: IReview['ratingRecordId']
  ratingId?: string
  isAvailable?: boolean | undefined
  type?: 'NEW' | 'OLD'
  genres?: 'popular' | 'best'
  createdDate?: Date
  publishDate?: Date
}
