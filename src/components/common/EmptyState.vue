<template>
  <div class="flex flex-col items-center justify-center p-12 text-center bg-slate-50 border border-dashed border-slate-300 rounded-xl">
    
    <div class="w-16 h-16 mb-4 text-slate-400">
      <slot name="icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </slot>
    </div>

    <h3 class="text-base font-semibold text-slate-900">{{ title }}</h3>
    <p class="mt-1 text-sm text-slate-500 max-w-sm">{{ description }}</p>
    
    <div class="mt-6" v-if="$slots.action">
      <slot name="action"></slot>
    </div>

  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Aucun résultat trouvé' },
  description: { type: String, default: "Il n'y a actuellement aucune donnée à afficher ici." }
})
</script>