import FormData from 'form-data'
import { authAxiosClient } from '../../lib/axios'

async function postBlogApi(
  blogData: {
    category: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image?: any
    title: string
    content: string
  },
  image: string,
) {
  const data = new FormData()
  data.append('category', blogData.category)
  data.append('title', blogData.title)
  data.append('content', blogData.content)
  if (image) {
    data.append('image', blogData.image)
  }

  return await authAxiosClient
    .post('/blog', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response.status === 201) {
        return response.data
      } else {
        // Handle other HTTP statuses as needed
        console.log(response)
        throw new Error('Request failed with status ' + response.status)
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      throw error
    })
}

export { postBlogApi }
