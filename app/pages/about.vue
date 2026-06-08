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

    <!-- Bio -->
    <section v-if="page?.bio" class="px-5 py-16 sm:px-8 sm:py-24">
      <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 class="mb-5 font-serif text-3xl italic text-dark sm:text-4xl">
            {{ page.bio.title }}
          </h2>
          <p class="font-sans text-[0.875rem] leading-relaxed text-charcoal/65 whitespace-pre-line">
            {{ page.bio.body }}
          </p>
        </div>
        <div v-if="page.bio.image" class="aspect-[4/5] overflow-hidden rounded-sm bg-charcoal/5">
          <NuxtImg
            :src="page.bio.image"
            alt=""
            class="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <SectionsSectionDivider />

    <!-- Specialties -->
    <section v-if="page?.specialties?.length" class="px-5 py-16 sm:px-8 sm:py-24">
      <div class="mx-auto max-w-7xl">
        <SectionsValuesPillars :pillars="page.specialties" />
      </div>
    </section>

    <SectionsSectionDivider />

    <!-- Studio images -->
    <section v-if="studioImages.length" class="px-5 py-16 sm:px-8 sm:py-24">
      <div class="mx-auto max-w-7xl">
        <SectionsImageGallery :images="studioImages" :columns="3" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { page } = useLocaleContent('aboutPage')

const studioImages = computed(() => (page.value as any)?.studioImages ?? [])
</script>
