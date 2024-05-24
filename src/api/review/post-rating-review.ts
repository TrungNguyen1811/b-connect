import { axiosClient } from 'src/lib/axios'
import { IReply, IReview, IReviewResponse } from 'src/types'

async function postRatingComment(data: IReview): Promise<IReviewResponse> {
  const formData = new FormData()
  formData.append('RatingId', data.ratingId)
  formData.append('UserId', data.userId)
  formData.append('RatingPoint', data.ratingPoint)
  formData.append('Comment', data.comment as string)

  try {
    const response = await axiosClient.post('/account/rate-and-comment', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (response.status === 200) {
      return response.data as IReviewResponse
    } else {
      throw new Error(`Error with status code ${response.status}: ${response.data}`)
    }
  } catch (error: any) {
    // If error response is available, throw it for onError to catch
    if (error.response) {
      throw error
    } else {
      throw new Error('Failed to post rating comment')
    }
  }
}

export { postRatingComment }

async function replyReview(data: IReply) {
  try {
    const response = await axiosClient.post('/account/add-reply', data)
    return response.data
  } catch (error) {
    throw new Error('Failed to reply review')
  }
}

export { replyReview }

async function updateReplyReview(data: IReply) {
  try {
    const response = await axiosClient.post('/account/update-reply', data)
    return response.data
  } catch (error) {
    throw new Error('Failed to reply review')
  }
}

export { updateReplyReview }
