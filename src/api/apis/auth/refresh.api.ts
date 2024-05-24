import { axiosClient } from 'src/lib/axios'
export default async function refreshToken() {
  return axiosClient
    .get('/account/refresh-token', {
      withCredentials: true,
    })
    .then((res) => {
      const response = {
        status: res.status,
        data: res.data,
        accessToken: res.data,
      }
      return response
    })
}
