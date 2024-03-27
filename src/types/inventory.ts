import { IBook } from './books'

export interface IInventory {
  sellerId: string
  sellerName: string
  quantity: number
  bookId: IBook['productId']
}
