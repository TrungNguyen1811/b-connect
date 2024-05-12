export interface IComment {
  postId: string
  commentId?: string
  commenterId: string
  content: string
  username?: string
  avatarDir?: string
  createDate?: string
  updatedAt?: string
}
