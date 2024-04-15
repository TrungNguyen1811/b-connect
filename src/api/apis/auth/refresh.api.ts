import { axiosClient } from 'src/lib/axios'
export default async function refreshToken(token: string) {
  return axiosClient
    .post(
      '/Account/RefreshToken',
      { token },
      {
        withCredentials: true,
      },
    )
    .then((res) => {
      const response = {
        status: res.status,
        data: res.data,
      }
      return response
    })
}
