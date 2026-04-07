<template>
  <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
    
    <div v-if="$slots.header" class="px-5 py-4 border-b border-slate-100">
      <slot name="header"></slot>
    </div>

    <div class="p-5">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="px-5 py-3 bg-slate-50 border-t border-slate-100">
      <slot name="footer"></slot>
    </div>
    
  </div>
</template>

<script setup>
// مكون بسيط جداً يعتمد على الـ Slots لمرونة الاستخدام
</script>