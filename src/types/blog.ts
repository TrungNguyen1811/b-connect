import { ICategory } from './categories'
import { IComment } from './comment'
import { User } from './user'
export interface IContentBlog {
  id: string
  type: string
  children: {
    text: string
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
  _id?: string
  userId?: User['userId']
  category: string
  image?: string
  content: string
  title: string
  date?: string
}

export interface IBlogg {
  _id?: string
  userId?: User['userId']
  category: ICategory[]
  comments?: IComment[]
  like?: ILiked[]
  image?: string
  content: string
  title: string
  date?: string
}

export interface ILiked {
  _id?: string
  userId?: User['userId']
}

export interface IReadingList {
  _id?: string
  userId?: User['userId']
  blog_Id: IBlogg['_id']
}