<template>
  <section class="relative flex min-h-[62svh] flex-col justify-between px-0 pb-0 sm:min-h-screen">
    <!-- Background media -->
    <div v-if="media" class="absolute inset-0 -z-10">
      <img
        v-if="media.type === 'image'"
        :src="media.src"
        :alt="media.alt ?? ''"
        class="h-full w-full object-cover"
        loading="eager"
      />
      <video
        v-else-if="media.type === 'video'"
        :src="media.src"
        autoplay
        muted
        loop
        playsinline
        class="h-full w-full object-cover"
      />
    </div>

    <!-- Eyebrow tag strip -->
    <div v-if="eyebrow" class="w-full pt-6">
      <div ref="eyebrowContainer" class="mx-5 sm:mx-8 rounded-full bg-black/40 py-1 overflow-hidden">
        <div class="flex" :class="{ 'eyebrow-marquee': isOverflowing }">
          <p ref="eyebrowText" class="px-4 font-sans text-[0.6875rem] tracking-[0.32em] text-cream/90 uppercase whitespace-nowrap">
            {{ eyebrow }}
          </p>
          <p v-if="isOverflowing" class="px-4 font-sans text-[0.6875rem] tracking-[0.32em] text-cream/90 uppercase whitespace-nowrap" aria-hidden="true">
            {{ eyebrow }}
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom content with gradient -->
    <div class="relative w-full mt-auto px-5 pb-8 pt-20 sm:px-8 sm:pb-16 flex flex-col" style="z-index:1;">
      <div class="pointer-events-none absolute inset-x-0 bottom-0 top-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
      <div class="relative z-10 flex flex-col items-start w-full">
        <h1
          v-if="titleLines?.length"
          class="mb-6 font-display text-[clamp(2.2rem,7vw,5rem)] italic leading-[1.06] tracking-tighter text-cream"
        >
          <span v-for="(line, i) in titleLines" :key="i">{{ line }}<br v-if="i < titleLines.length - 1" /></span>
          <em v-if="titleEmphasis" class="not-italic font-light text-cream/80">{{ titleEmphasis }}</em>
        </h1>
        <p
          v-if="subcopy"
          class="mb-8 max-w-xl font-sans text-[0.875rem] leading-relaxed text-cream/90 whitespace-pre-line"
        >
          {{ subcopy }}
        </p>
        <div v-if="ctas?.length" class="flex flex-row gap-3 w-full">
          <NuxtLink
            v-for="(cta, i) in ctas"
            :key="i"
            :to="cta.href"
            :class="i === 0
              ? 'inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 font-sans text-[0.6875rem] tracking-[0.18em] uppercase border bg-sage text-cream border-sage/80 hover:bg-sage/90 transition-all duration-200'
              : 'inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 font-sans text-[0.6875rem] tracking-[0.18em] uppercase border border-cream/30 text-cream hover:border-cream/60 transition-all duration-200'"
          >
            {{ cta.label }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Corner text (optional, desktop only) -->
    <p
      v-if="cornerText"
      class="absolute top-24 right-5 hidden font-sans text-[0.5625rem] tracking-[0.25em] text-olive/40 uppercase sm:right-8 md:block"
      aria-hidden="true"
    >
      {{ cornerText }}
    </p>
  </section>
</template>

<script setup lang="ts">
const eyebrowContainer = ref<HTMLElement | null>(null)
const eyebrowText = ref<HTMLElement | null>(null)
const isOverflowing = ref(false)

onMounted(() => {
  nextTick(() => {
    if (!eyebrowContainer.value || !eyebrowText.value) return
    isOverflowing.value = eyebrowText.value.scrollWidth > eyebrowContainer.value.clientWidth
  })
})

defineProps<{
  eyebrow?: string
  titleLines?: string[]
  titleEmphasis?: string
  subcopy?: string
  cornerText?: string
  ctas?: Array<{ label: string; href: string }>
  media?: { type?: string; src?: string; alt?: string }
}>()
</script>

<style scoped>
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.eyebrow-marquee {
  width: max-content;
  animation: marquee 14s linear infinite;
}
</style>
