<template>
  <section class="px-5 py-20 sm:px-8 sm:py-24">
    <div class="mx-auto max-w-4xl grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Address -->
      <div v-if="address">
        <h3 class="mb-3 font-serif text-sm italic text-dark">{{ nav?.practicalInfo?.addressLabel ?? 'Adresse' }}</h3>
        <p class="font-sans text-[0.75rem] leading-relaxed text-charcoal/60 whitespace-pre-line">
          {{ address }}
        </p>
      </div>
      <!-- Hours -->
      <div v-if="hours">
        <h3 class="mb-3 font-serif text-sm italic text-dark">{{ nav?.practicalInfo?.hoursLabel ?? 'Horaires' }}</h3>
        <p class="font-sans text-[0.75rem] leading-relaxed text-charcoal/60 whitespace-pre-line">
          {{ hours }}
        </p>
      </div>
      <!-- Contact -->
      <div>
        <h3 class="mb-3 font-serif text-sm italic text-dark">{{ nav?.practicalInfo?.contactLabel ?? 'Contact' }}</h3>
        <div class="space-y-2">
          <a
            v-if="whatsapp"
            :href="whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 font-sans text-[0.75rem] text-charcoal/60 hover:text-sage transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 14.9a19.79 19.79 0 01-3.03-8.55A2 2 0 012.66 4.17h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 11.1a16 16 0 006 6l1-1.02a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            WhatsApp
          </a>
          <a
            v-if="instagram"
            :href="instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 font-sans text-[0.75rem] text-charcoal/60 hover:text-sage transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            Instagram
          </a>
        </div>
      </div>
      <!-- Map embed -->
      <div v-if="mapEmbed" class="sm:col-span-2 lg:col-span-1">
        <div class="aspect-square overflow-hidden rounded-sm bg-charcoal/6">
          <iframe
            :src="mapEmbed"
            class="h-full w-full border-0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            :title="(nav?.practicalInfo?.addressLabel ?? 'Adresse') + ' — Helena de Carvalho'"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { nav } = useNavContent()
defineProps<{
  address?: string
  hours?: string
  whatsapp?: string
  instagram?: string
  mapEmbed?: string
}>()
</script>
