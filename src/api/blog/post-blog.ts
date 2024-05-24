import FormData from 'form-data'
import { authAxiosClient, axiosClient } from '../../lib/axios'

async function postBlogApi(blogData: {
  productImages?: File | null
  productVideos?: File | null
  isTradePost?: boolean
  title: string
  content: string
}) {
  const data = new FormData()
  data.append('IsTradePost', blogData.isTradePost)
  // data.append('authorName', blogData.authorName)
  data.append('Title', blogData.title)
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
    .post('/post/add-new-post', data, {
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

export { postBlogApi }

async function updateBlogApi(blogData: {
  postId: string
  // listCate: string
  title: string
  Image?: File | null
  Video?: File | null
  content: string
  isLock?: boolean
}) {
  const data = new FormData()
  data.append('Title', blogData.title)
  data.append('PostId', blogData.postId)
  data.append('Content', blogData.content)
  data.append('IsLock', blogData.isLock)
  if (blogData.Image instanceof File) {
    data.append('Image', blogData.Image)
  } else {
    console.log('blogData.Image is not logic object File')
  }

  if (blogData.Video instanceof File) {
    data.append('Video', blogData.Video)
  } else {
    console.log('blogData.Video is not logic object File')
  }

  return await authAxiosClient
    .put('/post/update-post', data, {
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

async function addNewSavedPost(postId: string) {
  return await authAxiosClient
    .post(`/post/add-new-user-saved-post?postId=${postId}`, {})
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

export { addNewSavedPost }

async function postLikePost(postId: string) {
  return await authAxiosClient
    .post(`/post/like-post?postId=${postId}`, {})
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

export { postLikePost }

async function addSocialTag(data: { tagNames: string[]; postId: string }) {
  return await axiosClient
    .post(`/social-media/add-social-tag`, data)
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

export { addSocialTag }

async function postBanPost(postId: string) {
  return await authAxiosClient
    .put(`/post/ban-post?postId=${postId}`, {})
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

export { postBanPost }

async function postUnbanPost(postId: string) {
  return await authAxiosClient
    .put(`/post/un-ban-post?postId=${postId}`, {})
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

export { postUnbanPost }
