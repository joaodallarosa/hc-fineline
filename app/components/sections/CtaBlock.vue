<template>
  <section class="px-5 py-20 sm:px-8 sm:py-24">
    <div class="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
      <NuxtLink
        v-for="card in cards"
        :key="card.href"
        :to="card.href"
        class="group relative flex flex-col justify-end rounded-sm border border-charcoal/10 p-8 transition-all duration-300 hover:border-sage/30 hover:shadow-sm sm:p-10"
      >
        <h3 class="mb-3 font-serif text-2xl italic text-dark transition-colors group-hover:text-sage sm:text-3xl">
          {{ card.title }}
        </h3>
        <p class="mb-6 font-sans text-[0.8125rem] leading-relaxed text-charcoal/60">
          {{ card.description }}
        </p>
        <span class="inline-flex items-center gap-2 font-sans text-[0.625rem] tracking-[0.2em] text-sage uppercase">
          {{ card.label }}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </span>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  cards: Array<{
    title: string
    description: string
    href: string
    label: string
  }>
}>()
</script>
