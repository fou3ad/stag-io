<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="text-6xl mb-4 opacity-50">{{ icon }}</div>
    <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
    <p class="text-base-content/60 mb-6">{{ message }}</p>
    <slot name="action" />
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: '📭'
  },
  title: {
    type: String,
    default: 'No data'
  },
  message: {
    type: String,
    default: 'There is nothing to display here.'
  }
})
</script>