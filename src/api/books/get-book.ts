import { IBook } from 'src/types/books'
import { faker } from '@faker-js/faker'
import { IResponse } from 'src/types/response'

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
  }

  return new Promise<IBook>((resolve) => {
    setTimeout(() => resolve(book), 1000)
  })
  // return authAxiosClient.get(`/book/${id}`);
}

export function getManyBooks() {
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
    // sale: {
    //   _id: faker.string.uuid(),
    //   img: faker.image.urlLoremFlickr({
    //     height: 100,
    //     width: 100,
    //     category: 'book',
    //   }),
    //   name: faker.lorem.word({ length: 4 }),
    // },
  }))

  const response: IResponse<IBook[]> = {
    data: books,
  }
  return new Promise<IResponse<IBook[]>>((resolve) => {
    setTimeout(() => resolve(response), 1000)
  })
}
