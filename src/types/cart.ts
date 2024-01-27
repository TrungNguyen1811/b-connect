import { IBook } from './books'

export interface ICart {
  cartId?: string
  productId: IBook['_id']
  // bookName?: IBook['name']
  quantity: number
  // userId?: User['userId']
  // price?: number
  // status?: string
  // creatAt?: Date
  // updateAt?: Date
  // ExpriedDate?: Date
}
