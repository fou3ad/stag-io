<template>
  <span :class="spinnerClasses"></span>
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

const spinnerClasses = computed(() => {
  const classes = ['loading', 'loading-spinner']
  
  if (props.size === 'xs') classes.push('loading-xs')
  else if (props.size === 'sm') classes.push('loading-sm')
  else if (props.size === 'lg') classes.push('loading-lg')
  
  return classes.join(' ')
})
</script>