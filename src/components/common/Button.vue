<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="loading loading-spinner loading-sm"></span>
    <slot v-else />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (val) => ['primary', 'secondary', 'accent', 'ghost', 'outline', 'error', 'success', 'warning'].includes(val)
  },
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['xs', 'sm', 'md', 'lg'].includes(val)
  },
  type: {
    type: String,
    default: 'button'
  },
  block: Boolean,
  loading: Boolean,
  disabled: Boolean,
})

defineEmits(['click'])

const buttonClasses = computed(() => {
  const classes = ['btn']
  
  // Variant
  if (props.variant === 'primary') classes.push('btn-primary')
  else if (props.variant === 'secondary') classes.push('btn-secondary')
  else if (props.variant === 'accent') classes.push('btn-accent')
  else if (props.variant === 'ghost') classes.push('btn-ghost')
  else if (props.variant === 'outline') classes.push('btn-outline')
  else if (props.variant === 'error') classes.push('btn-error')
  else if (props.variant === 'success') classes.push('btn-success')
  else if (props.variant === 'warning') classes.push('btn-warning')
  
  // Size
  if (props.size === 'xs') classes.push('btn-xs')
  else if (props.size === 'sm') classes.push('btn-sm')
  else if (props.size === 'lg') classes.push('btn-lg')
  
  // Block
  if (props.block) classes.push('btn-block')
  
  return classes.join(' ')
})
</script>