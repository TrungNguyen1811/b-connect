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
  isBanned?: boolean
  agencies?: [
    {
      agencyId?: string
      agencyName?: string
      ownerId?: string
      postAddressId?: string
      logoUrl?: string
      businessType?: 'Individual' | 'Company'
    },
  ]
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

export interface IRole {
  roleId?: string
  roleName?: string
  description?: string
}
