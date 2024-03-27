import { IReadingList } from 'src/types/blog'
import { authAxiosClient, axiosClient } from '../../lib/axios'
import { faker } from '@faker-js/faker'

export function getReadingListFaker(id: string) {
  // TODO: Replace this with an actual API call

  const readingList: IReadingList[] = Array.from({ length: 10 }, () => ({
    _id: id,
    userId: faker.string.uuid(),
    blog_Id: faker.string.uuid(),
  }))

  return new Promise<IReadingList[]>((resolve) => {
    setTimeout(() => resolve(readingList), 1000)
  })
}

async function getReadingList(user_id: string) {
  return await axiosClient
    .get(`/reading-list/${user_id}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        // Handle other HTTP statuses as needed
        throw new Error('Request failed with status ' + response.status)
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      throw error
    })
}

export { getReadingList }

async function postReadingList(blog_id: string, user_id: string) {
  return await authAxiosClient
    .post(`/reading-list`, { blog_id, user_id }, {})
    .then((response) => {
      if (response.status === 201) {
        return response.data
      } else {
        // Handle other HTTP statuses as needed
        throw new Error('Request failed with status ' + response.status)
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      throw error
    })
}

export { postReadingList }
