import { authAxiosClient, axiosClient } from 'src/lib/axios'
import { IListReplyResponse, IReviewResponse } from 'src/types/books'
import { IQueryPagination, IQuerySearch } from 'src/types/requests'
import { IResponse } from 'src/types/response'
import { IRating, IRatingOverall } from 'src/types/user'

function getAllReviewByBookId(bookId: string) {
  return axiosClient
    .get(`/Account/get-book-review-by-bookid?bookId=${bookId}`)
    .then((res) => {
      const data: IReviewResponse[] = res.data
      return data
    })
    .catch((error: Error) => {
      throw error.message
    })
}
export default getAllReviewByBookId

export type GetManyReviewParams = {
  BookName?: string
  RatingPoint?: string
  HasReplied?: string
  RecentDays?: string
  PageNumber?: number
  PageSize?: number
} & Partial<IQueryPagination & IQuerySearch>
export async function getAllReviewByAgency(params: GetManyReviewParams) {
  return authAxiosClient.get('/Account/get-review-for-agency', { params }).then((res) => {
    const data: IListReplyResponse[] = res.data
    const pagination = res.headers['x-pagination']
    const dataAll: IResponse<IListReplyResponse[]> = {
      data: data,
      _metadata: data,
      _pagination: pagination,
    }
    return dataAll
  })
}

export async function getReviewForAgencyUserView(agencyId: string, rating: number | null) {
  return axiosClient
    .get(`/Account/get-review-for-agency-user-view?agencyId=${agencyId}&ratingPoint=${rating}`)
    .then((res) => {
      const data: IListReplyResponse[] = res.data
      const pagination = res.headers['x-pagination']
      const dataAll: IResponse<IListReplyResponse[]> = {
        data: data,
        _metadata: data,
        _pagination: pagination,
      }
      return dataAll
    })
}

export async function getUserRatingInfo(userId: string) {
  return authAxiosClient.get(`/Account/user-rating-trade-info?userId=${userId}`).then((res) => {
    const data: IRatingOverall = res.data
    return data
  })
}

export async function getUserReviewRating(userId: string, ratingPoint: number) {
  return authAxiosClient.get(`/Account/list-rate-users?userId=${userId}&ratingPoint=${ratingPoint}`).then((res) => {
    const data: IRating[] = res.data
    return data
  })
}
