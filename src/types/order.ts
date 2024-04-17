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
export interface IResponseItemsOrder {
  bookId: string
  bookName: string
  price: number
  quantity: number
  status: string
  agencyId: string
  agencyName: string
  bookDir: string
}
export interface IResponseOrder {
  orderId: string
  totalPrice: number
  date: string
  items: IResponseItemsOrder[]
}

export interface IResponseAgencyOrder {
  orderId: string
  customerId: string
  total_Price: number
  status: string
  paymentMethod: string
  quantity: number
  notes: string
  createdDate: string
  transactionId: string
  addressId: string
}

export interface IResponseAgencyOrderDetail {
  orderId: string
  customerId: string
  customerName: string
  bookName: string[]
  status: string
  paymentMethod: string
  quantity: number
  price: number
  notes: string
  transactionId: string
  address: string
  createdDate: string
}
