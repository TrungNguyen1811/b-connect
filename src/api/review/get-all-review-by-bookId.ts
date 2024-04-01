import { axiosClient } from 'src/lib/axios'
import { IReviewResponse } from 'src/types/books'

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
