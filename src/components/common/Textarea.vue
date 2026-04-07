<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="text-sm font-semibold text-slate-700">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :rows="rows"
      :class="[
        'w-full px-3 py-2.5 bg-white border rounded-lg text-sm transition-all outline-none resize-y',
        error 
          ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
          : 'border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent',
        { 'bg-slate-50 text-slate-500 cursor-not-allowed': disabled }
      ]"
    ></textarea>

    <span v-if="error" class="text-xs text-red-600 mt-0.5">{{ error }}</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  rows: { type: [String, Number], default: 4 } // الارتفاع الافتراضي
})

defineEmits(['update:modelValue'])
</script>