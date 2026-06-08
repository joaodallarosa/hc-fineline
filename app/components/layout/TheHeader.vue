<template>
  <header
    ref="headerEl"
    class="fixed inset-x-0 top-0 z-50 h-16 transition-[background-color,border-color] duration-300"
    :class="isScrolled || isOpen
      ? 'border-b border-forest/20 bg-forest backdrop-blur-xl'
      : 'border-b border-transparent bg-forest'"
  >
    <div class="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-8">
      <!-- Logo / Brand -->
      <NuxtLink
        :to="localePath('/')"
        class="flex items-center gap-3 select-none"
        @click="isOpen = false"
      >
        <span class="font-serif text-[0.9375rem] italic tracking-[0.18em] text-cream">
          {{ settings?.studioName ?? 'Helena de Carvalho' }}
        </span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-8 lg:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.key"
          :to="localePath(link.to)"
          class="font-sans text-[0.6875rem] tracking-[0.18em] text-cream/70 uppercase transition-colors duration-200 hover:text-cream"
          active-class="text-cream!"
        >
          {{ link.label }}
        </NuxtLink>
        <a
          :href="bookHref"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-sm bg-cream px-5 py-2.5 font-sans text-[0.625rem] tracking-[0.18em] text-forest uppercase transition-opacity duration-200 hover:opacity-90"
        >
          {{ nav?.nav?.bookOnline ?? 'Réserver' }}
        </a>
      </nav>

      <!-- Desktop locale switcher -->
      <div class="hidden items-center gap-3 lg:flex">
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          class="font-sans text-[0.625rem] tracking-[0.2em] uppercase transition-colors duration-200"
          :class="locale === loc.code ? 'text-cream' : 'text-cream/40 hover:text-cream/70'"
          @click="setLocale(loc.code as 'fr' | 'en')"
        >
          {{ loc.code }}
        </button>
      </div>

      <!-- Mobile: Book CTA + Hamburger -->
      <div class="flex items-center gap-3 lg:hidden">
        <a
          :href="bookHref"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-sm bg-cream px-4 py-2 font-sans text-[0.5625rem] tracking-[0.16em] text-forest uppercase transition-opacity hover:opacity-90"
          @click="isOpen = false"
        >
          {{ nav?.nav?.bookOnline ?? 'Réserver' }}
        </a>
        <button
          type="button"
          class="flex h-8 w-8 flex-col items-end justify-center gap-1.25 focus:outline-none"
          :aria-label="isOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
          :aria-expanded="isOpen"
          @click="isOpen = !isOpen"
        >
          <span
            class="block h-px bg-cream transition-all duration-500 origin-center"
            :style="isOpen
              ? { width: '20px', transform: 'translateY(5px) rotate(45deg)' }
              : { width: '20px', transform: 'none' }"
          />
          <span
            class="block h-px bg-cream transition-all duration-300"
            :style="isOpen
              ? { width: '0px', opacity: '0' }
              : { width: '12px', opacity: '1' }"
          />
          <span
            class="block h-px bg-cream transition-all duration-500 origin-center"
            :style="isOpen
              ? { width: '20px', transform: 'translateY(-10px) rotate(-45deg)' }
              : { width: '20px', transform: 'none' }"
          />
        </button>
      </div>
    </div>
  </header>

  <!-- Full-screen mobile overlay -->
  <Transition
    enter-from-class="opacity-0"
    enter-active-class="transition-opacity duration-500 ease-out"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 flex flex-col items-center justify-center bg-cream lg:hidden"
    >
      <div class="absolute top-20 left-5 right-5 h-px bg-charcoal/8 sm:left-8 sm:right-8" />

      <nav class="flex flex-col items-center gap-9 text-center">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.key"
          :to="localePath(link.to)"
          class="group relative font-serif text-4xl italic text-dark transition-colors duration-200 hover:text-sage sm:text-5xl"
          @click="isOpen = false"
        >
          {{ link.label }}
          <span class="absolute -bottom-1 left-0 h-px w-0 bg-sage transition-all duration-300 group-hover:w-full" />
        </NuxtLink>
      </nav>

      <!-- Mobile locale switcher -->
      <div class="mt-12 flex items-center overflow-hidden rounded-full border border-charcoal/15">
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          class="px-5 py-2 font-sans text-[0.6875rem] tracking-[0.18em] uppercase transition-all duration-200"
          :class="locale === loc.code
            ? 'bg-charcoal text-cream'
            : 'text-charcoal/40 hover:text-charcoal/70'"
          @click="setLocale(loc.code as 'fr' | 'en'); isOpen = false"
        >
          {{ loc.label }}
        </button>
      </div>

      <p class="absolute bottom-8 font-sans text-[0.625rem] tracking-[0.3em] text-olive uppercase">
        Paris · {{ nav?.footer?.byAppointment ?? 'Sur rendez-vous uniquement' }}
      </p>

      <div class="absolute bottom-20 left-5 right-5 h-px bg-charcoal/8 sm:left-8 sm:right-8" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { locale, setLocale, locales } = useI18n()
const localePath = useLocalePath()
const isOpen = ref(false)
const isScrolled = ref(false)
const { nav } = useNavContent()

const availableLocales = computed(() =>
  (locales.value as Array<{ code: string; name: string; label?: string }>).map(l => ({
    code: l.code,
    label: l.name ?? l.code.toUpperCase(),
  }))
)

// WhatsApp book link from content settings
const { settings } = useSettings()
const bookHref = computed(() => settings.value?.whatsappUrl ?? 'https://wa.me/33600000000')

const navLinks = computed(() => [
  { key: 'gallery', to: '/gallery', label: nav.value?.nav?.gallery ?? 'Galerie' },
  { key: 'about', to: '/about', label: nav.value?.nav?.about ?? 'À propos' },
  { key: 'process', to: '/process', label: nav.value?.nav?.process ?? 'Comment ça se passe' },
  { key: 'care', to: '/care', label: nav.value?.nav?.care ?? 'Soins' },
  { key: 'contact', to: '/contact', label: nav.value?.nav?.contact ?? 'Contact' },
])

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => { isOpen.value = false })

// Scroll-aware header opacity
onMounted(() => {
  const handler = () => { isScrolled.value = window.scrollY > 20 }
  window.addEventListener('scroll', handler, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handler))
})
</script>
