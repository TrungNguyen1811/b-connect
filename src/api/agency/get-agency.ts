import { authAxiosClient, axiosClient } from 'src/lib/axios'
import { IAgency } from 'src/types/agency'
import { IBook } from 'src/types/books'
import { IQueryPagination } from 'src/types/requests'

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
      const agency: IAgency = res.data
      return agency
    } else {
      return null
    }
  })
}
export { getAgencyAnalyst }

async function getAgencyRevenueByTime() {
  return authAxiosClient.get(`/Account/GetAgencyRevenueByTime`).then((res) => {
    if (res.status === 200) {
      return res.data
    }
  })
}
export { getAgencyRevenueByTime }

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
  return authAxiosClient.get(`/products/SellerManager/GetBestSellerProductIdByRevenue0`, { params }).then((res) => {
    if (res.status === 200) {
      const data: IBook[] = res.data
      return data
    }
  })
}
export { getBestSellerProductIdByRevenue }
