<template>
  <div
    v-if="items?.length"
    class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3"
  >
    <blockquote
      v-for="(t, i) in items"
      :key="i"
      class="flex flex-col justify-between rounded-sm border border-charcoal/8 p-5 sm:p-6"
    >
      <p class="mb-4 font-sans text-[0.75rem] leading-relaxed text-charcoal/70 italic">
        "{{ t.text }}"
      </p>
      <footer class="font-sans text-[0.625rem] tracking-[0.14em] text-sage uppercase">
        — {{ t.name }}
      </footer>
    </blockquote>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items?: Array<{ text: string; name: string }>
}>()
</script>
