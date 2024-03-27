import { IAgency } from './agency'
import { IBook } from './books'

export interface IOrderCart {
  productId: IBook['productId']
  agencyId: IAgency['agencyId']
  quantity: number
  creatAt?: Date
  updateAt?: Date
}

export interface ICheckout {
  referenceId: string
  products: IOrderCart[]
}
