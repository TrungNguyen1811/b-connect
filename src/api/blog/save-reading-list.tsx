import { authAxiosClient, axiosClient } from '../../lib/axios'

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
