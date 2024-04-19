import { axiosClient } from 'src/lib/axios'
import { IAddress } from 'src/types/address'

// export async function getAllAddress(params: Partial<IQueryPagination & IQuerySearch>) {
// export async function getAllAddress(params: string) {
//   return axiosClient
//     .get(`/Address/get-all-user-address?PageNumber=1&PageSize=5&userId=${params}`, {
//       params,
//     })
//     .then((res) => {
//       const data: IAddress[] = res.data
//       // const pagination = res.headers['x-pagination']
//       // const parseJson: IQueryPagination = JSON.parse(pagination)
//       // console.log('a', parseJson)
//       // const dataAll: IResponse<IAddress[]> = {
//       //   data: data,
//       //   _metadata: data,
//       //   _pagination: parseJson,
//       // }
//       //   console.log('dataAll', dataAll)

//       return data
//     })
// }
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
