import { authAxiosClient } from 'src/lib/axios'
import { User } from 'src/types/user'

export async function getUserById(userId: string) {
  return authAxiosClient.get(`/user/get-user-by-userId?userId=${userId}`).then((res) => {
    const data: User = res.data
    return data
  })
}

export async function getUserByUserName(username: string) {
  return authAxiosClient.get(`/user/get-user-by-username?username=${username}`).then((res) => {
    const data: User = res.data
    return data
  })
}
