import { IBlogg } from './blog'
import { IInterested } from './interested'

export interface User {
  userId?: string
  email?: string
  fullName?: string
  roles?: ROLE[]
  isSeller?: boolean
  isValidated?: boolean
  phone?: string
  avatarDir?: File | string
  addressId?: string | null
  username: string
  password?: string
  passwordAttempt?: number
  isBanned?: boolean
  agencies?: [
    {
      agencyId?: string
      agencyName: string
      ownerId: string
      postAddressId?: string
      logoUrl?: string
      businessType: 'Individual' | 'Company'
    },
  ]
  blockedDate?: Date
  salt?: string
  nicId?: string
  nicName?: string
  nicDob?: string
  nicHome?: string
  nicAddress?: string
  nicSex?: string
  nicNationality?: string
  nicDoe?: string
  features?: string
  issueDate?: string
  nicType?: 'old' | 'new' | 'old_back' | 'new_back' | 'cmnd_09_front' | 'cmnd_12_front' | 'cccd_12_front'
  interested?: IInterested['userId']
  blog?: IBlogg[]
  bio?: string
  url?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IRegisterNIC {
  userId: string
  nicId: string
  nicName: string
  nicDob: Date
  nicHome: string
  // nicAddress: string
  nicSex: string
  nicNationality: string
  nicDoe: Date
  // features: string
  // issueDate: Date
  // nicType: string
}

export enum ROLE {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  SELLER = 'Seller',
  CUSTOMER = 'CUSTOMER',
  BASEUSER = 'BaseUser',
}

export interface IRole {
  roleId?: string
  roleName?: string
  description?: string
}

export interface ICTCResponse<T = ICTCFrontSide | ICTCBackSide> {
  errorCode: number
  errorMessage: string
  data: T[]
}

export interface ICTCFrontSide {
  id: string
  id_prob: string
  name: string
  name_prob: string
  dob: string
  dob_prob: string
  sex: string
  sex_prob: string
  nationality: string
  nationality_prob: string
  home: string
  home_prob: string
  address: string
  address_prob: string
  address_entities: AddressEntities
  doe: string
  doe_prob: string
  type?: ENUM_CITIZEN_ID_TYPE
  type_new?: ENUM_CITIZEN_ID_TYPE
}

export interface AddressEntities {
  province: string
  district: string
  ward: string
  street: string
}
export interface ICTCBackSide {
  religion_prob: string
  religion: string
  ethnicity_prob: string
  ethnicity: string
  features: string
  features_prob: string
  issue_date: string
  issue_date_prob: string
  issue_loc_prob: string
  issue_loc: string
  type: ENUM_CITIZEN_ID_TYPE
}

export enum ENUM_CITIZEN_ID_TYPE {
  OLD = 'old',
  NEW = 'new',
  OLD_BACK = 'old_back',
  NEW_BACK = 'new_back',
  CMND_09_FRONT = 'cmnd_09_front',
  CMND_12_FRONT = 'cmnd_12_front',
  CCCD_12_FRONT = 'cccd_12_front',
}

export interface IReviewUser {
  revieweeId: string
  tradeDetailsId: string
  comment: string
  ratingPoint: string
  // video: File
  // image: File
}
