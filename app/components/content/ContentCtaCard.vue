<template>
  <!--
    A single CTA card used inside <ContentCtaCards>. Title/label/href are short
    props; the description is the default slot so editors type it inline.
  -->
  <NuxtLink
    :to="localePath(href)"
    class="group relative flex flex-col justify-end rounded-sm border border-charcoal/10 p-8 transition-all duration-300 hover:border-sage/30 hover:shadow-sm sm:p-10"
  >
    <h3 v-if="$slots.title || title" class="mb-3 font-serif text-2xl italic text-dark transition-colors group-hover:text-sage sm:text-3xl [&>p]:m-0">
      <slot name="title">{{ title }}</slot>
    </h3>
    <div class="mb-6 font-sans text-[0.8125rem] leading-relaxed text-charcoal/60 [&>p]:m-0 [&>p]:mb-2 [&>p:last-child]:mb-0">
      <slot />
    </div>
    <span class="inline-flex items-center gap-2 font-sans text-[0.625rem] tracking-[0.2em] text-sage uppercase">
      {{ label }}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

defineProps<{
  title?: string
  href: string
  label: string
}>()
</script>
