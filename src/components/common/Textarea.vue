<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text font-medium">
        {{ label }}
        <span v-if="required" class="text-error">*</span>
      </span>
    </label>
    
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :class="textareaClasses"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
    ></textarea>
    
    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
    
    <label v-else-if="hint" class="label">
      <span class="label-text-alt text-base-content/60">{{ hint }}</span>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  error: String,
  hint: String,
  disabled: Boolean,
  required: Boolean,
  rows: {
    type: Number,
    default: 4
  }
})

defineEmits(['update:modelValue', 'blur'])

const textareaClasses = computed(() => {
  const classes = ['textarea', 'textarea-bordered', 'w-full']
  if (props.error) classes.push('textarea-error')
  return classes.join(' ')
})
</script>