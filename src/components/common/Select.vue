<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="text-sm font-semibold text-slate-700">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :required="required"
      :disabled="disabled"
      :class="[
        'w-full px-3 py-2.5 bg-white border rounded-lg text-sm transition-all outline-none cursor-pointer',
        error 
          ? 'border-red-300 text-red-900 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
          : 'border-slate-300 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent',
        { 'bg-slate-50 text-slate-500 cursor-not-allowed': disabled }
      ]"
    >
      <option value="" disabled selected v-if="placeholder">
        {{ placeholder }}
      </option>
      
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <span v-if="error" class="text-xs text-red-600 mt-0.5">{{ error }}</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  options: { type: Array, required: true, default: () => [] }, // مصفوفة الخيارات [{label: 'IT', value: '1'}]
  placeholder: { type: String, default: 'Sélectionnez une option' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

defineEmits(['update:modelValue'])
</script>