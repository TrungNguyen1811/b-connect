import { axiosClient } from 'src/lib/axios'
import { ICategory } from 'src/types'

export async function updateCategoryApi(id: string, data: ICategory) {
  const formData = new FormData()
  formData.append('cateId', id)
  formData.append('cateName', data.cateName)
  formData.append('description', data.description as string)
  if (data.imageDir) {
    formData.append('cateImg', data.imageDir as File)
  }

  console.log('data.imageDir', data.imageDir)

  return await axiosClient
    .put('/Category/update-category', formData, {
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
