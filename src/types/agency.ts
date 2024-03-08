import { User } from './user'

export interface IAgency {
  agencyId: string
  agencyName: string
  ownerId: User['userId']
}
