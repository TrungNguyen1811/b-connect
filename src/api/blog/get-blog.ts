import { IBlogg, IResponsePost, IResponseTag } from 'src/types/blog'
import { ICategory } from 'src/types/categories'
import axios from 'axios'
import { authAxiosClient, axiosClient } from 'src/lib/axios'
import { IDefaultQuery } from 'src/types/requests'
import { IResponse, IResponsePagination } from 'src/types/response'

export async function getBlogActive(): Promise<IBlogg[]> {
  return axiosClient.get(`/Post/mostliked`).then((res) => res.data)
}

export async function getInterestedByUserId(userId: string): Promise<ICategory[]> {
  return axios.get(`/blog/interested/${userId}`).then((res) => res.data)
}

export async function getPostByIdApi(id: string) {
  return axiosClient.get(`/Post/get-post-by-id?postId=${id}`).then((res) => {
    const data: IResponsePost = res.data
    return data
  })
}

export async function getCheckLikePosts(postId: string) {
  return authAxiosClient.get(`/Post/get-post-likes?postId=${postId}`).then((res) => {
    const data = res.data
    return data
  })
}

export async function getUserSavedPosts() {
  return authAxiosClient.get(`/Post/get-user-saved-posts`).then((res) => {
    const data: IResponsePost[] = res.data
    return data
  })
}

export async function getUserTargetedTags() {
  return authAxiosClient.get('/SocialMedia/get-user-targeted-categories').then((res) => {
    const data: IResponseTag[] = res.data
    return data
  })
}

export type GetManyPostsParams = {
  category?: string
} & Partial<IDefaultQuery>

export async function getAllPosts(params: GetManyPostsParams) {
  return axiosClient
    .get('/Post/get-all-post', {
      params,
    })
    .then((res) => {
      const data: IResponsePost[] = res.data
      const pagination = res.headers['x-pagination']
      const parseJson: IResponsePagination = JSON.parse(pagination)
      const dataAll: IResponse<IResponsePost[]> = {
        data: data,
        _metadata: data,
        _pagination: parseJson,
      }
      return dataAll
    })
}

export async function getPostByUserId(userId: string) {
  return axiosClient.get(`/Post/get-post-by-user?userId=${userId}`).then((res) => {
    const data: IResponsePost[] = res.data
    return data
  })
}

export async function checkUserLikePost(postId: string) {
  return authAxiosClient.get(`/Post/check-user-like-or-not?postId=${postId}`).then((res) => {
    const data = res.data
    return data
  })
}

export interface IResponsePostLocked {
  postId: string
  status: string
  title: string
  postOwner: string
  avatarDir: string
  createDate: Date
}
export async function getLockedPostByUserId(id: string) {
  return authAxiosClient.get(`/trading/get-locked-post-by-userId?traderType=${id}`).then((res) => {
    const data: IResponsePostLocked[] = res.data
    return data
  })
}
