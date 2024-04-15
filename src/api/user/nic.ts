import axios, { AxiosResponse } from 'axios'
import { ICTCResponse } from 'src/types/user'

export async function postCTCApi<T>(formData: FormData) {
  return axios
    .post<unknown, AxiosResponse<ICTCResponse<T>>>('https://api.fpt.ai/vision/idr/vnm', formData, {
      headers: {
        api_key: 'wlsxMIUrIdukW23fxAZkWxxYOf78R7BE',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)
}
