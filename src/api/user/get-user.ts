import { authAxiosClient } from 'src/lib/axios'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getUserById(userId: string) {
  return authAxiosClient.get(`user/get/${userId}`).then((res) => res.data)
}
