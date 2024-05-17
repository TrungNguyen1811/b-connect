import { User } from './user'

export interface InitialValueItem {
  id: string
  type: string
  children: { text: string }[]
}

export interface IContentBlog {
  id: string
  type: string
  children: {
    text?: string
    bold?: boolean
    italic?: boolean
    underline?: boolean
    strikethrough?: boolean
    fontSize?: string
    backgroundColor?: string
    color?: string
    code?: boolean
    url?: string
  }[]
}
export interface IPostResponse {
  postId?: string
  userId: string
  authorName?: string
  imageDir?: string
  videoDir?: string
  isTradePost?: boolean
  isLock?: boolean
  isBanned?: boolean
  title?: string
  content?: string
  listCate?: IListCate[]
  hearts?: number
  createdAt?: string
  appUser?: string
}

export interface IResponsePost {
  postData: IPostResponse
  username: string
  avatarDir: string
  tags: IListCate[]
  readingTime: string
  totalLikes: number
  totalComments: number
  totalFollow: number
}

export interface IListCate {
  cateId: string
  cateName: string
}

export interface ILiked {
  _id?: string
  userId?: User['userId']
}

export interface IReadingList {
  _id?: string
  userId?: User['userId']
  blog_Id: IPostResponse['postId']
}

export interface IResponseTag {
  cateId: string
  cateName: string
}

export interface ISubmitTrade {
  postId: string
  tradeDetailsId: string
  isPostOwner: boolean
  city_Province: string
  district: string
  subDistrict: string
  rendezvous: string
  phone: string
  note: string
}

export interface IEvidence {
  tradeDetailsId: string
  deliveryCode: string
  video: File
}

export interface IPaymentTrade {
  transactionId: string
  tradeDetailsId: string
  isUsingMiddle: boolean
  amount?: number
}
export interface IPaymentRefund {
  transId: string
  amount: number
}
