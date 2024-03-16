import { axiosClient } from 'src/lib/axios'
import { ICategory } from 'src/types'

export async function postCategoryApi(data: ICategory) {
  const formData = new FormData()
  formData.append('cateName', data.cateName)
  formData.append('description', data.description as string)
  if (data.imageDir) {
    formData.append('imageDir', data.imageDir)
  }

  return await axiosClient
    .post('/Category/add-category', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return res.data
      } else {
        throw new Error('Request failed with status' + res.status)
      }
    })
    .catch((error) => {
      throw error
    })
}
