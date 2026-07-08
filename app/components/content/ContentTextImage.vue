<template>
  <!--
    Two-column text + image block (the homepage "about teaser" and the /about bio).
    Body copy is the default slot. An optional numbered section label sits above
    the title; an optional CTA link sits below the body.
  -->
  <section class="px-5 py-16 sm:px-8 sm:py-24">
    <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
      <div :class="imagePosition === 'left' ? 'lg:order-2' : ''">
        <p v-if="sectionLabel" class="mb-2 font-sans text-[0.625rem] tracking-[0.28em] text-sage uppercase">
          {{ sectionLabel }} — <span class="text-sage/50">{{ accent }}</span>
        </p>
        <h2 v-if="$slots.title || title" class="mb-5 font-serif text-3xl italic text-dark sm:text-4xl [&>p]:m-0">
          <slot name="title">{{ title }}</slot>
        </h2>
        <div
          class="font-sans text-[0.875rem] leading-relaxed text-charcoal/65 [&>p]:mb-4 [&>p:last-child]:mb-0"
          :class="ctaLabel && ctaHref ? 'mb-8' : ''"
        >
          <slot />
        </div>
        <NuxtLink
          v-if="ctaLabel && ctaHref"
          :to="localePath(ctaHref)"
          class="inline-flex items-center gap-2 font-sans text-[0.625rem] tracking-[0.2em] text-sage underline underline-offset-4 uppercase"
        >
          {{ ctaLabel }}
        </NuxtLink>
      </div>

      <div
        v-if="image"
        class="aspect-[4/5] overflow-hidden rounded-sm bg-charcoal/5"
        :class="imagePosition === 'left' ? 'lg:order-1' : ''"
      >
        <NuxtImg :src="image" alt="" class="h-full w-full object-cover" loading="lazy" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

withDefaults(defineProps<{
  /** Optional small number above the title, e.g. "02". */
  sectionLabel?: string
  /** Accent word shown after the number. */
  accent?: string
  title?: string
  image?: string
  imagePosition?: 'left' | 'right'
  ctaLabel?: string
  ctaHref?: string
}>(), {
  imagePosition: 'right',
})
</script>
