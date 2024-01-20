import { IBook } from './books'

export interface ICart {
  _id?: string
  bookId?: IBook['_id']
  quantity: number
  price?: number
  creatAt?: Date
  updateAt?: Date
}
