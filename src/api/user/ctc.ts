import axios, { AxiosResponse } from 'axios'
import { ICTCResponse } from 'src/types/user'

export async function postCTCApi<T>(formData: FormData) {
  return axios
    .post<unknown, AxiosResponse<ICTCResponse<T>>>('https://api.fpt.ai/vision/idr/vnm', formData, {
      headers: {
        api_key: 't833lvdQ2FHs1Mu4X6PYKdNu1t9vXwgH',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data)
}
