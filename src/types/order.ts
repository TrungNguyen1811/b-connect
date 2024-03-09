import { IOrderCart } from './order-cart'
import { User } from './user'

export interface IOrder {
  _id?: string
  products?: IOrderCart[]
  customerId?: User['userId']
  addressId?: string
  totalPrice?: number
  paymentMethod?: 'COD' | 'VnPay'
  paymentReturnDTO?: IPaymentReturnDTO
  createdAt?: Date
  updatedAt?: Date
}

export enum ENUM_DEPOSIT_TYPE {
  COD = 'COD',
  VnPay = 'VnPay',
}

export interface ITransaction {
  transactionId: string
  paymentStatus: string
  paymentMessage: string
  paymentDate: string
  amount: number
  signature: string
}

export interface IPaymentReturnDTO {
  paymentStatus: string
  paymentMessage: string
  paymentDate: string
  paymentRefId: string
  amount: number
  signature: string
}
