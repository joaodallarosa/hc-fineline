<template>
  <footer class="border-t border-charcoal/10 bg-forest px-5 py-12 sm:px-8">
    <div class="mx-auto max-w-7xl">
      <!-- Top row: brand + social -->
      <div class="mb-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <NuxtLink :to="localePath('/')" class="font-serif text-lg italic text-cream">
          {{ settings?.studioName ?? 'Helena de Carvalho' }}
        </NuxtLink>

        <div class="flex items-center gap-5">
          <!-- Instagram -->
          <a
            v-if="settings?.instagramUrl"
            :href="settings.instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-cream/40 transition-colors hover:text-sage-light"
            aria-label="Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <!-- WhatsApp -->
          <a
            v-if="settings?.whatsappUrl"
            :href="settings.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-cream/40 transition-colors hover:text-sage-light"
            aria-label="WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 14.9 19.79 19.79 0 01.67 6.35 2 2 0 012.66 4.17h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 11.1a16 16 0 006 6l1-1.02a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Middle: address -->
      <div class="mb-8 text-center sm:text-left">
        <p class="font-sans text-[0.6875rem] leading-relaxed text-cream/50">
          {{ settings?.studioAddress }}
        </p>
        <p class="font-sans text-[0.6875rem] text-cream/35">
          {{ nav?.footer?.byAppointment ?? 'Sur rendez-vous uniquement' }}
        </p>
      </div>

      <!-- Bottom row: legal + copyright -->
      <div class="flex flex-col items-center gap-4 border-t border-cream/10 pt-6 sm:flex-row sm:justify-between">
        <nav class="flex flex-wrap justify-center gap-6">
          <NuxtLink
            :to="localePath('/terms-and-conditions')"
            class="font-sans text-[0.625rem] tracking-[0.15em] text-cream/35 uppercase transition-colors hover:text-cream/60"
          >
            {{ nav?.footer?.terms ?? 'CGV' }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/privacy-policy')"
            class="font-sans text-[0.625rem] tracking-[0.15em] text-cream/35 uppercase transition-colors hover:text-cream/60"
          >
            {{ nav?.footer?.privacy ?? 'Politique de confidentialité' }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/cookie-policy')"
            class="font-sans text-[0.625rem] tracking-[0.15em] text-cream/35 uppercase transition-colors hover:text-cream/60"
          >
            {{ nav?.footer?.cookies ?? 'Politique cookies' }}
          </NuxtLink>
        </nav>
        <p class="font-sans text-[0.625rem] tracking-[0.15em] text-cream/30 uppercase">
          © {{ currentYear }} {{ settings?.studioName ?? 'Helena de Carvalho' }} · {{ nav?.footer?.rights ?? 'Tous droits réservés' }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const currentYear = new Date().getFullYear()
const { settings } = useSettings()
const { nav } = useNavContent()
</script>

