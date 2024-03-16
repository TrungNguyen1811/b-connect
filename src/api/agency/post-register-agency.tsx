import { AxiosError } from 'axios'
import { authAxiosClient } from 'src/lib/axios'
import { IAgency } from 'src/types/agency'

async function RegisterAgency(data: IAgency, callback: (error: AxiosError | null, result: string | null) => void) {
  return await authAxiosClient
    .post('/Account/register-agency', data)
    .then((err) => {
      if (err.status === 200) {
        callback(null, err.data)
      }
    })
    .catch((error) => {
      callback(error, null)
    })
}

export { RegisterAgency }
