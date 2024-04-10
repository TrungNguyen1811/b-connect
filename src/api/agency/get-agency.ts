import { axiosClient } from 'src/lib/axios'
import { IAgency } from 'src/types/agency'

async function getAgencyByAgencyId(userId: string) {
  return axiosClient.get(`/Account/get-agency-by-id?agencyId=${userId}`).then((res) => {
    if (res.status === 200) {
      const agency: IAgency = res.data
      return agency
    } else {
      return null
    }
  })
}
export { getAgencyByAgencyId }
