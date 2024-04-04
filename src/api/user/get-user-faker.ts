import { faker } from '@faker-js/faker'
import { ICategory, ROLE, User } from 'src/types'

const categories: ICategory[] = [
  { cateId: faker.string.uuid(), cateName: 'Technology' },
  { cateId: faker.string.uuid(), cateName: 'Science' },
  { cateId: faker.string.uuid(), cateName: 'Art' },
  { cateId: faker.string.uuid(), cateName: 'Music' },
  { cateId: faker.string.uuid(), cateName: 'Sports' },
]
export function getUserByIdFaker(id: string) {
  // TODO: Replace this with an actual API call
  const user: User = {
    userId: id,
    email: faker.lorem.paragraphs(),
    fullName: faker.lorem.words(),
    roles: [ROLE.ADMIN, ROLE.MANAGER],
    phone: faker.lorem.words(),
    avatar: faker.image.urlLoremFlickr({
      height: 100,
      width: 100,
    }),
    addressId: faker.lorem.words(),
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
    roles: [ROLE.ADMIN, ROLE.MANAGER],
    phone: faker.lorem.words(),
    avatar: faker.image.urlLoremFlickr({
      height: 100,
      width: 100,
    }),
    addressId: faker.lorem.words(),
    username: username,
  }

  return new Promise<User>((resolve) => {
    setTimeout(() => resolve(user), 1000)
  })
  // return authAxiosClient.get(`/book/${id}`);
}
