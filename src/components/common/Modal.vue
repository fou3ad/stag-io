<template>
  <dialog ref="modal" class="modal">
    <div :class="modalBoxClasses">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      
      <h3 v-if="title" class="font-bold text-lg mb-4">{{ title }}</h3>
      
      <div class="py-4">
        <slot />
      </div>
      
      <div v-if="$slots.actions" class="modal-action">
        <slot name="actions" />
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref, watch,computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  title: String,
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['sm', 'md', 'lg'].includes(val)
  }
})

const emit = defineEmits(['update:modelValue'])

const modal = ref(null)

const modalBoxClasses = computed(() => {
  const classes = ['modal-box']
  if (props.size === 'sm') classes.push('max-w-md')
  else if (props.size === 'lg') classes.push('max-w-3xl')
  return classes.join(' ')
})

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    modal.value?.showModal()
  } else {
    modal.value?.close()
  }
})

// Listen for close event
if (modal.value) {
  modal.value.addEventListener('close', () => {
    emit('update:modelValue', false)
  })
}
</script>