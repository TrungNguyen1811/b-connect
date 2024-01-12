import { ICart } from './cart'
import { User } from './user'

export interface IOrder {
  _id?: string
  cart?: ICart[]
  userId?: User
  totalPrice?: number
  createdAt?: Date
  updatedAt?: Date
}
