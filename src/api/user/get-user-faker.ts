import { IBook } from 'src/types/books'
import { faker } from '@faker-js/faker'
import { IResponse } from 'src/types/response'
import { IDefaultQuery } from 'src/types/requests'
import { ICategory, User } from 'src/types'

const categories: ICategory[] = [
  { _id: faker.string.uuid(), name: 'Technology' },
  { _id: faker.string.uuid(), name: 'Science' },
  { _id: faker.string.uuid(), name: 'Art' },
  { _id: faker.string.uuid(), name: 'Music' },
  { _id: faker.string.uuid(), name: 'Sports' },
]
export function getUserByIdFaker(id: string) {
  // TODO: Replace this with an actual API call
  const user: User = {
    userId: id,
    email: faker.lorem.paragraphs(),
    fullName: faker.lorem.words(),
    role: 'ADMIN' || 'MANAGER' || 'CUSTOMER' || 'SELLER' || 'BASEUSER',
    phone: faker.number.int({ min: 10000000, max: 100000000 }),
    avatar: faker.image.urlLoremFlickr({
      height: 100,
      width: 100,
    }),
    address: faker.lorem.words(),
    username: faker.lorem.words(),
    interested: [
      {
        _id: faker.string.uuid(),
        category_id: faker.helpers.arrayElements<ICategory>(categories, { min: 2, max: 4 }),
        user_id: faker.string.uuid(),
      },
    ],
  }

  return new Promise<User>((resolve) => {
    setTimeout(() => resolve(user), 1000)
  })
  // return authAxiosClient.get(`/book/${id}`);
}

export type GetManyBooksParams = {
  genres?: string
  category?: string
  status?: 'NEW' | 'OLD'
} & Partial<IDefaultQuery>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getManyBooks(params: GetManyBooksParams) {
  // TODO: Replace this with an actual API call

  const books: IBook[] = Array.from({ length: 100 }, () => ({
    _id: faker.string.uuid(),
    description: faker.lorem.paragraphs(),
    name: faker.lorem.word({ length: 4 }),
    rating: faker.number.int({ min: 1, max: 5 }),
    image: faker.image.urlLoremFlickr({
      height: 100,
      width: 100,
      category: 'book',
    }),
    price: faker.number.int({ min: 10, max: 1000000 }),
    author: faker.lorem.word(),
    title: faker.lorem.words(),
    status: 'NEW',
    genres: Math.random() < 0.5 ? 'popular' : 'best',
    category: [
      {
        _id: faker.string.uuid(),
        name: faker.lorem.word({ length: 4, strategy: 'shortest' }),
      },
    ],

    reviews: [
      {
        _id: faker.string.uuid(),
        product_id: faker.string.uuid(),
        user_id: {
          _id: faker.string.uuid(),
          email: faker.internet.email(),
          avatar: faker.image.avatar(),
          fullName: faker.lorem.words(),
        },
        title: faker.lorem.sentence(),
        details: faker.lorem.paragraph(),
        rating: faker.number.int({ min: 1, max: 5 }),
        voteCount: faker.number.int({ min: 1, max: 5 }),
        status: faker.lorem.words(),
        createdAt: faker.date.recent().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
      },
    ],
  }))

  const response: IResponse<IBook[]> = {
    data: books,
  }
  return new Promise<IResponse<IBook[]>>((resolve) => {
    setTimeout(() => resolve(response), 1000)
  })
}
