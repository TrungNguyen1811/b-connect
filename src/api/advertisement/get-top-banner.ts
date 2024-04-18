import { authAxiosClient } from 'src/lib/axios'
import { IRelevantBanner, ITopBanner } from 'src/types/advertisement'

async function getTopBanner() {
  return authAxiosClient.get('/ad/get-top-banners').then((res) => {
    if (res.status === 200) {
      const data: ITopBanner[] = res.data
      return data
    } else {
      return 'Error with status code' + res.status + '(' + res.data + ')'
    }
  })
}
export { getTopBanner }

async function getRelevantBanner() {
  return authAxiosClient.get('/ad/get-relevant-books').then((res) => {
    if (res.status === 200) {
      const data: IRelevantBanner[] = res.data
      return data
    } else {
      return 'Error with status code' + res.status + '(' + res.data + ')'
    }
  })
}
export { getRelevantBanner }
