import { ICategory } from './categories'
import { User } from './user'

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
  reviews?: IReview['RatingRecordId']
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
  RatingRecordId?: string
  RatingId: string
  userId: Pick<User, 'userId' | 'email' | 'avatar' | 'fullName'>
  RatingPoint?: number
  comment?: string
  purchasesVerify?: string
  createdAt?: string
  updatedAt?: string
}
