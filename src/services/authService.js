import api from './api'

/**
 * Authentication API Service
 * 
 * TODO for Backend Team:
 * Replace all endpoints (/auth/login, /auth/register/student, etc.)
 * with your actual Laravel routes when backend is ready
 */

const authService = {
  /**
   * LOGIN
   * Endpoint: POST /auth/login
   * 
   * @param {Object} credentials - { email: string, password: string }
   * @returns {Promise<Object>} { token: string, user: Object }
   * 
   * Expected Backend Response:
   * {
   *   "token": "eyJ0eXAiOiJKV1QiLCJhbG...",
   *   "user": {
   *     "id": 1,
   *     "name": "John Doe",
   *     "email": "john@univ.dz",
   *     "role": "student"  // or "company" or "admin"
   *   }
   * }
   */
  login(credentials) {
    return api.post('/auth/login', credentials)
  },

  /**
   * REGISTER STUDENT
   * Endpoint: POST /auth/register/student
   * 
   * @param {Object} data - Student registration data
   * @returns {Promise<Object>} { token: string, user: Object }
   * 
   * Expected Payload:
   * {
   *   "name": "John Doe",
   *   "email": "john@univ.dz",
   *   "password": "password123",
   *   "password_confirmation": "password123"
   * }
   */
  registerStudent(data) {
    return api.post('/auth/register/student', data)
  },

  /**
   * REGISTER COMPANY
   * Endpoint: POST /auth/register/company
   * 
   * @param {Object} data - Company registration data
   * @returns {Promise<Object>} { token: string, user: Object }
   * 
   * Expected Payload:
   * {
   *   "company_name": "Tech Corp",
   *   "email": "contact@techcorp.com",
   *   "password": "password123",
   *   "password_confirmation": "password123",
   *   "phone": "+213555123456",
   *   "wilaya": "Alger"
   * }
   */
  registerCompany(data) {
    return api.post('/auth/register/company', data)
  },

  /**
   * GET CURRENT USER
   * Endpoint: GET /auth/me
   * 
   * @returns {Promise<Object>} { user: Object }
   * 
   * Used to fetch user data after page refresh
   */
  getCurrentUser() {
    return api.get('/auth/me')
  },

  /**
   * LOGOUT
   * Endpoint: POST /auth/logout
   * 
   * @returns {Promise<Object>}
   * 
   * Invalidates token on backend
   */
  logout() {
    return api.post('/auth/logout')
  },
}

export default authService