import axios from 'axios'

const BASED_URL = import.meta.env.VITE_REACT_APP_API_URL || 'https://localhost:7138/api'

const axiosClient = axios.create({
  baseURL: BASED_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const authAxiosClient = axios.create({
  baseURL: BASED_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

authAxiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

authAxiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && originalRequest.url !== BASED_URL + '/Account/RefreshToken') {
      try {
        const { data, status } = await axiosClient.post('/Account/RefreshToken', undefined, { withCredentials: true })
        if (status === 200 || status === 201) {
          localStorage.setItem('accessToken', data.data.accessToken)
          return authAxiosClient(originalRequest)
        }

        throw new Error('Refresh token failed')
      } catch (er) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        localStorage.removeItem('expiresIn')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)

export { authAxiosClient, axiosClient }
