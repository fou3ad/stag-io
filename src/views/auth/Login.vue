<template>
  <div class="min-h-screen flex items-center justify-center gradient-primary p-4">
    <div class="card w-full max-w-md bg-base-100 shadow-2xl">
      <div class="card-body">
        <!-- Header -->
        <div class="text-center mb-6">
          <h1 class="text-4xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Stag.io
          </h1>
          <p class="text-base-content/60 mt-2">Login to your account</p>
        </div>

        <!-- Error Alert -->
        <div v-if="error" class="alert alert-error mb-4">
          <span>{{ error }}</span>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin">
          <Input
            v-model="form.email"
            type="email"
            label="Email"
            placeholder="example@univ.dz"
            :error="validationErrors.email?.[0]"
            required
          />

          <Input
            v-model="form.password"
            type="password"
            label="Password"
            placeholder="••••••••"
            :error="validationErrors.password?.[0]"
            required
            class="mt-4"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            block
            :loading="loading"
            class="mt-6"
          >
            Log in
          </Button>
        </form>

        <!-- Divider -->
        <div class="divider">OR</div>

        <!-- Register Links -->
        <div class="text-center space-y-2">
          <p class="text-sm text-base-content/60">Don't have an account?</p>
    <div class="flex gap-2 justify-center w-full">
      <Button
        variant="outline"
         size="sm"
         class="flex-1"
         @click="$router.push('/register/student')"
          >
         Student
      </Button>
  
      <Button
        variant="outline"
         size="sm"
         class="flex-1"
         @click="$router.push('/register/company')"
       >
       Company
      </Button>
     </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useAuth } from '../../composables/useAuth'
import Input from '../../components/common/Input.vue'
import Button from '../../components/common/Button.vue'

// Get auth functions from composable
const { login, loading, error, clearError } = useAuth()

// Form data
const form = ref({
  email: '',
  password: '',
})

// Validation errors from backend (422)
const validationErrors = ref({})

// Handle login
const handleLogin = async () => {
  validationErrors.value = {}
  clearError()

  try {
    await login(form.value)
    // Success - redirect handled in store
  } catch (err) {
    // Handle Laravel validation errors (422)
    if (err.response?.status === 422) {
      validationErrors.value = err.response.data.errors
    }
  }
} 
</script>