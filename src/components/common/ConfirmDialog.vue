<template>
  <Modal v-model="modelValue" :title="title" size="sm">
    <p class="text-base-content/80">{{ message }}</p>
    
    <template #actions>
      <Button variant="ghost" @click="cancel">{{ cancelText }}</Button>
      <Button :variant="confirmVariant" @click="confirm">{{ confirmText }}</Button>
    </template>
  </Modal>
</template>

<script setup>
import Modal from './Modal.vue'
import Button from './Button.vue'

const props = defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    default: 'Confirm'
  },
  message: {
    type: String,
    default: 'Are you sure?'
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  confirmVariant: {
    type: String,
    default: 'primary'
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const confirm = () => {
  emit('confirm')
  emit('update:modelValue', false)
}

const cancel = () => {
  emit('cancel')
  emit('update:modelValue', false)
}
</script>