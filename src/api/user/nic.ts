import axios, { AxiosResponse } from 'axios'
import { authAxiosClient } from 'src/lib/axios'
import { ICTCResponse, INIC } from 'src/types/user'

export async function postNICApi<T>(formData: FormData) {
  return axios
    .post<unknown, AxiosResponse<ICTCResponse<T>>>('https://api.fpt.ai/vision/idr/vnm', formData, {
      headers: {
        api_key: 'DkAFd1jRJbW4YnjvD9ydalJ4ObRtbU11',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)
}

export async function getNICApi() {
  return authAxiosClient.get('/nicOcr/get-nic-data-by-owner-id').then((res) => {
    if (res.status === 200) {
      const nic: INIC = res.data
      return nic
    } else return 'Error: ' + res.data
  })
}
