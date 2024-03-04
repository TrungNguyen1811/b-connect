import { IBook } from './books'
import { User } from './user'

export interface ICart {
  cartId?: string
  productId: IBook['productId']
  bookName?: IBook['name']
  quantity: number
  stock: number
  userId?: User['userId']
  price?: number
  status?: string
  creatAt?: Date
  updateAt?: Date
  ExpriedDate?: Date
}
