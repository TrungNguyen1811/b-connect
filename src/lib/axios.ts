import axios from 'axios'

const BASED_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3000/api'

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
    const token = localStorage.getItem('accessToken')
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

    if (error.response?.status === 401 && originalRequest.url !== BASED_URL + '/auth/refresh-token') {
      try {
        const { data, status } = await axiosClient.post('/auth/refresh', undefined, { withCredentials: true })
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
