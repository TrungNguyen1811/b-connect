import { User } from 'src/types/user'
import { authAxiosClient } from '../../lib/axios'

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
  formData.append('UserId', userData?.userId as string)
  formData.append('Email', userData?.email || '')
  formData.append('Username', userData?.username || '')
  formData.append('Phone', userData?.phone || '')
  if (userData?.avatarDir instanceof File) {
    formData.append('AvatarDir', userData?.avatarDir)
  } else {
    formData.append('AvatarDir', '')
  }

  return await authAxiosClient
    .put('/Account/update-user-profile', formData, {
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
