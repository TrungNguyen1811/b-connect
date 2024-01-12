export interface IBook {
  _id: string
  name: string
  author?: string
  image?: string
  rating?: number
  price?: number
  description?: string
  createdAt?: Date
  updatedAt?: Date
  // sale: ISale[]
}
