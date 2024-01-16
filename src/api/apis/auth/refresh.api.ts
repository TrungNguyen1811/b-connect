import { axiosClient } from 'src/lib/axios'
import { IErrorResponse, IResponse } from 'src/types/response'
import { ITokenResponse } from 'src/types/token'

export default async function revokeRefreshToken() {
  return axiosClient.post<IErrorResponse, IResponse<ITokenResponse>>(
    '/auth/refresh',
    {},
    {
      withCredentials: true,
    },
  )
}
