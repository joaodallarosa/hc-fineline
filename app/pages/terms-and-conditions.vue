<template>
  <div class="px-5 py-20 sm:px-8 sm:py-28">
    <div class="mx-auto max-w-2xl">
      <p v-if="page?.lastUpdated" class="mb-3 font-sans text-[0.625rem] tracking-[0.2em] text-charcoal/40 uppercase">
        {{ page.lastUpdated }}
      </p>
      <h1 class="mb-10 font-serif text-3xl italic text-dark sm:text-4xl">
        {{ page?.title }}
      </h1>
      <div class="prose prose-sm prose-neutral max-w-none font-sans text-charcoal/70">
        <ContentRenderer v-if="page" :value="page" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { page } = useLocaleContent('legal', 'terms-and-conditions')
</script>
