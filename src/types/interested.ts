import { ICategory } from './categories'
import { User } from './user'

export interface IInterested {
  interestedId: string
  userId: User['userId']
  cateId: ICategory[]
  // topic_id: ITopic["_id"]
}
