import { authAxiosClient, axiosClient } from 'src/lib/axios'
import { IRelevantBooks, IResponseAds } from 'src/types/advertisement'
import { AxiosResponse } from 'axios'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { IResponse, IResponsePagination } from 'src/types/response'

export type GetBannerParams = {
  agencyId?: string
  startDate?: string
  endDate?: string
  PageNumber?: number
  PageSize?: number
} & Partial<IQueryPagination & IQuerySearch>
async function getAllBannerAds(params: GetBannerParams) {
  return authAxiosClient.get('/ad/get-all-banner-ads', { params }).then((res) => {
    const data: IResponseAds[] = res.data
    const pagination = res.headers['x-pagination']
    const parseJson: IResponsePagination = JSON.parse(pagination)
    const dataAll: IResponse<IResponseAds[]> = {
      data: data,
      _metadata: data,
      _pagination: parseJson,
    }
    return dataAll
  })
}
export { getAllBannerAds }

async function getRelevantBooks(bookId: string): Promise<IRelevantBooks[]> {
  return authAxiosClient.get(`/ad/get-relevant-books?bookId=${bookId}`).then((res: AxiosResponse<IRelevantBooks[]>) => {
    if (res.status === 200) {
      const data: IRelevantBooks[] = res.data
      return data
    } else {
      throw new Error('Error with status code ' + res.status + '(' + res.data + ')')
    }
  })
}

export { getRelevantBooks }

async function getTopBanner(): Promise<IResponseAds[]> {
  return axiosClient.get(`ad/get-top-banners`).then((res: AxiosResponse<IResponseAds[]>) => {
    if (res.status === 200) {
      const data: IResponseAds[] = res.data
      return data
    } else {
      throw new Error('Error with status code ' + res.status + '(' + res.data + ')')
    }
  })
}

export { getTopBanner }
