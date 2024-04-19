import { AxiosError } from 'axios'
import { authAxiosClient, axiosClient } from 'src/lib/axios'
import { IToken } from 'src/types/token'
import { IRegisterNIC } from 'src/types/user'

async function SetIsAccountValidates(
  userId: string,
  callback: (error: AxiosError | null, result: string | null) => void,
) {
  return await authAxiosClient
    .put(
      `/Account/set-is-account-validated`,
      {
        userId: userId,
        choice: 'true',
      },
      {},
    )
    .then((err) => {
      if (err.status === 200) {
        callback(null, err.data)
      }
    })
    .catch((error) => {
      callback(error, null)
    })
}
export { SetIsAccountValidates }

async function registerAccountValidates(
  data: IRegisterNIC,
  callback: (error: AxiosError | null, result: IToken | null) => void,
) {
  return await axiosClient
    .put(`/Account/set-is-account-validated`, data)
    .then((err) => {
      if (err.status === 200) {
        const token: IToken = {
          accessToken: err.data,
        }
        callback(null, token)
      }
    })
    .catch((error) => {
      callback(error, null)
    })
}
export { registerAccountValidates }
