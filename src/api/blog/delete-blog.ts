import { authAxiosClient } from 'src/lib/axios'

export async function deletePost(id: string) {
  return await authAxiosClient.delete(`/Post/delete-post?postId=${id}`).then((res) => res.data)
}

export async function removeUserSavedPost(postId: string) {
  return await authAxiosClient.delete(`/Post/remove-user-saved-post?postId=${postId}`).then((res) => res.data)
}

export async function deleteUserTargetedCategories(cateId: string) {
  return await authAxiosClient
    .delete(`/SocialMedia/delete-user-targeted-categories?cateId=${cateId}`)
    .then((res) => res.data)
}
