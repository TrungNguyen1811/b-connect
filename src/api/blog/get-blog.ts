import { faker } from '@faker-js/faker'
import { IResponse } from 'src/types/response'
import { IBlogg } from 'src/types/blog'
import { ICategory } from 'src/types/categories'

const fakeContentArray = Array.from({ length: 7 }, () => ({
  id: faker.string.uuid(),
  type: 'p',
  children: [{ text: faker.lorem.sentence() }],
}))

// Convert the fake content array to a JSON string
const fakeContent = JSON.stringify(fakeContentArray)

const createCategory = (): ICategory => ({
  _id: faker.string.uuid(),
  name: faker.lorem.word({ length: 4, strategy: 'shortest' }),
})

const fakeCommentArray: {
  _id: string
  user_id: {
    userId: string
    email: string
    avatar: string
    fullName: string
  }
  comment: string
  createdAt: string
}[] = Array.from({ length: 10 }, () => ({
  _id: faker.string.uuid(),
  user_id: {
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
  // TODO: Replace this with an actual API call

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
