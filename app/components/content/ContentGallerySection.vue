<template>
  <!--
    Image gallery section. Wraps SectionsImageGallery (numbered captions + built-in
    lightbox). Images come from EITHER:
      • `source: tattoos` → the shared tattoos.json data collection (full portfolio), or
      • an inline `images` list of `{ src }` entries (page-specific selections).
    An optional numbered label header (set `number`) sits above the grid.
  -->
  <section class="px-5 py-16 sm:px-8 sm:py-24">
    <div class="mx-auto max-w-7xl">
      <SectionsSectionLabel
        v-if="number"
        :number="number"
        :accent="accent ?? ''"
        :title="title ?? ''"
        :cta-label="ctaLabel"
        :cta-href="ctaHref ? localePath(ctaHref) : undefined"
      />
      <SectionsImageGallery
        v-if="displayImages.length"
        :images="displayImages"
        :columns="normalizedColumns"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const props = withDefaults(defineProps<{
  number?: string
  accent?: string
  title?: string
  ctaLabel?: string
  ctaHref?: string
  columns?: 2 | 3
  /** Pull the full portfolio from the tattoos.json data collection. */
  source?: 'tattoos'
  /** Inline, page-specific image list (used when `source` is not set). */
  images?: Array<{ src: string }>
}>(), {
  columns: 3,
})

// Shared portfolio (tattoos.json) — fetched once, reused via the shared key.
const { data: tattoosData } = await useAsyncData('tattoos-all', () =>
  queryCollection('tattoos').first(),
)

const tattooImages = computed<Array<{ src: string }>>(() => {
  // @nuxt/content can't map a top-level JSON array to columns, so it wraps it
  // under `meta.body`. Depending on the query shape the result may be the array
  // itself, `{ body: [...] }`, or `{ meta: { body: [...] } }` — handle all.
  const raw = tattoosData.value as Record<string, unknown> | Array<unknown> | null
  const pickArray = (v: unknown): Array<{ order?: number; src: string }> =>
    Array.isArray(v) ? (v as Array<{ order?: number; src: string }>) : []
  const arr = Array.isArray(raw)
    ? pickArray(raw)
    : pickArray((raw as { body?: unknown })?.body).length
      ? pickArray((raw as { body?: unknown })?.body)
      : pickArray(((raw as { meta?: { body?: unknown } })?.meta)?.body)
  return [...arr].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map(t => ({ src: t.src }))
})

const displayImages = computed<Array<{ src: string }>>(() =>
  props.source === 'tattoos' ? tattooImages.value : (props.images ?? []),
)

// Accept either a number or a YAML string ("2"/"3") from the editor.
const normalizedColumns = computed<2 | 3>(() => (Number(props.columns) === 2 ? 2 : 3))
</script>
