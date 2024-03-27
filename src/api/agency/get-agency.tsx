import { axiosClient } from 'src/lib/axios'

async function getAgencyByUserId(userId: string) {
  return axiosClient.get(`/Account/get-agency-by-id?agencyId=${userId}`).then((res) => res.data)
}
export { getAgencyByUserId }
