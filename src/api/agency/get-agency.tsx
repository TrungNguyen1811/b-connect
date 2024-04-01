import { axiosClient } from 'src/lib/axios'

async function getAgencyByAgencyId(userId: string) {
  return axiosClient.get(`/Account/get-agency-by-id?agencyId=${userId}`).then((res) => res.data)
}
export { getAgencyByAgencyId }
