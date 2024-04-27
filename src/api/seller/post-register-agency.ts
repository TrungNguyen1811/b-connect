import { AxiosError } from 'axios'
import { authAxiosClient } from 'src/lib/axios'
import { IAgency } from 'src/types/agency'
import { IToken } from 'src/types/token'

async function RegisterAgency(data: IAgency, callback: (error: AxiosError | null, result: IToken | null) => void) {
  const formData = new FormData()
  formData.append('agencyName', data.agencyName as string)
  formData.append('logoImg', data.logoImg as File)
  formData.append('addressId', data.addressId as string)
  formData.append('businessType', data.businessType as string)

  return await authAxiosClient
    .post('/Account/register-agency', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
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

export { RegisterAgency }
