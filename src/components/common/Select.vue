<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text font-medium">
        {{ label }}
        <span v-if="required" class="text-error">*</span>
      </span>
    </label>
    
    <select
      :value="modelValue"
      :disabled="disabled"
      :class="selectClasses"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" disabled>{{ placeholder || 'Select an option' }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    
    <label v-if="error" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  options: {
    type: Array,
    required: true,
    // Array of { value, label }
  },
  error: String,
  disabled: Boolean,
  required: Boolean,
})

defineEmits(['update:modelValue'])

const selectClasses = computed(() => {
  const classes = ['select', 'select-bordered', 'w-full']
  if (props.error) classes.push('select-error')
  return classes.join(' ')
})
</script>