import { ICategory } from './categories'
import { User } from './user'

export interface IInterested {
  _id: string
  user_id: User['userId']
  category_id: ICategory[]
  // topic_id: ITopic["_id"]
}
