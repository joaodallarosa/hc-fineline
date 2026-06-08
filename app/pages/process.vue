<template>
  <div>
    <!-- Hero -->
    <SectionsSectionHero
      v-if="page?.hero"
      :eyebrow="page.hero.eyebrow"
      :title-lines="page.hero.titleLines"
      :title-emphasis="page.hero.titleEmphasis"
      :subcopy="page.hero.subcopy"
      :media="page.hero.media"
    />

    <SectionsSectionDivider />

    <!-- Intro -->
    <section v-if="page?.intro" class="px-5 py-16 sm:px-8 sm:py-24">
      <div class="mx-auto max-w-3xl">
        <h2 class="mb-5 font-serif text-3xl italic text-dark sm:text-4xl">
          {{ page.intro.title }}
        </h2>
        <p class="font-sans text-[0.875rem] leading-relaxed text-charcoal/65">
          {{ page.intro.body }}
        </p>
      </div>
    </section>

    <SectionsSectionDivider />

    <!-- Steps -->
    <section v-if="page?.steps?.length" class="px-5 py-16 sm:px-8 sm:py-24">
      <div class="mx-auto max-w-3xl space-y-10">
        <div
          v-for="(step, i) in page.steps"
          :key="i"
          class="flex gap-6 sm:gap-10"
        >
          <div class="flex-none pt-1">
            <span class="font-sans text-[0.6875rem] tracking-[0.2em] text-sage/50">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
          </div>
          <div>
            <h3 class="mb-2 font-serif text-xl italic text-dark sm:text-2xl">{{ step.title }}</h3>
            <p class="font-sans text-[0.8125rem] leading-relaxed text-charcoal/65">{{ step.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <SectionsSectionDivider />

    <!-- FAQ -->
    <section v-if="page?.faq?.length" class="px-5 py-16 sm:px-8 sm:py-24">
      <div class="mx-auto max-w-3xl">
        <h2 class="mb-10 font-serif text-2xl italic text-dark sm:text-3xl">
          {{ (page as any)?.faqTitle ?? 'Questions fréquentes' }}
        </h2>
        <SectionsFaqAccordion :items="page.faq" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { page } = useLocaleContent('processPage')
</script>
