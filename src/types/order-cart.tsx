import { IBook } from './books'

export interface IOrderCart {
  book?: IBook
  _id: string
  bookId?: IBook['_id']
  quantity: number
  creatAt?: Date
  updateAt?: Date
}
