import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '../../Services/authService'
import router from '../../router'

/**
 * AUTH STORE
 * Manages user authentication state
 */
export const useAuthStore = defineStore('auth', () => {
  // ==================== STATE ====================
  
  const user = ref(null)        // Current user object
  const token = ref(null)       // JWT token
  const loading = ref(false)    // API loading state
  const error = ref(null)       // Error message

  // ==================== GETTERS ====================
  
  /**
   * Check if user is authenticated
   */
  const isAuthenticated = computed(() => !!token.value)

  /**
   * Get user's role (student, company, admin)
   */
  const userRole = computed(() => user.value?.role || null)

  /**
   * Check if user is a student
   */
  const isStudent = computed(() => userRole.value === 'student')

  /**
   * Check if user is a company
   */
  const isCompany = computed(() => userRole.value === 'company')

  /**
   * Check if user is an admin
   */
  const isAdmin = computed(() => userRole.value === 'admin')

  /**
   * Get user's display name
   */
  const userName = computed(() => {
    if (!user.value) return ''
    return user.value.name || user.value.company_name || ''
  })

  /**
   * Get user's initials (for Avatar component)
   */
  const userInitials = computed(() => {
    if (!userName.value) return '?'
    return userName.value
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  })

  // ==================== ACTIONS ====================

  /**
   * INITIALIZE AUTH
   * Called when app starts - loads user from localStorage
   */
  const initAuth = () => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
    }
  }

  /**
   * LOGIN
   * @param {Object} credentials - { email, password }
   */
  const login = async (credentials) => {
    loading.value = true
    error.value = null

    try {
      const response = await authService.login(credentials)
      const data = response.data

      // Save to state
      token.value = data.token
      user.value = data.user

      // Save to localStorage (persist across page refresh)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Redirect to dashboard
      redirectToDashboard()

      return data
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * REGISTER STUDENT
   * @param {Object} data - Registration form data
   */
  const registerStudent = async (data) => {
    loading.value = true
    error.value = null

    try {
      const response = await authService.registerStudent(data)
      const responseData = response.data

      // Auto-login after registration
      token.value = responseData.token
      user.value = responseData.user

      localStorage.setItem('token', responseData.token)
      localStorage.setItem('user', JSON.stringify(responseData.user))

      redirectToDashboard()

      return responseData
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * REGISTER COMPANY
   * @param {Object} data - Registration form data
   */
  const registerCompany = async (data) => {
    loading.value = true
    error.value = null

    try {
      const response = await authService.registerCompany(data)
      const responseData = response.data

      // Auto-login after registration
      token.value = responseData.token
      user.value = responseData.user

      localStorage.setItem('token', responseData.token)
      localStorage.setItem('user', JSON.stringify(responseData.user))

      redirectToDashboard()

      return responseData
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * FETCH CURRENT USER
   * Used after page refresh to get latest user data
   */
  const fetchCurrentUser = async () => {
    if (!token.value) return

    loading.value = true

    try {
      const response = await authService.getCurrentUser()
      user.value = response.data.user
      localStorage.setItem('user', JSON.stringify(response.data.user))
    } catch (err) {
      // If token is invalid, logout
      logout()
    } finally {
      loading.value = false
    }
  }

  /**
   * LOGOUT
   * Clears state and localStorage, redirects to login
   */
  const logout = async () => {
    try {
      // Call backend to invalidate token
      if (token.value) {
        await authService.logout()
      }
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      // Clear everything
      user.value = null
      token.value = null
      error.value = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')

      router.push('/login')
    }
  }

  /**
   * REDIRECT TO DASHBOARD
   * Based on user role
   */
  const redirectToDashboard = () => {
    const dashboards = {
      student: '/student/dashboard',
      company: '/company/dashboard',
      admin: '/admin/dashboard',
    }

    const redirectPath = dashboards[userRole.value] || '/'
    router.push(redirectPath)
  }

  /**
   * CLEAR ERROR
   */
  const clearError = () => {
    error.value = null
  }

  // Initialize auth when store is created
  initAuth()

  // ==================== RETURN ====================
  
  return {
    // State
    user,
    token,
    loading,
    error,

    // Getters
    isAuthenticated,
    userRole,
    isStudent,
    isCompany,
    isAdmin,
    userName,
    userInitials,

    // Actions
    login,
    registerStudent,
    registerCompany,
    fetchCurrentUser,
    logout,
    clearError,
  }
})