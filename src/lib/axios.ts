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

// function getCookieValue(name: string) {
//   const regex = new RegExp(`(^| )${name}=([^;]+)`)
//   const match = document.cookie.match(regex)
//   if (match) {
//     return decodeURIComponent(match[2])
//   }
// }
// const RefreshToken = Cookies.get('refreshToken')

// authAxiosClient.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (error) => {
//     const originalRequest = error.config

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true
//       try {
//         const refresh = getCookieValue(RefreshToken!)
//         const { data, status } = await refreshToken(refresh as string)
//         if (status === 200 || status === 201) {
//           localStorage.setItem('token', data)
//           return authAxiosClient(originalRequest)
//         }

//         throw new Error('Refresh token failed')
//       } catch (er) {
//         localStorage.removeItem('token')
//         localStorage.removeItem('user')
//         // localStorage.removeItem('expiresIn')
//         window.location.href = '/login'
//       }
//     }
//     return Promise.reject(error)
//   },
// )

export { authAxiosClient, axiosClient }
