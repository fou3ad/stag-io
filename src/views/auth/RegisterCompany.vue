<template>
  <div class="min-h-screen flex items-center justify-center gradient-primary p-4">
    <div class="card w-full max-w-md bg-base-100 shadow-2xl animate-scale-up">
      <div class="card-body">
        <div class="text-center mb-6">
          <h1 class="text-3xl font-bold">Company Registration</h1>
          <p class="text-base-content/60 mt-2">Create your company account</p>
        </div>

        <div v-if="error" class="alert alert-error mb-4">
          <span>{{ error }}</span>
        </div>

        <form @submit.prevent="handleRegister">
          <Input
            v-model="form.company_name"
            label="Company name"
            placeholder="Tech Corp Inc."
            :error="validationErrors.company_name"
            required
          />

          <Input
            v-model="form.email"
            type="email"
            label="Email"
            placeholder="contact@techcorp.com"
            :error="validationErrors.email"
            required
            class="mt-4"
          />

          <Input
            v-model="form.phone"
            label="Phone number"
            placeholder="+213 5 XX XX XX XX"
            :error="validationErrors.phone"
            class="mt-4"
          />

          <Input
            v-model="form.website"
            label="Website (optional)"
            placeholder="https://www.techcorp.com"
            :error="validationErrors.website"
            class="mt-4"
          />

          <Input
            v-model="form.password"
            type="password"
            label="Password"
            placeholder="••••••••"
            :error="validationErrors.password"
            required
            class="mt-4"
          />

          <Input
            v-model="form.password_confirmation"
            type="password"
            label="Confirm password"
            placeholder="••••••••"
            :error="validationErrors.password_confirmation"
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
            Register company
          </Button>
        </form>

        <div class="divider"></div>

        <div class="text-center">
          <p class="text-sm text-base-content/60">
            Already have a company account?
            <a href="/login" class="link link-primary">Log in</a>
          </p>
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


const { registerCompany, loading, error, clearError } = useAuth()

const form = ref({
  company_name: '',
  email: '',
  phone: '',
  website: '',
  password: '',
  password_confirmation: '',
})

const validationErrors = ref({})

const handleRegister = async () => {
  validationErrors.value = {}
  clearError()

  try {
    await registerCompany(form.value)
  } catch (err) {
    if (err.response?.status === 422 && err.response?.data?.errors) {
      validationErrors.value = err.response.data.errors
    }
  }
}
</script>