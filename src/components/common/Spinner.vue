<template>
  <span :class="spinnerClass"></span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  }
})

const spinnerClass = computed(() => {
  const classes = ['loading', 'loading-spinner']
  
  if (props.size === 'sm') classes.push('loading-sm')
  else if (props.size === 'lg') classes.push('loading-lg')
  
  return classes.join(' ')
})
</script>