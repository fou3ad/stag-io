import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/modules/authStore'

/**
 * ROUTE DEFINITIONS
 */
const routes = [
  // ==================== PUBLIC ROUTES ====================
  
  {
    path: '/',
    redirect: '/login',
  },
  
  // Auth routes (guest only)
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
    meta: { guest: true },
  },
  {
    path: '/register/student',
    name: 'RegisterStudent',
    component: () => import('../views/auth/RegisterStudent.vue'),
    meta: { guest: true },
  },
  {
    path: '/register/company',
    name: 'RegisterCompany',
    component: () => import('../views/auth/RegisterCompany.vue'),
    meta: { guest: true },
  },

  // ==================== STUDENT ROUTES ====================
  
  {
    path: '/student',
    component: () => import('../layouts/StudentLayout.vue'),
    meta: { requiresAuth: true, role: 'student' },
    children: [
      {
        path: 'dashboard',
        name: 'StudentDashboard',
        component: () => import('../views/student/Dashboard.vue'),
      },
      {
        path: 'profile',
        name: 'StudentProfile',
        component: () => import('../views/student/Profile.vue'),
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import('../views/student/SearchInternships.vue'),
      },
      {
        path: 'applications',
        name: 'Applications',
        component: () => import('../views/student/MyApplications.vue'),
      },
    ],
  },

  // ==================== COMPANY ROUTES ====================
  
  {
    path: '/company',
    component: () => import('../layouts/CompanyLayout.vue'),
    meta: { requiresAuth: true, role: 'company' },
    children: [
      {
        path: 'dashboard',
        name: 'CompanyDashboard',
        component: () => import('../views/company/Dashboard.vue'),
      },
      {
        path: 'profile',
        name: 'CompanyProfile',
        component: () => import('../views/company/Profile.vue'),
      },
      {
        path: 'offers',
        name: 'Offers',
        component: () => import('../views/company/MyOffers.vue'),
      },
      {
        path: 'applicants/:offerId',
        name: 'Applicants',
        component: () => import('../views/company/ViewApplicants.vue'),
      },
    ],
  },

  // ==================== ADMIN ROUTES ====================
  
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('../views/admin/Dashboard.vue'),
      },
      {
        path: 'validations',
        name: 'Validations',
        component: () => import('../views/admin/PendingValidations.vue'),
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: () => import('../views/admin/Statistics.vue'),
      },
    ],
  },
]

/**
 * CREATE ROUTER
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
})

/**
 * NAVIGATION GUARDS
 * Protects routes based on authentication and roles
 */
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Check route requirements
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const guestOnly = to.matched.some(record => record.meta.guest)
  const requiredRole = to.matched.find(record => record.meta.role)?.meta.role

  // CASE 1: Route requires authentication
  if (requiresAuth && !authStore.isAuthenticated) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }, // Save where they wanted to go
    })
  }

  // CASE 2: Check role match
  if (requiresAuth && requiredRole && authStore.userRole !== requiredRole) {
    // User logged in but wrong role - redirect to their dashboard
    const dashboards = {
      student: '/student/dashboard',
      company: '/company/dashboard',
      admin: '/admin/dashboard',
    }
    return next(dashboards[authStore.userRole] || '/login')
  }

  // CASE 3: Guest-only routes (login, register)
  if (guestOnly && authStore.isAuthenticated) {
    // Already logged in - redirect to dashboard
    const dashboards = {
      student: '/student/dashboard',
      company: '/company/dashboard',
      admin: '/admin/dashboard',
    }
    return next(dashboards[authStore.userRole] || '/')
  }

  // Allow navigation
  next()
})

export default router