import { User } from './user'

export interface IComment {
  commentId: string
  userId: Pick<User, 'userId' | 'email' | 'avatar' | 'fullName'>
  comment?: string
  createdAt?: string
  updatedAt?: string
}
