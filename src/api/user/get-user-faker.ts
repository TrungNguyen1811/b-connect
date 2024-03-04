import { faker } from '@faker-js/faker'
import { ICategory, User } from 'src/types'

const categories: ICategory[] = [
  { categoryId: faker.string.uuid(), name: 'Technology' },
  { categoryId: faker.string.uuid(), name: 'Science' },
  { categoryId: faker.string.uuid(), name: 'Art' },
  { categoryId: faker.string.uuid(), name: 'Music' },
  { categoryId: faker.string.uuid(), name: 'Sports' },
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
  }

  return new Promise<User>((resolve) => {
    setTimeout(() => resolve(user), 1000)
  })
  // return authAxiosClient.get(`/book/${id}`);
}

export function getUserByUserName(username: string) {
  // TODO: Replace this with an actual API call
  const user: User = {
    userId: faker.string.uuid(),
    email: faker.lorem.paragraphs(),
    fullName: faker.lorem.words(),
    role: 'ADMIN' || 'MANAGER' || 'CUSTOMER' || 'SELLER' || 'BASEUSER',
    phone: faker.number.int({ min: 10000000, max: 100000000 }),
    avatar: faker.image.urlLoremFlickr({
      height: 100,
      width: 100,
    }),
    address: faker.lorem.words(),
    username: username,
  }

  return new Promise<User>((resolve) => {
    setTimeout(() => resolve(user), 1000)
  })
  // return authAxiosClient.get(`/book/${id}`);
}
