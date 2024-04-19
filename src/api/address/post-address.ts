import { axiosClient } from 'src/lib/axios'
import { IAddress } from 'src/types/address'

function postAddress(data: IAddress) {
  return axiosClient
    .post('/Address/add-new-address', data, {})
    .then((res) => {
      if (res.status === 200) {
        return res.data
      } else {
        throw Error
      }
    })
    .catch((error: Error) => {
      throw error.message
    })
}
export default postAddress
