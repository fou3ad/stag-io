import axios from 'axios'
import router from '../router'

/**
 * Base Axios instance
 * All API requests go through this instance
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

/**
 * REQUEST INTERCEPTOR
 * Automatically adds JWT token to every request
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * RESPONSE INTERCEPTOR
 * Handles common errors globally (401, 403, 422, 500)
 */
api.interceptors.response.use(
  (response) => {
    // Return successful response as-is
    return response
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - Token expired or invalid
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          router.push('/login')
          break
          
        case 403:
          // Forbidden - User doesn't have permission
          console.error('Access forbidden')
          break
          
        case 422:
          // Validation errors from Laravel
          // Will be handled in components
          break
          
        case 404:
          console.error('Resource not found')
          break
          
        case 500:
          console.error('Server error occurred')
          break
      }
    } else if (error.request) {
      // No response from server
      console.error('Network error: No response from server')
    } else {
      // Request setup error
      console.error('Request error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export default api