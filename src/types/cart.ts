import { IBook } from './books'

export interface ICart {
  book?: IBook
  _id: string
  bookId?: IBook['_id']
  quantity: number
  creatAt?: Date
  updateAt?: Date
}
