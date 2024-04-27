import { authAxiosClient } from 'src/lib/axios'
import { IRelevantBooks, ITopBanner } from 'src/types/advertisement'

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
import { AxiosResponse } from 'axios' // Assuming you're using axios for HTTP requests

async function getRelevantBooks(bookId: string): Promise<IRelevantBooks[]> {
  return authAxiosClient.get(`/ad/get-relevant-books?bookId=${bookId}`).then((res: AxiosResponse<IRelevantBooks[]>) => {
    if (res.status === 200) {
      const data: IRelevantBooks[] = res.data
      return data
    } else {
      throw new Error('Error with status code ' + res.status + '(' + res.data + ')')
    }
  })
}

export { getRelevantBooks }
