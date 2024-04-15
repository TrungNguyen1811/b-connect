import { faker } from '@faker-js/faker'
import { IResponse } from 'src/types/response'
import { IBlogg, IResponsePost, IResponseTag } from 'src/types/blog'
import { ICategory } from 'src/types/categories'
import axios from 'axios'
import { authAxiosClient, axiosClient } from 'src/lib/axios'
import { IDefaultQuery } from 'src/types/requests'

const fakeContentArray = Array.from({ length: 7 }, () => ({
  id: faker.string.uuid(),
  type: 'p',
  children: [{ text: faker.lorem.sentence() }],
}))

// Convert the fake content array to a JSON string
const fakeContent = JSON.stringify(fakeContentArray)

const createCategory = (): ICategory => ({
  cateId: faker.string.uuid(),
  cateName: faker.lorem.word({ length: 4, strategy: 'shortest' }),
})

const fakeCommentArray: {
  commentId: string
  userId: {
    userId: string
    email: string
    avatar: string
    fullName: string
  }
  comment: string
  createdAt: string
}[] = Array.from({ length: 10 }, () => ({
  commentId: faker.string.uuid(),
  userId: {
    userId: faker.string.uuid(),
    email: faker.lorem.word({ length: 10, strategy: 'shortest' }),
    avatar: faker.image.urlLoremFlickr({
      height: 50,
      width: 50,
    }),
    fullName: faker.lorem.word({ length: 10, strategy: 'shortest' }),
  },
  comment: faker.lorem.words({ min: 10, max: 150 }),
  createdAt: faker.date.recent().toISOString(),
}))

const fakeLikeArray: {
  _id: string
  user_id: string
}[] = Array.from({ length: 7 }, () => ({
  _id: faker.string.uuid(),
  user_id: faker.string.uuid(),
}))

export function getBlogById(id: string) {
  // TODO: Replace this with an actual API call
  const blog: IBlogg = {
    postId: faker.string.uuid(),
    userId: '',
    title: faker.lorem.words(),
    productImgs: faker.image.urlLoremFlickr({
      height: 100,
      width: 100,
    }),
    content: fakeContent,
    createdAt: faker.date.recent().toISOString(),
  }

  return new Promise<IBlogg>((resolve) => {
    setTimeout(() => resolve(blog), 1000)
  })
  // return authAxiosClient.get(`/book/${id}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getManyBlogBooks() {
  // TODO: Replace this with an actual API call

  const blogs: IBlogg[] = Array.from({ length: 100 }, () => ({
    _id: faker.string.uuid(),
    userId: '',
    title: faker.lorem.words(),
    image: faker.image.urlLoremFlickr({
      height: 100,
      width: 100,
    }),
    content: fakeContent,
    category: [
      {
        _id: faker.string.uuid(),
        name: faker.lorem.word({ length: 10, strategy: 'shortest' }),
      },
    ],
    like: fakeLikeArray,
    comments: fakeCommentArray,
    date: faker.date.recent().toISOString(),
  }))

  const response: IResponse<IBlogg[]> = {
    data: blogs,
  }
  return new Promise<IResponse<IBlogg[]>>((resolve) => {
    setTimeout(() => resolve(response), 1000)
  })
}

export function getBlogsByUserId(id: string) {
  const blogs: IBlogg[] = Array.from({ length: 100 }, () => ({
    _id: faker.string.uuid(),
    userId: id,
    title: faker.lorem.words(),
    image: faker.image.urlLoremFlickr({
      height: 100,
      width: 100,
    }),
    content: fakeContent,
    category: [
      {
        _id: faker.string.uuid(),
        name: faker.lorem.word({ length: 10, strategy: 'shortest' }),
      },
    ],
    like: fakeLikeArray,
    comments: fakeCommentArray,
    date: faker.date.recent().toISOString(),
  }))

  const response: IResponse<IBlogg[]> = {
    data: blogs,
  }
  return new Promise<IResponse<IBlogg[]>>((resolve) => {
    setTimeout(() => resolve(response), 1000)
  })
}

export function getBlogActive(number: number) {
  // TODO: Replace this with an actual API call

  const blogs: IBlogg[] = Array.from({ length: number }, () => ({
    _id: faker.string.uuid(),
    userId: '',
    title: faker.lorem.words({ min: 3, max: 7 }),
    image: faker.image.urlLoremFlickr({
      height: 100,
      width: 100,
    }),
    content: fakeContent,
    category: [
      {
        _id: faker.string.uuid(),
        name: faker.lorem.word({ length: 10, strategy: 'shortest' }),
      },
    ],
    like: fakeLikeArray,
    comments: fakeCommentArray,
    date: faker.date.recent().toISOString(),
  }))

  const response: IResponse<IBlogg[]> = {
    data: blogs,
  }
  return new Promise<IResponse<IBlogg[]>>((resolve) => {
    setTimeout(() => resolve(response), 1000)
  })
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
      return data
    })
}

export async function getPostByUserId(userId: string) {
  return axiosClient.get(`/Post/get-post-by-user?userId=${userId}`).then((res) => {
    const data: IResponsePost[] = res.data
    return data
  })
}

export interface IResponsePostLocked {
  postId: string
  status: string
  title: string
}
export async function getLockedPostByUserId(id: string) {
  return authAxiosClient.get(`/Post/trading/get-locked-post-by-userId?traderType=${id}`).then((res) => {
    const data: IResponsePostLocked[] = res.data
    return data
  })
}
