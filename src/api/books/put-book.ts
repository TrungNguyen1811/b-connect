import { authAxiosClient } from 'src/lib/axios'
import { IBookGroup, IBookTest } from 'src/types'
import FormData from 'form-data'

async function putUpdateBook(data: IBookTest) {
  const formData = new FormData()
  formData.append('ProductId', data.productId)
  formData.append('Name', data.name)
  formData.append('Description', data.description)
  formData.append('Price', data.price)
  formData.append('PublishDate', data.publishDate?.toDateString() || '')
  formData.append('Type', data.type || '')
  formData.append('Author', data.author || '')
  formData.append('Quantity', String(data.stock))
  if (data.category?.length && data.category?.length > 1) {
    for (let i = 0; i < data.category?.length; i = i + 1) {
      formData.append('Category', data.category?.[i] || '')
    }
  } else {
    formData.append('Category', data.category || '')
  }
  if (data.bookImg instanceof File) {
    formData.append('BookImg', data.bookImg)
  }
  if (data.backgroundImg instanceof File) {
    formData.append('BackgroundImg', data.backgroundImg)
  }

  return authAxiosClient
    .put(`/products/UpdateBook`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return 'Successful'
      } else {
        throw new Error('Request failed with status ' + res.status)
      }
    })
    .catch((error: Error) => {
      return error.message
    })
}
export { putUpdateBook }

async function putUpdateBookGroup(data: IBookGroup) {
  const formData = new FormData()
  formData.append('BookGroupId', data.bookGroupId as string)
  formData.append('BookGroupName', data.bookGroupName)
  formData.append('Description', data.description)
  if (data.bookGroupImg instanceof File) {
    formData.append('bookGroupImg', data.bookGroupImg)
  }

  return authAxiosClient
    .put(`/BookGroup/UpdateBookGroup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      if (res.status === 200) {
        return 'Successful'
      } else {
        throw new Error('Request failed with status ' + res.status)
      }
    })
    .catch((error: Error) => {
      return error.message
    })
}
export { putUpdateBookGroup }
