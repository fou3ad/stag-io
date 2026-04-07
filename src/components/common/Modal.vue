<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box bg-white">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      
      <h3 v-if="title" class="font-bold text-lg text-gray-900 mb-4">{{ title }}</h3>
      
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
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  title: String,
})

const emit = defineEmits(['update:modelValue'])

const modal = ref(null)

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    modal.value?.showModal()
  } else {
    modal.value?.close()
  }
})
</script>