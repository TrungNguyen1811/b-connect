import { IBook } from './books'

export interface IOrderCart {
  book?: IBook
  _id: string
  bookId?: IBook['productId']
  quantity: number
  creatAt?: Date
  updateAt?: Date
}
