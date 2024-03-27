import { authAxiosClient, axiosClient } from 'src/lib/axios'

async function postInterestedPost(postId: string, interestedId: string) {
  const data = new FormData()
  data.append('postId', postId)
  data.append('InteresterId', interestedId)

  return await axiosClient
    .post('/Post/add-post-interester', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
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
export { postInterestedPost }

async function deleteInterestedPost(interestedId: string) {
  return await authAxiosClient
    .delete(`/Post/delete-post-interest?interestedId=${interestedId}`)
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
export { deleteInterestedPost }
