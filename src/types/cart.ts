import { IBook } from './books'
import { User } from './user'

export interface ICart {
  _id?: string
  bookId: IBook['_id']
  bookName?: IBook['name']
  quantity: number
  userId?: User['_id']
  price?: number
  status?: string
  creatAt?: Date
  updateAt?: Date
  ExpriedDate?: Date
}
