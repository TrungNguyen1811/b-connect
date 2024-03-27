import { axiosClient } from 'src/lib/axios'

export async function postCategoryApi(data: { cateName: string; description: string; imageDir: File | null }) {
  const formData = new FormData()
  formData.append('CateName', data.cateName)
  formData.append('Description', data.description as string)
  if (data.imageDir instanceof File) {
    formData.append('CateImg', data.imageDir)
  } else {
    console.log('data.imageDir không phải là một đối tượng File hợp lệ')
  }

  console.log('data.imageDir', data.imageDir)

  return await axiosClient
    .post('/Category/add-category', formData, {
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
