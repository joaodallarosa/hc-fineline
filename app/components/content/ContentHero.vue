<template>
  <!--
    Full-bleed page hero. Thin wrapper over SectionsSectionHero so the design is
    unchanged; CTA hrefs are localised here (so the editor writes plain paths
    like `/gallery` and they resolve to `/en/gallery` under the English locale).
  -->
  <SectionsSectionHero
    :eyebrow="eyebrow"
    :title-lines="titleLines"
    :title-emphasis="titleEmphasis"
    :subcopy="subcopy"
    :corner-text="cornerText"
    :media="media"
    :ctas="localizedCtas"
  />
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const props = defineProps<{
  eyebrow?: string
  titleLines?: string[]
  titleEmphasis?: string
  subcopy?: string
  cornerText?: string
  ctas?: Array<{ label: string; href: string }>
  media?: { type?: 'image' | 'video'; src?: string; alt?: string }
}>()

const localizedCtas = computed(() =>
  (props.ctas ?? []).map(cta => ({ label: cta.label, href: localePath(cta.href) }))
)
</script>
