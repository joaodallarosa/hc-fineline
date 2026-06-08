<template>
  <div>
    <!-- Page header -->
    <div class="px-5 py-16 sm:px-8 sm:py-24">
      <div class="mx-auto max-w-7xl">
        <div v-if="page?.intro" class="mb-12">
          <h1 class="mb-4 font-serif text-4xl italic text-dark sm:text-5xl">
            {{ page.intro.title }}
          </h1>
          <p class="max-w-xl font-sans text-[0.875rem] leading-relaxed text-charcoal/60">
            {{ page.intro.body }}
          </p>
        </div>

        <!-- Full gallery from tattoos.json -->
        <SectionsImageGallery
          v-if="allImages.length"
          :images="allImages"
          :columns="3"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { page } = useLocaleContent('galleryPage')

const { data: tattoosData } = await useAsyncData('tattoos-all', () =>
  queryCollection('tattoos').first(),
)

const allImages = computed(() => {
  const raw = (tattoosData.value as any) ?? []
  const arr: Array<{ order: number; src: string }> = Array.isArray(raw) ? raw : []
  return [...arr].sort((a, b) => a.order - b.order).map(t => ({ src: t.src }))
})
</script>
