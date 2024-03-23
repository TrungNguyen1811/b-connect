import { authAxiosClient } from 'src/lib/axios'

export async function postBlogComment(data: {
  blog_id: string
  data: {
    comment: string
  }
}) {
  return await authAxiosClient
    .post(`/blog/comment/${data.blog_id}`, {
      comment: data.data.comment,
    })
    .then((res) => res.data)
}
