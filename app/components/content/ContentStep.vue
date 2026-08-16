<template>
  <!--
    Numbered step inside a ContentSection (columns="1"). The step body is the
    default slot. `badge`:
      • 'plain'  → bare number text (the /process timeline look)
      • 'circle' → number in a sage pill (the /book-online steps look)
  -->
  <div class="flex gap-6 sm:gap-10">
    <div class="flex-none pt-1">
      <div
        v-if="badge === 'circle'"
        class="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 font-sans text-[0.6875rem] font-medium text-sage"
      >{{ number }}</div>
      <span
        v-else
        class="font-sans text-[0.6875rem] tracking-[0.2em] text-sage/50"
      >{{ number }}</span>
    </div>
    <div class="flex-1">
      <h3 v-if="$slots.title || title" class="mb-2 font-serif text-xl italic text-dark sm:text-2xl [&>p]:m-0">
        <slot name="title">{{ title }}</slot>
      </h3>
      <div class="font-sans text-[0.8125rem] leading-relaxed text-charcoal/65 [&>p]:m-0 [&>p]:mb-2 [&>p:last-child]:mb-0">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  number?: string
  title?: string
  badge?: 'plain' | 'circle'
}>(), {
  badge: 'plain',
})
</script>
