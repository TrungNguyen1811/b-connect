import { IBook } from './books'

export interface IOrderCart {
  productId: IBook['productId']
  quantity: number
  creatAt?: Date
  updateAt?: Date
}
