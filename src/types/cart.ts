import { IBook } from './books'

export interface ICart {
  cartId?: string
  productId: IBook['productId']
  name?: IBook['name']
  quantity: number
  stock: number
  price?: number
  // userId?: User['userId']
  // status?: string
  // creatAt?: Date
  // updateAt?: Date
  // ExpriedDate?: Date
}
