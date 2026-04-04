<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'neutral',
    validator: (val) => ['primary', 'secondary', 'accent', 'neutral', 'ghost', 'info', 'success', 'warning', 'error'].includes(val)
  },
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['xs', 'sm', 'md', 'lg'].includes(val)
  },
  outline: Boolean,
})

const badgeClasses = computed(() => {
  const classes = ['badge']
  
  // Variant
  if (props.variant === 'primary') classes.push('badge-primary')
  else if (props.variant === 'secondary') classes.push('badge-secondary')
  else if (props.variant === 'accent') classes.push('badge-accent')
  else if (props.variant === 'ghost') classes.push('badge-ghost')
  else if (props.variant === 'info') classes.push('badge-info')
  else if (props.variant === 'success') classes.push('badge-success')
  else if (props.variant === 'warning') classes.push('badge-warning')
  else if (props.variant === 'error') classes.push('badge-error')
  
  // Size
  if (props.size === 'xs') classes.push('badge-xs')
  else if (props.size === 'sm') classes.push('badge-sm')
  else if (props.size === 'lg') classes.push('badge-lg')
  
  // Outline
  if (props.outline) classes.push('badge-outline')
  
  return classes.join(' ')
})
</script>