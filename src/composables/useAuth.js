import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/modules/authStore'

/**
 * AUTH COMPOSABLE
 * 
 * Usage in components:
 * const { user, isAuthenticated, login, logout } = useAuth()
 */
export function useAuth() {
  const authStore = useAuthStore()
  
  // Extract reactive state (use storeToRefs to keep reactivity)
  const {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    userRole,
    isStudent,
    isCompany,
    isAdmin,
    userName,
    userInitials,
  } = storeToRefs(authStore)

  // Extract actions (don't need storeToRefs for functions)
  const {
    login,
    registerStudent,
    registerCompany,
    fetchCurrentUser,
    logout,
    clearError,
  } = authStore

  return {
    // State (reactive)
    user,
    token,
    loading,
    error,
    
    // Getters (reactive)
    isAuthenticated,
    userRole,
    isStudent,
    isCompany,
    isAdmin,
    userName,
    userInitials,
    
    // Actions (functions)
    login,
    registerStudent,
    registerCompany,
    fetchCurrentUser,
    logout,
    clearError,
  }
}