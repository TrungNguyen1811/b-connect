import { axiosClient } from 'src/lib/axios'
export default async function refreshToken() {
  return axiosClient
    .post('/Account/RefreshToken', {
      withCredentials: true,
    })
    .then((res) => {
      const response = {
        status: res.status,
        data: res.data,
      }
      return response
    })
}
