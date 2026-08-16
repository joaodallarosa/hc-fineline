<template>
  <div :class="columns === 2 ? 'grid grid-cols-2 gap-3 sm:gap-4' : 'grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3'">
    <div
      v-for="(image, index) in images"
      :key="(image.src ?? '') + index"
      class="group relative"
    >
      <button
        type="button"
        class="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/60 rounded-sm"
        aria-label="Voir en grand"
        @click="openLightbox(image.src)"
      >
        <div class="aspect-3/4 overflow-hidden rounded-sm bg-charcoal/6">
          <NuxtImg
            :src="image.src"
            alt=""
            :loading="index < 4 ? 'eager' : 'lazy'"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
            class="h-full w-full object-cover cursor-pointer transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      </button>
      <p class="mt-2.5 font-sans text-[0.625rem] tracking-[0.18em] text-charcoal/50 uppercase">
        {{ String(index + 1).padStart(2, '0') }}
      </p>
    </div>
  </div>

  <SectionsImageLightbox :src="activeSrc" @close="activeSrc = null" />
</template>

<script setup lang="ts">
defineProps<{
  images: Array<{ src: string }>
  columns?: 2 | 3
}>()

const activeSrc = ref<string | null>(null)

function openLightbox(src: string) {
  activeSrc.value = src
}
</script>
