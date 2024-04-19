import { AxiosError } from 'axios'
import { authAxiosClient } from 'src/lib/axios'
import { IAgency } from 'src/types/agency'

async function UpdateAgency(data: IAgency, callback: (error: AxiosError | null, result: string | null) => void) {
  const formData = new FormData()
  formData.append('agencyId', data.agencyId as string)
  formData.append('ownerId', data.ownerId as string)
  formData.append('agencyName', data.agencyName as string)
  formData.append('logoImg', data.logoImg as File)
  formData.append('postAddress', data.postAddress as string)
  formData.append('businessType', data.businessType as string)

  return await authAxiosClient
    .put('/Account/update-agency', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((err) => {
      if (err.status === 200) {
        callback(null, err.data)
      }
    })
    .catch((error) => {
      callback(error, null)
    })
}

export { UpdateAgency }
