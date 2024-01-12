import { faker } from '@faker-js/faker'
import { IResponse } from 'src/types/response'
import { ICategory } from 'src/types'

export function getCategoryById(id: string) {
  // TODO: Replace this with an actual API call
  const category: ICategory = {
    _id: id,
    description: faker.lorem.paragraphs(),
    name: faker.lorem.word(),
    img: faker.image.urlLoremFlickr({
      height: 100,
      width: 100,
    }),
  }

  return new Promise<ICategory>((resolve) => {
    setTimeout(() => resolve(category), 1000)
  })
  // return authAxiosClient.get(`/book/${id}`);
}

export function getManyCategories() {
  // TODO: Replace this with an actual API call

  const categories: ICategory[] = Array.from({ length: 20 }, () => ({
    _id: faker.string.uuid(),
    description: faker.lorem.paragraphs(),
    name: faker.lorem.sentence(),
    img: faker.image.urlLoremFlickr({
      height: 100,
      width: 100,
    }),
  }))

  const response: IResponse<ICategory[]> = {
    data: categories,
  }
  return new Promise<IResponse<ICategory[]>>((resolve) => {
    setTimeout(() => resolve(response), 1000)
  })
}
