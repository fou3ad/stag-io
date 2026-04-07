<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 p-4">
    
    <Card class="w-full max-w-md">
      
      <template #header>
        <div class="text-center py-2">
          <h1 class="text-2xl font-bold text-slate-900">Student Registration</h1>
          <p class="text-slate-500 mt-2 text-sm">Join Stag.io to find your next internship</p>
        </div>
      </template>

      <div v-if="error" class="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2 animate-fade-in">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ error }}</span>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <Input
          v-model="form.name"
          label="Full Name"
          placeholder="e.g. John Doe"
          :error="validationErrors.name?.[0]"
          required
        />

        <Input
          v-model="form.email"
          type="email"
          label="University Email"
          placeholder="john.doe@univ-constantine2.dz"
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
        />

        <Input
          v-model="form.password_confirmation"
          type="password"
          label="Confirm Password"
          placeholder="••••••••"
          :error="validationErrors.password_confirmation?.[0]"
          required
        />

        <div class="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            block
            :loading="loading"
          >
            Create Student Account
          </Button>
        </div>
      </form>

      <div class="relative my-8">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-slate-200"></div>
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-white px-2 text-slate-400">Step into your future</span>
        </div>
      </div>

      <div class="text-center">
        <p class="text-sm text-slate-500">
          Already have an account?
          <router-link to="/login" class="font-semibold text-blue-700 hover:text-blue-800 underline-offset-4 hover:underline">
            Log in
          </router-link>
        </p>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../../composables/useAuth'

// استيراد المكونات التي طورناها
import Input from '../../components/common/Input.vue'
import Button from '../../components/common/Button.vue'
import Card from '../../components/common/Card.vue'

const { registerStudent, loading, error, clearError } = useAuth()

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const validationErrors = ref({})

const handleRegister = async () => {
  validationErrors.value = {}
  clearError()

  try {
    await registerStudent(form.value)
  } catch (err) {
    if (err.response?.status === 422 && err.response?.data?.errors) {
      validationErrors.value = err.response.data.errors
    }
  }
}
</script>