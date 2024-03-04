import { ICategory } from './categories'
import { User } from './user'

export interface IInterested {
  interestedId: string
  userId: User['userId']
  categoryId: ICategory[]
  // topic_id: ITopic["_id"]
}
