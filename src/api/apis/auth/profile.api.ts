import { AxiosError } from 'axios'
import { authAxiosClient, axiosClient } from 'src/lib/axios'
import { User } from 'src/types/user'
import { IProfileResponse } from 'src/types/user-response'

async function profileApi(token: string, callback: (error: AxiosError | null, result: User | null) => void) {
  return await axiosClient
    .get('/Account/get-user-profile', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((err) => {
      if (err.status === 200) {
        callback(null, err.data)
      }
    })
    .catch((error) => {
      callback(error, null)
    })
}

async function changePasswordApi(
  oldPassword: string,
  newPassword: string,
  callback: (error: AxiosError | null, result: User | null) => void,
) {
  return await authAxiosClient
    .patch<IProfileResponse>('/auth/change-password', {
      oldPassword,
      newPassword,
    })
    .then((err) => {
      if (err.status === 200) {
        callback(null, err.data.data)
      }
    })
    .catch((error) => {
      callback(error, null)
    })
}

export { changePasswordApi, profileApi }

async function getUserProfileApi(callback: (error: AxiosError | null, result: User | null) => void) {
  return await authAxiosClient
    .get('/Account/get-user-profile', {})
    .then((err) => {
      if (err.status === 200) {
        callback(null, err.data)
      }
    })
    .catch((error) => {
      callback(error, null)
    })
}
export { getUserProfileApi }
