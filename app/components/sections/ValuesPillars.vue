<template>
  <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
    <div v-for="(pillar, i) in pillars" :key="i">
      <div class="mb-3 h-px w-8 bg-sage" />
      <h3 class="mb-2 font-serif text-base italic text-dark">{{ pillar.title }}</h3>
      <p class="font-sans text-[0.75rem] leading-relaxed text-charcoal/55">{{ pillar.body }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  pillars: Array<{ title: string; body: string }>
}>()
</script>
