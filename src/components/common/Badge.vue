<template>
  <span
    :class="[
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide',
      colorClasses[variant]
    ]"
  >
    <slot></slot>
  </span>
</template>

<script setup>
const props = defineProps({
  variant: { type: String, default: 'neutral' } // success, warning, danger, info, neutral
})

// ألوان أكاديمية "Pastel/Muted"
const colorClasses = {
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  danger: 'bg-red-50 text-red-700 border border-red-200',
  info: 'bg-blue-50 text-blue-700 border border-blue-200',
  neutral: 'bg-slate-100 text-slate-700 border border-slate-200'
}
</script>