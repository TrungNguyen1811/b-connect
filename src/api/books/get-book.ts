import { IBook } from 'src/types/books'
import { faker } from '@faker-js/faker'
import { IResponse } from 'src/types/response'
import { IDefaultQuery } from 'src/types/requests'

export function getBookById(id: string) {
  // TODO: Replace this with an actual API call
  const book: IBook = {
    _id: id,
    description: faker.lorem.paragraphs(),
    name: faker.lorem.words(),
    image: faker.image.urlLoremFlickr({
      height: 100,
      width: 100,
      category: 'book',
    }),
    price: faker.number.int(),
    author: faker.lorem.words(),
    title: faker.lorem.words(),
    status: 'NEW',
    genres: Math.random() < 0.5 ? 'popular' : 'best', // Randomly assign 'popular' or 'best'
  }

  return new Promise<IBook>((resolve) => {
    setTimeout(() => resolve(book), 1000)
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
    price: faker.number.int(1000000),
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
  }))

  const response: IResponse<IBook[]> = {
    data: books,
  }
  return new Promise<IResponse<IBook[]>>((resolve) => {
    setTimeout(() => resolve(response), 1000)
  })
}
