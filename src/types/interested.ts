import { User } from './user'

export interface IInterested {
  _id: string
  user_id: User['userId']
  topic_id: ITopic['_id']
}

export interface ITopic {
  _id: string
  name: string
}
