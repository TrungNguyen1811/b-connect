import { IBook } from './books'

export interface IInventory {
  sellerId: string
  quantity: number
  bookId: IBook['_id']
}
