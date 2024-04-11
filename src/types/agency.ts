import { User } from './user'

export interface IAgency {
  agencyId?: string
  agencyName?: string
  logoImg: File | string
  ownerId?: User['userId']
  rendezvous?: string
  businessType?: 'Individual' | 'Company'
}

export interface IAgencyAnalyst {
  agencyId?: string
  agencyName?: string
  TotalQuantityOfBookInInventory: number
  TotalBookSold?: number
  TotalRevenue?: number
  revenueByMonths?: { [month: string]: number }
}
export interface ITotalRevenue {
  agencyId?: string
  startDate: Date
  endDate?: Date
}
