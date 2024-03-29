import { User } from 'src/types/user'
import { authAxiosClient, axiosClient } from '../../lib/axios'

async function postUserApi(userData: User) {
  return await authAxiosClient
    .post('/user', userData, {})
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

export { postUserApi }

async function updateUserProfileApi(userData: User) {
  const formData = new FormData()
  formData.append('userId', userData?.userId as string)
  formData.append('email', userData?.email || '')
  formData.append('username', userData?.username || '')
  formData.append('phone', userData?.phone || '')
  if (userData?.avatar instanceof File) {
    formData.append('avatar', userData?.avatar)
  }

  return await axiosClient
    .post('/Account/update-user-profile', formData, {
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

export { updateUserProfileApi }
