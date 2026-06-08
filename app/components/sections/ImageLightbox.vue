<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-150 ease-in pointer-events-none"
      leave-to-class="opacity-0"
    >
      <div
        v-if="src"
        class="fixed inset-0 z-60 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Image agrandie"
        @click.self="emit('close')"
      >
        <!-- Close button -->
        <button
          type="button"
          class="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50"
          :aria-label="locale === 'fr' ? 'Fermer' : 'Close'"
          autofocus
          @click="emit('close')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <!-- Image -->
        <img
          :src="src"
          :alt="alt || ''"
          class="max-h-[90svh] max-w-[90vw] rounded-sm object-contain shadow-2xl"
          @click.stop
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  src: string | null
  alt?: string
}>()

const emit = defineEmits<{ close: [] }>()
const { locale } = useI18n()

watch(
  () => props.src,
  (val) => {
    if (import.meta.client) {
      document.body.style.overflow = val ? 'hidden' : ''
    }
  },
)

onUnmounted(() => {
  if (import.meta.client) document.body.style.overflow = ''
})

onMounted(() => {
  if (!import.meta.client) return
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.src) emit('close')
  }
  window.addEventListener('keydown', handler)
  onUnmounted(() => window.removeEventListener('keydown', handler))
})
</script>
