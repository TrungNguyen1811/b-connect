export interface User {
  _id?: string
  email: string
  fullName: string
  role?: 'ADMIN' | 'SUPER_ADMIN' | 'USER'
  phone?: string
  avatar?: string
  address?: string | null
  username: string
  password: string
  passwordAttempt?: number
  salt?: string
  createdAt?: Date
  updatedAt?: Date
}

export enum ROLE {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  USER = 'USER',
}
