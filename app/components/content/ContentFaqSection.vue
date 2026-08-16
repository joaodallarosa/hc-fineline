<template>
  <!--
    FAQ block: an italic title above a single-open accordion (SectionsFaqAccordion).
    The questions are an inline `items` list of `{ question, answer }`. The
    accordion's single-open / first-open behaviour is preserved by keeping the
    items as data rather than per-item child blocks.
  -->
  <section class="px-5 py-16 sm:px-8 sm:py-24">
    <div class="mx-auto max-w-3xl">
      <h2 v-if="title" class="mb-10 font-serif text-2xl italic text-dark sm:text-3xl">
        {{ title }}
      </h2>
      <SectionsFaqAccordion v-if="items?.length" :items="items" />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  items?: Array<{ question: string; answer: string }>
}>()
</script>
