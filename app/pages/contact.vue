<template>
  <div>
    <!-- Intro -->
    <section v-if="page?.intro" class="px-5 py-20 sm:px-8 sm:py-28">
      <div class="mx-auto max-w-3xl">
        <h1 class="mb-5 font-serif text-4xl italic text-dark sm:text-5xl">
          {{ page.intro.title }}
        </h1>
        <p class="max-w-xl font-sans text-[0.875rem] leading-relaxed text-charcoal/65">
          {{ page.intro.body }}
        </p>
      </div>
    </section>

    <SectionsSectionDivider />

    <!-- Practical info + WhatsApp CTA -->
    <SectionsPracticalInfo
      v-if="page?.practicalInfo"
      :address="page.practicalInfo.address"
      :hours="page.practicalInfo.hours"
      :whatsapp="page.practicalInfo.whatsapp"
      :instagram="page.practicalInfo.instagram"
      :map-embed="page.practicalInfo.mapEmbed"
    />

    <!-- WhatsApp booking CTA -->
    <section class="px-5 pb-20 sm:px-8">
      <div class="mx-auto max-w-7xl text-center">
        <a
          v-if="page?.practicalInfo?.whatsapp"
          :href="page.practicalInfo.whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-3 rounded-sm border border-sage/80 bg-sage px-8 py-4 font-sans text-[0.6875rem] tracking-[0.18em] text-cream uppercase transition-all hover:bg-sage/90"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 14.9a19.79 19.79 0 01-3.03-8.55A2 2 0 012.66 4.17h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 11.1a16 16 0 006 6l1-1.02a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
          {{ (page as any)?.ctaLabel ?? 'Réserver via WhatsApp' }}
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { page } = useLocaleContent('contactPage')
</script>
