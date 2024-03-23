import { User } from './user'

export interface IAgency {
  agencyId?: string
  agencyName?: string
  logoImg: File | string
  ownerId?: User['userId']
  rendezvous?: string
  businessType?: 'Individual' | 'Company'
}
