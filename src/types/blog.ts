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
export interface IBlog {
  postId?: string
  userId?: string
  authorName?: string
  productImgs?: File | string
  ProductVideos?: File | string
  isTradePost: boolean
  title?: string
  content?: string
  listCate?: listCate[]
  createdAt?: string
  appUser?: string
  cateId?: string
  commentsId?: string
  likeId?: string
}

export interface IBlogg {
  postId?: string
  userId: string
  authorName?: string
  productImgs?: File | string
  ProductVideos?: File | string
  isTradePost?: boolean
  title: string
  content?: string
  listCate?: listCate[]
  createdAt?: string
  appUser?: string
  cateId?: string
  commentsId?: string
  likeId?: string
}

export interface IBlogResponse {
  postId?: string
  userId: string
  authorName?: string
  imageDir?: File | string
  videoDir?: File | string
  isTradePost?: boolean
  title?: string
  content?: string
  listCate?: listCate[]
  hearts?: number
  createdAt?: string
  appUser?: string
  cateId?: string
  commentsId?: string
  likeId?: string
}

export interface IResponsePost {
  postData: IBlogResponse
  username: string
  avatarDir: string
}
interface listCate {
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
  blog_Id: IBlogg['postId']
}
