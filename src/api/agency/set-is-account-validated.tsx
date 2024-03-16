import { AxiosError } from 'axios'
import { authAxiosClient } from 'src/lib/axios'

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
