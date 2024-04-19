import { authAxiosClient, axiosClient } from 'src/lib/axios'
import { IAgency, IAgencyAnalyst } from 'src/types/agency'
import { IBook } from 'src/types/books'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'

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

async function getAgencyAnalyst() {
  return authAxiosClient.get(`/Account/GetAgencyAnalyst`).then((res) => {
    if (res.status === 200) {
      const agency: IAgencyAnalyst = res.data
      return agency
    } else {
      return null
    }
  })
}
export { getAgencyAnalyst }

// async function getAgencyRevenueByTime(startDate: string, endDate: string) {
//   return authAxiosClient
//     .get(`/Account/GetAgencyRevenueByTime?startDate=${startDate}&endDate=${endDate}`)
//     .then((res) => {
//       if (res.status === 200) {
//         const data: IRevenueByTime[] = res.data
//         return data
//       } else return res.status
//     })
// }
// export { getAgencyRevenueByTime }

async function getBestSellerProductIdByNumberOfBookSold(params: Partial<IQueryPagination>) {
  return authAxiosClient
    .get(`/products/SellerManager/GetBestSellerProductIdByNumberOfBookSold`, { params })
    .then((res) => {
      if (res.status === 200) {
        const data: IBook[] = res.data
        return data
      } else return null
    })
}
export { getBestSellerProductIdByNumberOfBookSold }

async function getBestSellerProductIdByRevenue(params: Partial<IQueryPagination>) {
  return authAxiosClient.get(`/products/SellerManager/GetBestSellerProductIdByRevenue`, { params }).then((res) => {
    if (res.status === 200) {
      const data: IBook[] = res.data
      return data
    } else return null
  })
}
export { getBestSellerProductIdByRevenue }

async function GetListBestSellerProductIdByRevenueAndAgencyId(
  params: Partial<IQueryPagination & IQuerySearch>,
  agencyId: string,
) {
  const data = {
    ...params,
    agencyId: agencyId,
  }
  return authAxiosClient
    .get(`/products/SellerManager/GetListBestSellerProductIdByRevenueAndAgencyId`, { params: data })
    .then((res) => {
      if (res.status === 200) {
        const data: IBook[] = res.data
        return data
      } else return null
    })
}
export { GetListBestSellerProductIdByRevenueAndAgencyId }
