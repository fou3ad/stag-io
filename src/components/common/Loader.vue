<template>
  <div class="flex items-center justify-center py-8">
    <span :class="loaderClasses"></span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['xs', 'sm', 'md', 'lg'].includes(val)
  }
})

const loaderClasses = computed(() => {
  const classes = ['loading', 'loading-spinner', 'text-primary']
  
  if (props.size === 'xs') classes.push('loading-xs')
  else if (props.size === 'sm') classes.push('loading-sm')
  else if (props.size === 'lg') classes.push('loading-lg')
  
  return classes.join(' ')
})
</script>