<template>
  <div class="mb-12 flex items-end justify-between">
    <div>
      <p class="mb-2 font-sans text-[0.625rem] tracking-[0.28em] text-sage uppercase">
        {{ number }} — <span class="text-sage/50">{{ accent }}</span>
      </p>
      <h2 class="font-serif text-3xl italic text-dark sm:text-4xl">
        {{ title }}
      </h2>
    </div>
    <NuxtLink
      v-if="ctaLabel && ctaHref"
      :to="ctaHref"
      class="hidden font-sans text-[0.625rem] tracking-[0.2em] text-sage underline underline-offset-4 uppercase transition-opacity hover:opacity-60 sm:block"
    >
      {{ ctaLabel }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  number: string
  accent: string
  title: string
  ctaLabel?: string
  ctaHref?: string
}>()
</script>
