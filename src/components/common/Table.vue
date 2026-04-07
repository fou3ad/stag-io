<template>
  <div class="w-full overflow-x-auto bg-white border border-slate-200 rounded-xl shadow-sm">
    <table class="w-full text-left text-sm text-slate-600">
      
      <thead class="bg-slate-50 text-slate-500 uppercase text-xs font-semibold border-b border-slate-200">
        <tr>
          <th v-for="(col, index) in columns" :key="index" class="px-6 py-4 whitespace-nowrap">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      
      <tbody class="divide-y divide-slate-100">
        <slot></slot>
      </tbody>
      
    </table>
  </div>
</template>

<script setup>
defineProps({
  // مصفوفة لتحديد الأعمدة، مثلاً: [{ label: 'Nom' }, { label: 'Statut' }, { label: 'Actions' }]
  columns: { type: Array, required: true } 
})
</script>