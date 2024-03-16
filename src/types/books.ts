import { ICategory } from './categories'
import { User } from './user'

export interface IBook {
  productId: string
  name: string
  author?: string
  image?: string
  description: string
  price: number
  quantity: number
  sellerId: string
  sellerName: string
  category?: ICategory['cateId']
  reviews?: IReview['reviewId']
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
  reviewId: string
  productId: string
  userId: Pick<User, 'userId' | 'email' | 'avatar' | 'fullName'>
  title?: string
  details?: string
  rating?: number
  voteCount?: number
  status?: string
  purchasesVerify?: string
  createdAt?: string
  updatedAt?: string
}
