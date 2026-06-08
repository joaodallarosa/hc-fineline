<template>
  <div>
    <!-- Header -->
    <section class="px-5 py-20 sm:px-8 sm:py-28">
      <div class="mx-auto max-w-3xl text-center">
        <h1 class="mb-4 font-serif text-4xl italic text-dark sm:text-5xl">
          {{ page?.title }}
        </h1>
        <p class="font-sans text-[0.875rem] leading-relaxed text-charcoal/60">
          {{ page?.subtitle }}
        </p>
      </div>
    </section>

    <SectionsSectionDivider />

    <!-- Steps -->
    <section v-if="page?.steps?.length" class="px-5 py-16 sm:px-8 sm:py-24">
      <div class="mx-auto max-w-3xl space-y-10">
        <div
          v-for="(step, i) in page.steps"
          :key="i"
          class="flex gap-6 sm:gap-10"
        >
          <div class="flex-none pt-1">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 font-sans text-[0.6875rem] font-medium text-sage">
              {{ String(i + 1).padStart(2, '0') }}
            </div>
          </div>
          <div class="flex-1 pt-1">
            <h3 class="mb-2 font-serif text-xl italic text-dark sm:text-2xl">{{ step.title }}</h3>
            <p class="font-sans text-[0.8125rem] leading-relaxed text-charcoal/65">{{ step.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <SectionsSectionDivider />

    <!-- WhatsApp CTA -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <a
          v-if="whatsappHref"
          :href="whatsappHref"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-3 rounded-sm border border-sage/80 bg-sage px-10 py-5 font-sans text-[0.75rem] tracking-[0.18em] text-cream uppercase transition-all hover:bg-sage/90"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 14.9a19.79 19.79 0 01-3.03-8.55A2 2 0 012.66 4.17h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 11.1a16 16 0 006 6l1-1.02a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
          {{ (page as any)?.ctaLabel ?? 'Réserver via WhatsApp' }}
        </a>
      </div>
    </section>

    <SectionsSectionDivider />

    <!-- Secondary CTA cards -->
    <SectionsCtaBlock
      v-if="page?.secondaryCta?.cards?.length"
      :cards="page.secondaryCta.cards"
    />
  </div>
</template>

<script setup lang="ts">
const { page } = useLocaleContent('bookOnlinePage')

const whatsappHref = computed(() => {
  const base = (page.value as any)?.whatsapp ?? 'https://wa.me/33600000000'
  const msg = (page.value as any)?.whatsappMessage ?? ''
  return msg ? `${base}?text=${encodeURIComponent(msg)}` : base
})
</script>
