<template>
  <!--
    Testimonials wall — screenshot images pulled from the shared testimonials.json
    data collection. A CSS masonry (columns) layout lets each screenshot show at
    its natural aspect ratio (no cropping); click any one to preview it full-size
    in the shared lightbox. An optional numbered label sits on top.
  -->
  <section class="px-5 py-16 sm:px-8 sm:py-24">
    <div class="mx-auto max-w-7xl">
      <div v-if="title || sectionLabel" class="mb-12">
        <p v-if="sectionLabel" class="mb-2 font-sans text-[0.625rem] tracking-[0.28em] text-sage uppercase">
          {{ sectionLabel }} — <span class="text-sage/50">{{ accent }}</span>
        </p>
        <h2 v-if="title" class="font-serif text-3xl italic text-dark sm:text-4xl">
          {{ title }}
        </h2>
      </div>
      <div v-if="images.length" class="columns-2 gap-3 *:mb-3 sm:gap-4 sm:*:mb-4 md:columns-3">
        <button
          v-for="(src, i) in images"
          :key="i"
          type="button"
          class="group block w-full break-inside-avoid overflow-hidden rounded-sm bg-charcoal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/60"
          :aria-label="locale === 'fr' ? 'Voir en grand' : 'View larger'"
          @click="openLightbox(src)"
        >
          <NuxtImg
            :src="src"
            :alt="altText ?? ''"
            class="w-full cursor-pointer transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
          />
        </button>
      </div>
    </div>

    <SectionsImageLightbox :src="activeSrc" :alt="altText" @close="activeSrc = null" />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  sectionLabel?: string
  accent?: string
  title?: string
  altText?: string
}>()

const { locale } = useI18n()

const { data: testimonialData } = await useAsyncData('testimonials-data', () =>
  queryCollection('testimonials').first(),
)

const images = computed<string[]>(() => (testimonialData.value as { body?: string[] } | null)?.body ?? [])

const activeSrc = ref<string | null>(null)

function openLightbox(src: string) {
  activeSrc.value = src
}
</script>
