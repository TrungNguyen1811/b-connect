import { ICategory } from './categories'

export interface IBook {
  productId: string
  name: string
  author?: string
  image?: string
  description: string
  price: number
  stock: number
  agencyId: string
  agencyName: string
  category?: ICategory['cateId']
  reviews?: IReview['ratingRecordId']
  ratingId?: string
  isAvailable?: boolean | undefined
  status?: 'NEW' | 'OLD'
  genres?: 'popular' | 'best'
  createdDate?: Date
  publishDate?: Date
}
export enum BOOK_STATUS {
  NEW = 'NEW',
  OLD = 'OLD',
}

export interface IReview {
  ratingRecordId?: string
  ratingId: string
  userId: string
  ratingPoint?: number
  comment?: string
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
  createDate?: string
  updatedAt?: string
}
