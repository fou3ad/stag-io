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
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Wait for auth store to finish initialising (e.g., token validation)
  if (authStore.loading) {
    // Optionally show a full-screen loader
    await new Promise(resolve => {
      const unwatch = watch(() => authStore.loading, (val) => {
        if (!val) {
          unwatch();
          resolve();
        }
      });
    });
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const guestOnly = to.matched.some(record => record.meta.guest);
  const requiredRole = to.matched.find(record => record.meta.role)?.meta.role;

  // Authenticated but missing role → force logout / reload
  if (authStore.isAuthenticated && !authStore.userRole) {
    await authStore.logout();
    return next('/login');
  }

  // Protected route without valid session
  if (requiresAuth && !authStore.isAuthenticated) {
    return next({ path: '/login', query: { redirect: to.fullPath } });
  }

  // Role mismatch
  if (requiresAuth && requiredRole && authStore.userRole !== requiredRole) {
    const roleDashboardMap = {
      student: '/student/dashboard',
      company: '/company/dashboard',
      admin: '/admin/dashboard',
    };
    const fallback = '/login';
    return next(roleDashboardMap[authStore.userRole] || fallback);
  }

  // Guest route for logged-in user
  if (guestOnly && authStore.isAuthenticated) {
    const roleDashboardMap = {
      student: '/student/dashboard',
      company: '/company/dashboard',
      admin: '/admin/dashboard',
    };
    return next(roleDashboardMap[authStore.userRole] || '/');
  }

  next();
})

export default router