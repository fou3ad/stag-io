<template>
  <div class="avatar" :class="{ 'online': online, 'offline': offline, 'placeholder': !src }">
    <div :class="[avatarClasses, 'flex items-center justify-center']">
      <img v-if="src" :src="src" :alt="alt" class="object-cover w-full h-full" />
      <span v-else class="text-base-content font-medium uppercase">{{ initials }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: String,
  alt: String,
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(val)
  },
  rounded: {
    type: Boolean,
    default: true
  },
  initials: String,
  online: Boolean,
  offline: Boolean,
})

const avatarClasses = computed(() => {
  const classes = ['bg-neutral', 'text-neutral-content']
  
  // Size (تأكدنا من إضافة الارتفاع h ليصبح مربعاً تماماً قبل التدوير)
  const sizes = {
    xs: 'w-8 h-8',
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  }
  
  classes.push(sizes[props.size] || sizes.md)
  
  // Rounded
  classes.push(props.rounded ? 'rounded-full' : 'rounded')
  
  return classes.join(' ')
})
</script>