import { authAxiosClient, axiosClient } from 'src/lib/axios'
import { IAddress } from 'src/types/address'

function putDefaultAddress(data: IAddress) {
  return axiosClient
    .put('/Address/update-default-address', data, {})
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
export { putDefaultAddress }

function putAddress(data: IAddress) {
  return authAxiosClient
    .put('/Address/update-address', data, {})
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
export { putAddress }
