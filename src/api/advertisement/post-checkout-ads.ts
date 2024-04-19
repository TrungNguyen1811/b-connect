import { authAxiosClient } from 'src/lib/axios'
import { ICheckoutAds } from 'src/types/advertisement'

async function postCheckoutAds(data: ICheckoutAds) {
  return authAxiosClient.post('/ad/checkout', data).then((res) => {
    if (res.status === 200) {
      const url: string = res.data
      return url
    } else {
      return 'Error with status code' + res.status + '(' + res.data + ')'
    }
  })
}
export { postCheckoutAds }

async function postRegisterBannerAds(data: ICheckoutAds) {
  const formData = new FormData()
  formData.append('agencyId', data.agencyId as string)
  formData.append('campaignType', data.campaignType.toString())
  formData.append('duration', data.duration)
  formData.append('bookId', data.bookId as string)
  formData.append('bannerTitle', data.bannerTitle as string)
  formData.append('displayBid', data.displayBid?.toString() as string)
  formData.append('transactionId', data.transactionId)
  formData.append('bannerImg', data.bannerImg as string)

  return authAxiosClient
    .post('/ad/register-new-ad', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.status
      } else {
        return 'Error with status code' + res.status + '(' + res.data + ')'
      }
    })
}
export { postRegisterBannerAds }

async function postRegisterRelevantAds(data: ICheckoutAds) {
  const formData = new FormData()
  formData.append('agencyId', data.agencyId as string)
  formData.append('campaignType', data.campaignType.toString())
  formData.append('duration', data.duration)
  formData.append('numberOfTargetUser', data.numberOfTargetUser?.toString() as string)
  formData.append('ppc_Price', data.ppc_Price?.toString() as string)
  formData.append('bookId', data.bookId as string)
  formData.append('transactionId', data.transactionId)

  return authAxiosClient
    .post('/ad/register-new-ad', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.status
      } else {
        return 'Error with status code' + res.status + '(' + res.data + ')'
      }
    })
}
export { postRegisterRelevantAds }
