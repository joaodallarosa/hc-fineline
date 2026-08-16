<template>
  <!--
    Generic section shell: an optional numbered label header (SectionLabel) plus a
    responsive grid for its child blocks (ContentCard / ContentStep). Use it for
    pillar grids, step lists, etc. Header forms:
      • `number` set → numbered label (e.g. "02 — à propos") + optional CTA
      • otherwise    → no header, just the grid of children
  -->
  <section class="px-5 py-16 sm:px-8 sm:py-24">
    <div class="mx-auto" :class="widthClass">
      <SectionsSectionLabel
        v-if="number"
        :number="number"
        :accent="accent ?? ''"
        :title="title ?? ''"
        :cta-label="ctaLabel"
        :cta-href="ctaHref ? localePath(ctaHref) : undefined"
      />
      <div :class="gridClass">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const props = withDefaults(defineProps<{
  /** Numbered label, e.g. "02". When set, renders the SectionLabel header. */
  number?: string
  /** Accent word shown next to the number, e.g. "à propos". */
  accent?: string
  /** Heading shown in the label. */
  title?: string
  ctaLabel?: string
  ctaHref?: string
  /** Responsive column ramp for the children grid. */
  columns?: '1' | '2' | '3' | '4'
  /** Inner max-width. */
  width?: '3xl' | '4xl' | '7xl'
}>(), {
  columns: '3',
  width: '7xl',
})

const widthClass = computed(() => ({
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '7xl': 'max-w-7xl',
}[props.width]))

const gridClass = computed(() => ({
  '1': 'grid grid-cols-1 gap-10',
  '2': 'grid grid-cols-1 gap-10 sm:grid-cols-2',
  '3': 'grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4',
}[props.columns]))
</script>
