import { axiosClient } from 'src/lib/axios'
import { IReview, IReviewResponse } from 'src/types'

async function postRatingComment(data: IReview): Promise<IReviewResponse> {
  const formData = new FormData()
  formData.append('RatingId', data.ratingId)
  formData.append('UserId', data.userId)
  formData.append('RatingPoint', data.ratingPoint)
  formData.append('Comment', data.comment as string)

  try {
    const response = await axiosClient.post('/Account/rate-and-comment', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data as IReviewResponse
  } catch (error) {
    throw new Error('Failed to post rating comment')
  }
}

export { postRatingComment }
