import { ICart } from './cart'
import { User } from './user'

export interface IOrder {
  _id?: string
  cart?: ICart[]
  userId?: User
  address?: string
  totalPrice?: number
  depositType?: 'COD' | 'ONLINE'
  createdAt?: Date
  updatedAt?: Date
}

export enum ENUM_DEPOSIT_TYPE {
  COD = 'COD',
  ONLINE = 'ONLINE',
}
