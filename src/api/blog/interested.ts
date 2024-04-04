import { authAxiosClient, axiosClient } from 'src/lib/axios'
import { ISubmitTrade } from 'src/pages/blog/submit-trade'
import { IResponsePost } from 'src/types/blog'
import { IResponseInteresterList, IResponseTraderList } from 'src/types/interester'

export async function getAllPosts() {
  return axiosClient.get('/Post/get-all-post').then((res) => {
    const data: IResponsePost[] = res.data
    return data
  })
}

async function getPostInterestByPostId(postId: string) {
  return axiosClient.get(`/Post/trading/get-post-interest-by-post-id?postId=${postId}`).then((res) => {
    const intereters: IResponseInteresterList[] = res.data
    return intereters
  })
}
export { getPostInterestByPostId }

async function getPostTraderByPostId(postId: string) {
  return authAxiosClient
    .get(`/Post/trading/get-traderId-by-postId?postId=${postId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      const intereters: IResponseTraderList = res.data
      return intereters
    })
}
export { getPostTraderByPostId }

export interface ITradeDetail {
  details: {
    tradeDetailId: string
    lockedRecordId: string
    addressId: string
    phone: string
    note: string
    isPostOwner: boolean
    ratingRecordId: string
    status: number
    address: string
    lockedRecord: string
    ratingRecord: string
  }
  traderId: string
}

async function getTradeDetailByPostId(postId: string) {
  return authAxiosClient.get(`/Post/trading/get-trade-details-by-postId?postId=${postId}`).then((res) => {
    const trade: ITradeDetail[] = res.data
    return trade
  })
}
export { getTradeDetailByPostId }

async function postInterestedPost(data: string) {
  const formData = new FormData()
  formData.append('PostId', data)

  return await authAxiosClient
    .post('/Post/trading/add-post-interester', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        // Handle other HTTP statuses as needed
        throw new Error('Request failed with status ' + response.status)
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      throw error
    })
}
export { postInterestedPost }

async function postAcceptTrade(postId: string, interesterId: string) {
  return await authAxiosClient
    .post('/Post/trading/accept-trade', {
      postId: postId,
      interesterId: interesterId,
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        // Handle other HTTP statuses as needed
        throw new Error('Request failed with status ' + response.status)
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      throw error
    })
}
export { postAcceptTrade }

async function putSubmitTrade(data: ISubmitTrade) {
  return await authAxiosClient
    .put('/Post/trading/submit-trade-details', data)
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        // Handle other HTTP statuses as needed
        throw new Error('Request failed with status ' + response.status)
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      throw error
    })
}
export { putSubmitTrade }

export interface ISetTradeStatus {
  postId: string
  tradeDetailsId: string
  updatedStatus: number
}

async function putSetTradeStatus(data: ISetTradeStatus) {
  return await authAxiosClient
    .put('/Post/trading/set-trade-status', data)
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        // Handle other HTTP statuses as needed
        throw new Error('Request failed with status ' + response.status)
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      throw error
    })
}
export { putSetTradeStatus }

async function removeInterestedPost(postInterestId: string) {
  return await authAxiosClient
    .delete(`/Post/trading/delete-post-interest?postInterestId=${postInterestId}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        // Handle other HTTP statuses as needed
        throw new Error('Request failed with status ' + response.status)
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      throw error
    })
}
export { removeInterestedPost }
