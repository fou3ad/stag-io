<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="text-sm font-semibold text-slate-700">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="[
        'w-full px-3 py-2.5 bg-white border rounded-lg text-sm transition-all outline-none',
        error 
          ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-2 focus:ring-red-500 focus:border-red-500' 
          : 'border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent',
        { 'bg-slate-50 text-slate-500 cursor-not-allowed': disabled }
      ]"
    />

    <span v-if="error" class="text-xs text-red-600 mt-0.5">
      {{ error }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

defineEmits(['update:modelValue'])
</script>