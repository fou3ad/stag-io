<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text font-medium">
        {{ label }}
        <span v-if="required" class="text-error">*</span>
      </span>
    </label>
    
    <!-- Selected tags -->
    <div class="flex flex-wrap gap-2 mb-2" v-if="modelValue.length > 0">
      <span 
        v-for="item in modelValue" 
        :key="item" 
        class="badge badge-primary gap-2"
      >
        {{ getLabelByValue(item) }}
        <button 
          type="button"
          class="btn btn-ghost btn-xs btn-circle"
          @click="removeItem(item)"
        >
          ✕
        </button>
      </span>
    </div>
    
    <!-- Dropdown -->
    <select
      :disabled="disabled"
      class="select select-bordered w-full"
      @change="addItem"
    >
      <option value="" disabled selected>{{ placeholder || 'Select items' }}</option>
      <option 
        v-for="option in availableOptions" 
        :key="option.value" 
        :value="option.value"
      >
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
  modelValue: {
    type: Array,
    default: () => []
  },
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

const emit = defineEmits(['update:modelValue'])

const availableOptions = computed(() => {
  return props.options.filter(opt => !props.modelValue.includes(opt.value))
})

const getLabelByValue = (value) => {
  const option = props.options.find(opt => opt.value === value)
  return option ? option.label : value
}

const addItem = (event) => {
  const value = event.target.value
  if (value && !props.modelValue.includes(value)) {
    emit('update:modelValue', [...props.modelValue, value])
  }
  event.target.value = ''
}

const removeItem = (value) => {
  emit('update:modelValue', props.modelValue.filter(v => v !== value))
}
</script>