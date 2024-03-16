import { IBlogg } from './blog'
import { IInterested } from './interested'

export interface User {
  userId?: string
  email?: string
  fullName?: string
  role?: 'ADMIN' | 'MANAGER' | 'CUSTOMER' | 'Agency' | 'BaseUser'
  isSeller?: boolean
  isValidated?: boolean
  phone?: number
  avatar?: string
  addressId?: string | null
  username: string
  password?: string
  passwordAttempt?: number
  blocked?: boolean
  blockedDate?: Date
  salt?: string
  interested?: IInterested['userId']
  blog?: IBlogg[]
  bio?: string
  url?: string
  createdAt?: Date
  updatedAt?: Date
}

export enum ROLE {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  AGENCY = 'Agency',
  CUSTOMER = 'CUSTOMER',
  BASEUSER = 'BaseUser',
}
