import { axiosClient } from 'src/lib/axios'
import { IErrorResponse, IResponse } from 'src/types/response'
import { ITokenResponse } from 'src/types/token'

export default async function refreshToken() {
  return axiosClient.post<IErrorResponse, IResponse<ITokenResponse>>(
    '/Account/RefreshToken',
    {},
    {
      withCredentials: true,
    },
  )
}
