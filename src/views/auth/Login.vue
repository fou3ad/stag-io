<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 p-4">
    
    <Card class="w-full max-w-md">
      
      <template #header>
        <div class="text-center py-2">
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight">
            Stag.io
          </h1>
          <p class="text-slate-500 mt-2 text-sm">Login to your account</p>
        </div>
      </template>

      <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2 animate-fade-in">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ error }}</span>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <Input
          v-model="form.email"
          type="email"
          label="Email Address"
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
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          block
          :loading="loading"
          class="mt-2"
        >
          Log in
        </Button>
      </form>

      <div class="relative my-8">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-slate-200"></div>
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-white px-2 text-slate-400">Or continue with</span>
        </div>
      </div>

      <div class="text-center space-y-4">
        <p class="text-sm text-slate-500">Don't have an account?</p>
        <div class="flex gap-3 justify-center w-full">
          <Button
            variant="secondary"
            size="sm"
            class="flex-1"
            @click="$router.push('/register/student')"
          >
            Student
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            class="flex-1"
            @click="$router.push('/register/company')"
          >
            Company
          </Button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../../composables/useAuth'

// استيراد المكونات التي طورناها (تأكد من صحة المسارات)
import Input from '../../components/common/Input.vue'
import Button from '../../components/common/Button.vue'
import Card from '../../components/common/Card.vue'

const { login, loading, error, clearError } = useAuth()

const form = ref({
  email: '',
  password: '',
})

const validationErrors = ref({})

const handleLogin = async () => {
  validationErrors.value = {}
  clearError()

  try {
    await login(form.value)
  } catch (err) {
    if (err.response?.status === 422) {
      validationErrors.value = err.response.data.errors
    }
  }
}
</script>