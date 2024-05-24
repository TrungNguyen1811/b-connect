import { authAxiosClient, axiosClient } from 'src/lib/axios'
import { IAgency, IAgencyAnalyst, IAgencyAnalystByTime, IAgencyStat } from 'src/types/agency'
import { IBook } from 'src/types/books'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'

export async function getAllSeller() {
  return authAxiosClient.get('/account/get-agency-25').then((res) => {
    const data: IAgency[] = res.data
    return data
  })
}

async function getAgencyByAgencyId(userId: string) {
  return axiosClient.get(`/account/get-agency-by-id?agencyId=${userId}`).then((res) => {
    if (res.status === 200) {
      const agency: IAgency = res.data
      return agency
    } else {
      return null
    }
  })
}
export { getAgencyByAgencyId }

async function getAgencyStat(agencyId: string) {
  return axiosClient.get(`/account/agency-stat?agencyId=${agencyId}`).then((res) => {
    if (res.status === 200) {
      const agency: IAgencyStat = res.data
      return agency
    } else {
      return null
    }
  })
}
export { getAgencyStat }

async function getAgencyAnalyst() {
  return authAxiosClient.get(`/account/get-agency-analyst`).then((res) => {
    if (res.status === 200) {
      const agency: IAgencyAnalyst = res.data
      return agency
    } else {
      return null
    }
  })
}
export { getAgencyAnalyst }

async function getAgencyAnalystByTime(startDate: string, endDate: string) {
  return authAxiosClient
    .get(`/account/get-agency-analyst-by-time?startDate=${startDate}&endDate=${endDate}`)
    .then((res) => {
      if (res.status === 200) {
        const agency: IAgencyAnalystByTime = res.data
        return agency
      } else {
        return res.data
      }
    })
}
export { getAgencyAnalystByTime }

async function getFinanceForecast() {
  return authAxiosClient.get(`/get-finance-forecast`).then((res) => {
    if (res.status === 200) {
      const data = res.data
      return data
    } else return res.status
  })
}
export { getFinanceForecast }

async function getBestSellerProductIdByNumberOfBookSold(params: Partial<IQueryPagination>) {
  return authAxiosClient
    .get(`/book/seller-manager/get-best-seller-product-id-by-number-of-book-sold`, { params })
    .then((res) => {
      if (res.status === 200) {
        const data: IBook[] = res.data
        return data
      } else return null
    })
}
export { getBestSellerProductIdByNumberOfBookSold }

async function getBestSellerProductIdByRevenue(params: Partial<IQueryPagination>) {
  return authAxiosClient.get(`/book/seller-manager/get-best-seller-product-id-by-revenue`, { params }).then((res) => {
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
    .get(`/book/seller-manager/get-list-best-seller-product-id-by-revenue-and-agency-id`, { params: data })
    .then((res) => {
      if (res.status === 200) {
        const data: IBook[] = res.data
        return data
      } else return null
    })
}
export { GetListBestSellerProductIdByRevenueAndAgencyId }
