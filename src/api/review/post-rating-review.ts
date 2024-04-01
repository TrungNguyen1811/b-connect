import { axiosClient } from 'src/lib/axios'
import { IReview } from 'src/types'

function postRatingComment(data: IReview) {
  const formData = new FormData()
  formData.append('RatingId', data.ratingId)
  formData.append('UserId', data.userId)
  formData.append('RatingPoint', data.ratingPoint?.toString() as string)
  formData.append('Comment', data.comment as string)
  return axiosClient
    .post('/Account/rate-and-comment', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      if (res) {
        console.log(res)
      }
    })
    .catch((error: Error) => {
      throw error.message
    })
}
export { postRatingComment }
