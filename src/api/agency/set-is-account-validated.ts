import { AxiosError } from 'axios'
import { authAxiosClient } from 'src/lib/axios'
import { IRegisterCTC } from 'src/types/user'

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
  data: IRegisterCTC,
  callback: (error: AxiosError | null, result: IRegisterCTC | null) => void,
) {
  return await authAxiosClient
    .post(`/Account/register-account-validated`, data, {})
    .then((err) => {
      if (err.status === 200) {
        callback(null, err.data)
      }
    })
    .catch((error) => {
      callback(error, null)
    })
}
export { registerAccountValidates }
