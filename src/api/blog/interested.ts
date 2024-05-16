import { authAxiosClient, axiosClient } from 'src/lib/axios'
import { ICheckList } from 'src/types/advertisement'
import { IEvidence, IResponsePost, ISubmitTrade } from 'src/types/blog'
import { IResponseInteresterList, IResponseTraderList } from 'src/types/interester'
import { IReportUser, IReviewUser } from 'src/types/user'

export async function getAllPosts() {
  return axiosClient.get('/Post/get-all-post').then((res) => {
    const data: IResponsePost[] = res.data
    return data
  })
}

export async function getPostInterestedByUser() {
  return authAxiosClient.get(`trading/get-post-interested-by-user`).then((res) => {
    const data: IResponsePost[] = res.data
    return data
  })
}

async function getPostInterestByPostId(postId: string) {
  return axiosClient.get(`/trading/get-post-interesters-by-post-id?postId=${postId}`).then((res) => {
    const intereters: IResponseInteresterList[] = res.data
    return intereters
  })
}
export { getPostInterestByPostId }

async function getPostTraderByPostId(postId: string) {
  return authAxiosClient
    .get(`/trading/get-trader-ids-by-postId?postId=${postId}`, {
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
    isUsingMiddle: boolean
    isCheckListValid: string
    transactionId: string
    transactionRecord: string
    ratingRecordId: string
    status: number
    address: string
    lockedRecord: string
    ratingRecord: string
  }
  address?: string
  traderId: string
}

async function getTradeDetailByPostId(postId: string) {
  return authAxiosClient.get(`/trading/get-trade-details-by-postId?postId=${postId}`).then((res) => {
    const trade: ITradeDetail[] = res.data
    return trade
  })
}
export { getTradeDetailByPostId }

async function getTradeDetailById(tradeDeatailsId: string) {
  return authAxiosClient.get(`/trading/get-trade-details-by-id?tradeDeatailsId=${tradeDeatailsId}`).then((res) => {
    const trade: ITradeDetail = res.data
    return trade
  })
}
export { getTradeDetailById }

async function getCheckList(traderId: string) {
  return authAxiosClient.get(`/trading/get-check-list-by-trade-details-id?id=${traderId}`).then((res) => {
    const trade: ICheckList[] = res.data
    return trade
  })
}
export { getCheckList }

async function postInterestedPost(data: string) {
  const formData = new FormData()
  formData.append('PostId', data)

  return await authAxiosClient
    .post('/trading/add-post-interester', formData, {
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

async function postAcceptTrade(postId: string, interesterId: string, isUsingMiddle: boolean) {
  return await authAxiosClient
    .post('/trading/accept-trade', {
      postId: postId,
      interesterId: interesterId,
      isUsingMiddle: isUsingMiddle,
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

async function postEvidenceTrade(trade: IEvidence) {
  const formData = new FormData()
  formData.append('tradeDetailsId', trade.tradeDetailsId)
  formData.append('deliveryCode', trade.deliveryCode)
  if (trade.video instanceof File) {
    formData.append('video', trade.video)
  }

  return await authAxiosClient
    .post('/trading/submit-delivery-evidence', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error('Request failed with status ' + response.status)
      }
    })
    .catch((error) => {
      throw error
    })
}

export { postEvidenceTrade }

async function postRateUserPostTrade(trade: IReviewUser) {
  return await authAxiosClient
    .post('/trading/rate-user-post-trade', trade)
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error('Request failed with status ' + response.status)
      }
    })
    .catch((error) => {
      throw error
    })
}

export { postRateUserPostTrade }

async function postReportUserPostTrade(trade: IReportUser) {
  const formData = new FormData()
  formData.append('tradeDetailsId', trade.tradeDetailsId)
  formData.append('reason', trade.reason)
  if (trade.video instanceof File) {
    formData.append('video', trade.video)
  }

  return await authAxiosClient
    .post('/trading/submit-trade-report', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        throw new Error('Request failed with status ' + response.status)
      }
    })
    .catch((error) => {
      throw error
    })
}

export { postReportUserPostTrade }

async function postAddUserTargetedCategory(tags: string[]) {
  return await authAxiosClient
    .post('/SocialMedia/add-user-targeted-category', tags)
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
export { postAddUserTargetedCategory }

async function postAddBookCheckList(data: { targets: string[]; tradeDetailsId: string }) {
  return await authAxiosClient
    .post('/trading/add-book-check-list', data)
    .then((response) => {
      if (response.status === 200) {
        return response.status
      } else {
        throw new Error('Request failed with status ' + response.status)
      }
    })
    .catch((error) => {
      throw error
    })
}
export { postAddBookCheckList }

async function putSubmitTrade(data: ISubmitTrade) {
  return await authAxiosClient
    .put('/trading/submit-trade-details', data)
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
    .put('/trading/set-trade-status', data)
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        // Handle other HTTP statuses as needed
        throw new Error('Request failed with status ' + response.status + 'Cause:' + response.data)
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      throw error
    })
}
export { putSetTradeStatus }

async function putCheckList(data: ICheckList) {
  const formData = new FormData()
  formData.append('id', data.id || '')
  formData.append('tradeDetailsId', data.tradeDetailsId || '')
  formData.append('target', data.target || '')
  if (data?.bookOwnerUploadDir instanceof File) {
    formData.append('bookOwnerUploadDir', data?.bookOwnerUploadDir)
  } else {
    console.log('data?.bookOwnerUploadDir is not logic object File')
  }
  if (data?.middleUploadDir instanceof File) {
    formData.append('middleUploadDir', data?.middleUploadDir)
  } else {
    console.log('data?.middleUploadDir is not logic object File')
  }
  return await authAxiosClient
    .put('/trading/update-check-list', formData, {
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
export { putCheckList }

async function removeInterestedPost(postInterestId: string) {
  return await authAxiosClient
    .delete(`/trading/delete-post-interest?postInterestId=${postInterestId}`)
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
