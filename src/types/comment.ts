import { User } from './user'

export interface IComment {
  _id: string
  user_id: Pick<User, 'userId' | 'email' | 'avatar' | 'fullName'>
  comment?: string
  createdAt?: string
  updatedAt?: string
}
