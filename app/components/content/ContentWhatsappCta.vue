<template>
  <!--
    Centred WhatsApp booking button. `whatsapp` is the wa.me base link; an optional
    `message` is appended as the prefilled text. `size`/`width`/`spacing` cover the
    two existing placements (the tighter /contact button and the larger /book-online
    button).
  -->
  <section class="px-5 sm:px-8" :class="spacing === 'compact' ? 'pb-20' : 'py-16 sm:py-20'">
    <div class="mx-auto text-center" :class="width === '7xl' ? 'max-w-7xl' : 'max-w-3xl'">
      <a
        v-if="href"
        :href="href"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center gap-3 rounded-sm border border-sage/80 bg-sage font-sans tracking-[0.18em] text-cream uppercase transition-all hover:bg-sage/90"
        :class="size === 'sm' ? 'px-8 py-4 text-[0.6875rem]' : 'px-10 py-5 text-[0.75rem]'"
      >
        <svg
          :width="size === 'sm' ? 16 : 18"
          :height="size === 'sm' ? 16 : 18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 14.9a19.79 19.79 0 01-3.03-8.55A2 2 0 012.66 4.17h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 11.1a16 16 0 006 6l1-1.02a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
        {{ label ?? 'Réserver via WhatsApp' }}
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  whatsapp?: string
  message?: string
  label?: string
  size?: 'sm' | 'lg'
  width?: '3xl' | '7xl'
  spacing?: 'normal' | 'compact'
}>(), {
  size: 'lg',
  width: '3xl',
  spacing: 'normal',
})

const href = computed(() => {
  const base = props.whatsapp
  if (!base) return ''
  return props.message ? `${base}?text=${encodeURIComponent(props.message)}` : base
})
</script>
