import { axiosClient } from 'src/lib/axios'
import { IComment } from 'src/types/comment'

export async function getPostCommentByPostId(postId: string) {
  return axiosClient.get(`/post/get-comment-by-post-id?postId=${postId}&PageNumber=1&PageSize=50`).then((res) => {
    const data: IComment[] = res.data
    return data
  })
}
export async function postPostComment(data: IComment) {
  return await axiosClient
    .post('/post/add-comment', {
      postId: data.postId,
      commenterId: data.commenterId,
      content: data.content,
    })
    .then((res) => res.data)
}

export async function putPostComment(data: {
  commentId: string
  postId: string
  commenterId: string
  content: string
}) {
  const formData = new FormData()
  formData.append('postId', data.postId)
  formData.append('commenterId', data.commenterId)
  formData.append('commentId', data.commentId)
  formData.append('content', data.content)
  return await axiosClient
    .put('/post/update-comment', {
      formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)
}

export async function deletePostCommentByCommentId(commentId: string) {
  return axiosClient.get(`/post/delete-comment?commentId=${commentId}`).then((res) => res.data)
}
