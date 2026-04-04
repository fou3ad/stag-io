<template>
  <div :class="cardClasses">
    <figure v-if="$slots.image">
      <slot name="image" />
    </figure>
    
    <div class="card-body">
      <h2 v-if="title" class="card-title">
        {{ title }}
        <div v-if="badge" class="badge badge-secondary">{{ badge }}</div>
      </h2>
      
      <slot />
      
      <div v-if="$slots.actions" class="card-actions justify-end mt-4">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  badge: String,
  bordered: Boolean,
  compact: Boolean,
  hover: Boolean,
})

const cardClasses = computed(() => {
  const classes = ['card', 'bg-base-100']
  
  if (props.bordered) classes.push('border', 'border-base-300')
  else classes.push('shadow-lg')
  
  if (props.compact) classes.push('card-compact')
  if (props.hover) classes.push('hover:shadow-xl', 'transition-shadow', 'cursor-pointer')
  
  return classes.join(' ')
})
</script>