import axios from 'axios'
import { IReview } from 'src/types'

function postRatingComment(data: IReview) {
  return axios
    .post('/Account/rate-and-comment', data, {
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
