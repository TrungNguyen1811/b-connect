import { axiosClient } from 'src/lib/axios'
import { IAddress } from 'src/types/address'

export async function getAllAddress(userId: string) {
  return axiosClient
    .get('/Address/get-all-user-address', {
      params: {
        PageNumber: 1,
        PageSize: 10,
        userId: userId,
      },
    })
    .then((res) => {
      const data: IAddress[] = res.data
      return data
    })
}

export async function getAddressByAddressId(addressId: string) {
  return axiosClient.get(`/Address/get-address-by-addressId?addressId=${addressId}`).then((res) => {
    const data: IAddress = res.data
    return data
  })
}
