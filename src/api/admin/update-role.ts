import { axiosClient } from 'src/lib/axios'
import { IRole } from 'src/types'

async function putUpdateRoleUser(data: IRole) {
  return axiosClient
    .put(`/Admin/set-new-role-to-user`, data)
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
export { putUpdateRoleUser }
