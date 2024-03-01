import { IBlogg } from './blog'
import { IInterested } from './interested'

export interface User {
  userId?: string
  email?: string
  fullName?: string
  role?: 'ADMIN' | 'MANAGER' | 'CUSTOMER' | 'SELLER' | 'BASEUSER'
  phone?: number
  avatar?: string
  address?: string | null
  username: string
  password?: string
  passwordAttempt?: number
  blocked?: boolean
  blockedDate?: Date
  salt?: string
  interested?: IInterested[]
  blog?: IBlogg[]
  bio?: string
  url?: string
  createdAt?: Date
  updatedAt?: Date
}

export enum ROLE {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  SELLER = 'SELLER',
  CUSTOMER = 'CUSTOMER',
  BASEUSER = 'BaseUser',
}
