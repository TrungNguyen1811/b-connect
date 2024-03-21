import { axiosClient } from 'src/lib/axios'

async function getAllRole() {
  return await axiosClient
    .get(`/Admin/get-all-role?PageNumber=1&PageSize=100`)
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
export { getAllRole }
