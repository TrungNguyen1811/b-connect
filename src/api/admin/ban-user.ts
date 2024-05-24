import { authAxiosClient } from 'src/lib/axios'
import { IBan } from 'src/types/ban'

async function postBanUser(data: IBan) {
  return authAxiosClient
    .post(`admin/set-is-account-banned`, data)
    .then((res) => {
      if (res.status == 200) {
        return res.data
      } else {
        throw new Error('Request failed with status ' + res.status)
      }
    })
    .catch((error) => {
      throw error
    })
}
export { postBanUser }

async function postUpdateBanUser(data: IBan) {
  return authAxiosClient
    .put(`/admin/force-unban-account`, data)
    .then((res) => {
      if (res.status == 200) {
        return res.data
      } else {
        throw new Error('Request failed with status ' + res.status)
      }
    })
    .catch((error) => {
      throw error
    })
}
export { postUpdateBanUser }
