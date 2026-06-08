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

    <!-- Care content -->
    <section class="px-5 py-16 sm:px-8 sm:py-24">
      <div class="mx-auto max-w-3xl">
        <SectionsCareSteps
          v-if="page?.tattooCare"
          :steps="page.tattooCare.steps"
          :avoid="page.tattooCare.avoid"
          :normal="page.tattooCare.normal"
          :when-to-contact="(page.tattooCare as any).whenToContact ? [(page.tattooCare as any).whenToContact] : undefined"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { page } = useLocaleContent('carePage')
</script>
