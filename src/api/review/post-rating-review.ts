import { axiosClient } from 'src/lib/axios'
import { IReply, IReview, IReviewResponse } from 'src/types'

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

async function replyReview(data: IReply) {
  try {
    const response = await axiosClient.post('/Account/add-reply', data)
    return response.data
  } catch (error) {
    throw new Error('Failed to reply review')
  }
}

export { replyReview }

async function updateReplyReview(data: IReply) {
  try {
    const response = await axiosClient.post('/Account/update-reply', data)
    return response.data
  } catch (error) {
    throw new Error('Failed to reply review')
  }
}

export { updateReplyReview }
