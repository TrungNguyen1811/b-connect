import { ICategory } from './categories'
import { User } from './user'

export interface IBook {
  isAvailable?: boolean | undefined
  _id: string
  name: string
  author: string
  image: string
  title: string
  description: string
  price: number
  category?: ICategory[]
  reviews?: IReview[]
  createdAt?: Date
  updatedAt?: Date
  status: 'NEW' | 'OLD'
}
export enum BOOK_STATUS {
  NEW = 'NEW',
  OLD = 'OLD',
}
export interface IReview {
  _id: string
  product_id: string
  user_id: Pick<User, '_id' | 'email' | 'avatar' | 'fullName'>
  title: string
  details: string
  rating: number
  voteCount: number
  status: string
  purchasesVerify: string
  createdAt: string
  updatedAt: string
}
