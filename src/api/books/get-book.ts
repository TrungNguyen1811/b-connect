import { IBook } from 'src/types/books'
// import { faker } from '@faker-js/faker'
import { IResponse, IResponsePagination } from 'src/types/response'
import { axiosClient } from 'src/lib/axios'
import { IDefaultQuery } from 'src/types/requests'

// export function getBookById(id: string) {
//   // TODO: Replace this with an actual API call
//   const book: IBook = {
//     _id: id,
//     description: faker.lorem.paragraphs(),
//     name: faker.lorem.words(),
//     image: faker.image.urlLoremFlickr({
//       height: 100,
//       width: 100,
//       category: 'book',
//     }),
//     price: faker.number.int({ min: 10, max: 1000000 }),
//     author: faker.lorem.words(),
//     title: faker.lorem.words(),
//     status: 'NEW',
//     genres: Math.random() < 0.5 ? 'popular' : 'best',
//     category: [
//       {
//         _id: faker.string.uuid(),
//         name: faker.lorem.word({ length: 4, strategy: 'shortest' }),
//       },
//     ],

//     inventory: [
//       {
//         bookId: id,
//         sellerId: Math.random() < 0.5 ? '1' : '2',
//         quantity: faker.number.int({ min: 10, max: 1000000 }),
//       },
//     ],

//     reviews: [
//       {
//         _id: faker.string.uuid(),
//         product_id: faker.string.uuid(),
//         user_id: {
//           userId: faker.string.uuid(),
//           email: faker.internet.email(),
//           avatar: faker.image.avatar(),
//           fullName: faker.lorem.words(),
//         },
//         title: faker.lorem.sentence(),
//         details: faker.lorem.paragraph(),
//         rating: faker.number.int({ min: 1, max: 5 }),
//         voteCount: faker.number.int({ min: 1, max: 5 }),
//         status: faker.lorem.words(),
//         createdAt: faker.date.recent().toISOString(),
//         updatedAt: faker.date.recent().toISOString(),
//       },
//     ],
//   }

//   return new Promise<IBook>((resolve) => {
//     setTimeout(() => resolve(book), 1000)
//   })
//   // return authAxiosClient.get(`/book/${id}`);
// }

// export type GetManyBooksParams = {
//   genres?: string
//   category?: string
//   status?: 'NEW' | 'OLD'
// } & Partial<IDefaultQuery>

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export function getManyBooks(params: GetManyBooksParams) {
//   // TODO: Replace this with an actual API call

//   const books: IBook[] = Array.from({ length: 100 }, () => ({
//     _id: faker.string.uuid(),
//     description: faker.lorem.paragraphs(),
//     name: faker.lorem.word({ length: 4 }),
//     rating: faker.number.int({ min: 1, max: 5 }),
//     image: faker.image.urlLoremFlickr({
//       height: 100,
//       width: 100,
//       category: 'book',
//     }),
//     price: faker.number.int({ min: 10, max: 1000000 }),
//     author: faker.lorem.word(),
//     title: faker.lorem.words(),
//     status: 'NEW',
//     genres: Math.random() < 0.5 ? 'popular' : 'best',
//     category: [
//       {
//         _id: faker.string.uuid(),
//         name: faker.lorem.word({ length: 4, strategy: 'shortest' }),
//       },
//     ],

//     reviews: [
//       {
//         _id: faker.string.uuid(),
//         product_id: faker.string.uuid(),
//         user_id: {
//           _id: faker.string.uuid(),
//           email: faker.internet.email(),
//           avatar: faker.image.avatar(),
//           fullName: faker.lorem.words(),
//         },
//         title: faker.lorem.sentence(),
//         details: faker.lorem.paragraph(),
//         rating: faker.number.int({ min: 1, max: 5 }),
//         voteCount: faker.number.int({ min: 1, max: 5 }),
//         status: faker.lorem.words(),
//         createdAt: faker.date.recent().toISOString(),
//         updatedAt: faker.date.recent().toISOString(),
//       },
//     ],
//   }))

//   const response: IResponse<IBook[]> = {
//     data: books,
//   }
//   return new Promise<IResponse<IBook[]>>((resolve) => {
//     setTimeout(() => resolve(response), 1000)
//   })
// }

export type IGetBookResponse = IResponse<IBook>

export async function getBookById(book_Id: string) {
  return await axiosClient
    .get(`/products/get-product-by-id?bookId=${book_Id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data)
}

export type GetManyBooksParams = {
  genres?: string
  category?: string
  status?: 'NEW' | 'OLD'
} & Partial<IDefaultQuery>

export async function getManyBooks(params: GetManyBooksParams) {
  return axiosClient
    .get('/products/get-book-by-name', {
      params,
    })
    .then((res) => {
      const data: IBook[] = res.data
      const pagination = res.headers['x-pagination']
      const parseJson: IResponsePagination = JSON.parse(pagination)
      const dataAll: IResponse<IBook[]> = {
        data: data,
        _metadata: data,
        _pagination: parseJson,
      }
      return dataAll
    })
}

export async function getTopBooks() {
  return axiosClient.get('/products/get-all-book', {}).then((res) => {
    const data: IBook[] = res.data
    const pagination = res.headers['x-pagination']
    const dataAll: IResponse<IBook[]> = {
      data: data,
      _metadata: data,
      _pagination: pagination,
    }
    return dataAll
  })
}
