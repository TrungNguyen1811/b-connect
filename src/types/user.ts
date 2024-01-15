export interface User {
  _id?: string
  email: string
  fullName: string
  role?: 'ADMIN' | 'MANAGER' | 'CUSTOMER' | 'SELLER'
  phone?: string
  avatar?: string
  address?: string | null
  username: string
  password: string
  passwordAttempt?: number
  blocked?: boolean
  blockedDate?: Date
  salt?: string
  createdAt?: Date
  updatedAt?: Date
}

export enum ROLE {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  SELLER = 'SELLER',
  CUSTOMER = 'CUSTOMER',
}
