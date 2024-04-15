export interface IBook {
  productId?: string
  name: string
  author: string
  bookDir?: string
  bookImg?: File | string
  backgroundImg?: File | string
  description: string
  price: number
  quantity: number
  stock: number
  agencyId?: string
  agencyName?: string
  category?: string[]
  reviews?: IReview['ratingRecordId']
  rating: number
  ratingId?: string
  isAvailable?: boolean | undefined
  type?: 'New' | 'Old'
  numberOfBookSold?: number
  numberOfUnitSold?: number
  createdDate?: Date
  publishDate?: Date
}

export interface IResponseBook {
  item1: IBook
  item2: number
}

export enum BOOK_TYPE {
  NEW = 'New',
  OLD = 'Old',
}

export interface IReview {
  ratingRecordId?: string
  ratingId: string
  userId: string
  ratingPoint: string
  comment: string
  purchasesVerify?: string
  createdAt?: string
  updatedAt?: string
}

export interface IReply {
  ReplyId?: string
  ratingRecordId: string
  agencyId?: string
  replyText: string
}

export interface IReviewResponse {
  ratingRecordId?: string
  ratingId: string
  reviewerId: string
  ratingPoint: number
  comment: string
  username: string
  avatarDir: string
  email: string
  createdDate?: string
  reply?: IReplyTest
}

export interface IReplyTest {
  replyId: string
  replyText: string
  userId: string
  createdDate: string
  email: string
  username: string
  avatarDir: string
}

export interface IReplyResponse {
  replyId: string
  replyText: string
  AgencyId: string
  createdDate: Date
  AgencyName: string
  logoUrl: string
}

export interface IListReplyResponse {
  ratingRecordId: string
  bookId: string
  bookName: string
  ReviewerId: string
  username: string
  email: string
  avatarDir: string
  ratingPoint: string
  comment: string
  reply: IReplyTest
}
export interface IBookGroup {
  bookGroupId?: string
  bookGroupName: string
  bookGroupImg?: File
  description: string
}

export interface IResponseBookGroup {
  bookGroupId: string
  bookGroupName: string
  imgDir: string
  description: string
  agencyId: string
}

export interface IBookTest {
  productId?: string
  name: string
  author: string
  bookDir?: string
  bookImg?: File | string
  backgroundImg?: File | string
  description: string
  price: number
  quantity?: number
  stock?: number
  agencyId?: string
  agencyName?: string
  category?: string[]
  reviews?: IReview['ratingRecordId']
  ratingId?: string
  isAvailable?: boolean | undefined
  type?: 'New' | 'Old'
  genres?: 'popular' | 'best'
  createdDate?: Date
  publishDate?: Date
}
