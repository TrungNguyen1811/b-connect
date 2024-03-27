export interface IComment {
  postId: string
  commentId?: string
  commenterId: string
  content: string
  userName?: string
  avatarDir?: string
  createDate?: string
  updatedAt?: string
}
