<template>
  <div>
    <!-- Hero -->
    <SectionsSectionHero
      v-if="page?.hero"
      :eyebrow="page.hero.eyebrow"
      :title-lines="page.hero.titleLines"
      :title-emphasis="page.hero.titleEmphasis"
      :subcopy="page.hero.subcopy"
      :corner-text="page.hero.cornerText"
      :media="page.hero.media"
      :ctas="heroCtasLocalized"
    />

    <SectionsSectionDivider />

    <!-- Works / gallery teaser -->
    <section v-if="page?.works" class="px-5 py-16 sm:px-8 sm:py-24">
      <div class="mx-auto max-w-7xl">
        <SectionsSectionLabel
          :number="page.works.sectionLabel ?? '01'"
          :accent="page.works.sectionLabelAccent ?? ''"
          :title="page.works.title ?? ''"
          :cta-label="page.works.ctaLabel"
          :cta-href="localePath('/gallery')"
        />
        <SectionsImageGallery
          v-if="heroImages.length"
          :images="heroImages"
          :columns="3"
        />
      </div>
    </section>

    <SectionsSectionDivider />

    <!-- About teaser -->
    <section v-if="page?.about" class="px-5 py-16 sm:px-8 sm:py-24">
      <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p class="mb-2 font-sans text-[0.625rem] tracking-[0.28em] text-sage uppercase">
            {{ page.about.sectionLabel ?? '02' }} — <span class="text-sage/50">{{ page.about.sectionLabelAccent }}</span>
          </p>
          <h2 class="mb-5 font-serif text-3xl italic text-dark sm:text-4xl">
            {{ page.about.title }}
          </h2>
          <p class="mb-8 font-sans text-[0.875rem] leading-relaxed text-charcoal/65">
            {{ page.about.body }}
          </p>
          <NuxtLink
            v-if="page.about.ctaLabel"
            :to="localePath('/about')"
            class="inline-flex items-center gap-2 font-sans text-[0.625rem] tracking-[0.2em] text-sage underline underline-offset-4 uppercase"
          >
            {{ page.about.ctaLabel }}
          </NuxtLink>
        </div>
        <div v-if="page.about.image" class="aspect-[4/5] overflow-hidden rounded-sm bg-charcoal/5">
          <NuxtImg
            :src="page.about.image"
            alt=""
            class="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <SectionsSectionDivider />

    <!-- Testimonials -->
    <section v-if="testimonialImages.length" class="px-5 py-16 sm:px-8 sm:py-24">
      <div class="mx-auto max-w-7xl">
        <div v-if="page?.testimonials" class="mb-12">
          <p class="mb-2 font-sans text-[0.625rem] tracking-[0.28em] text-sage uppercase">
            {{ page.testimonials.sectionLabel ?? '03' }} — <span class="text-sage/50">{{ page.testimonials.sectionLabelAccent }}</span>
          </p>
          <h2 class="font-serif text-3xl italic text-dark sm:text-4xl">
            {{ page.testimonials.title }}
          </h2>
        </div>
        <div class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          <div
            v-for="(src, i) in testimonialImages"
            :key="i"
            class="overflow-hidden rounded-sm bg-charcoal/5"
          >
            <NuxtImg
              :src="src"
              :alt="(page as any)?.testimonials?.altText ?? ''"
              class="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <SectionsSectionDivider />

    <!-- Secondary CTA -->
    <SectionsCtaBlock
      v-if="page?.secondaryCta?.cards?.length"
      :cards="page.secondaryCta.cards"
    />

    <SectionsSectionDivider />

    <!-- Practical info -->
    <SectionsPracticalInfo
      v-if="page?.practicalInfo"
      :address="page.practicalInfo.address"
      :hours="page.practicalInfo.hours"
      :whatsapp="page.practicalInfo.whatsapp"
      :instagram="page.practicalInfo.instagram"
      :map-embed="page.practicalInfo.mapEmbed"
    />
  </div>
</template>

<script setup lang="ts">
const { page, localePath } = useLocaleContent('homepage')

const { data: testimonialData } = await useAsyncData('testimonials-data', () =>
  queryCollection('testimonials').first(),
)

const testimonialImages = computed<string[]>(() =>
  (testimonialData.value as any)?.body ?? [],
)

const heroImages = computed(() =>
  (page.value as any)?.images ?? [],
)

const heroCtasLocalized = computed(() =>
  (page.value as any)?.hero?.ctas?.map((cta: { label: string; href: string }) => ({
    label: cta.label,
    href: localePath(cta.href),
  })) ?? []
)
</script>
