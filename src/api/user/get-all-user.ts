import { faker } from '@faker-js/faker'
import { IResponse } from 'src/types/response'
import { User } from 'src/types/user'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getUserById(id: string) {
  // TODO: Replace this with an actual API call
  const user: User = {
    _id: faker.string.uuid(),
    username: faker.lorem.words(),
    avatar: faker.image.urlLoremFlickr({
      height: 100,
      width: 100,
    }),
  }

  return new Promise<User>((resolve) => {
    setTimeout(() => resolve(user), 1000)
  })
  // return authAxiosClient.get(`/book/${id}`);
}

export function getManyUsers() {
  // TODO: Replace this with an actual API call

  const users: User[] = Array.from({ length: 20 }, () => ({
    _id: faker.string.uuid(),
    username: faker.lorem.words(),
    avatar: faker.image.urlLoremFlickr({
      height: 100,
      width: 100,
    }),
    role: 'SELLER',
  }))

  const response: IResponse<User[]> = {
    data: users,
  }
  return new Promise<IResponse<User[]>>((resolve) => {
    setTimeout(() => resolve(response), 1000)
  })
}
