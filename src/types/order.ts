import { IOrderCart } from './order-cart'
import { User } from './user'

export interface IOrder {
  _id?: string
  products?: IOrderCart[]
  customerId?: User
  addressId?: string
  totalPrice?: number
  depositType?: 'COD' | 'ONLINE'
  paymentReturnDTO: paymentReturnDTO
  createdAt?: Date
  updatedAt?: Date
}

export enum ENUM_DEPOSIT_TYPE {
  COD = 'COD',
  ONLINE = 'ONLINE',
}

export interface paymentReturnDTO {
  paymentId: string
  paymentStatus: string
  paymentMessage: string
  paymentDate: string
  paymentRefId: string
  amount: 0
  signature: string
}
