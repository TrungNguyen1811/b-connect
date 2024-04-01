import FormData from 'form-data'
import { authAxiosClient, axiosClient } from '../../lib/axios'

async function postBlogApi(blogData: {
  // authorName: string
  // listCate: string
  productImages?: File | null
  productVideos?: File | null
  isTradePost?: boolean
  title: string
  content: string
}) {
  const data = new FormData()
  // data.append('listCate', blogData.listCate)
  data.append('IsTradePost', blogData.isTradePost)
  // data.append('authorName', blogData.authorName)
  data.append('title', blogData.title)
  data.append('Content', blogData.content)
  if (blogData.productImages instanceof File) {
    data.append('ProductImages', blogData.productImages)
  } else {
    console.log('blogData.productImages is not logic object File')
  }

  if (blogData.productVideos instanceof File) {
    data.append('ProductVideos', blogData.productVideos)
  } else {
    console.log('blogData.ProductVideos is not logic object File')
  }

  return await authAxiosClient
    .post('/Post/add-new-post', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.status
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

async function updateBlogApi(blogData: {
  postId: string
  userId: string
  authorName: string
  listCate: string
  productImgs?: File | null
  title: string
  content: string
}) {
  const data = new FormData()
  data.append('listCate', blogData.listCate)
  data.append('postId', blogData.postId)
  data.append('userId', blogData.userId)
  data.append('authorName', blogData.authorName)
  data.append('title', blogData.title)
  data.append('content', blogData.content)
  if (blogData.productImgs instanceof File) {
    data.append('productImgs', blogData.productImgs)
  } else {
    console.log('blogData.productImgs is not logic object File')
  }

  return await authAxiosClient
    .put('/Post/update post', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response.status === 200) {
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

export { updateBlogApi }

async function postDeleteBlogById(blog_id: string) {
  return await axiosClient
    .post(`/blog/deletePost/${blog_id}`, {})
    .then((response) => {
      if (response.status === 201) {
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

export { postDeleteBlogById }

async function unFollowingFromInterested(cateId: string) {
  return await axiosClient
    .post(`/blog/unFollowingCategory/${cateId}`, {})
    .then((response) => {
      if (response.status === 201) {
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

export { unFollowingFromInterested }
