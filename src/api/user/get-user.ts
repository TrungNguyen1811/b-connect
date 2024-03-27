import { authAxiosClient } from 'src/lib/axios'
import { User } from 'src/types/user'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getUserById(userId: string) {
  return authAxiosClient.get(`user/get/${userId}`).then((res) => {
    const data: User = res.data
    return data
  })
}
