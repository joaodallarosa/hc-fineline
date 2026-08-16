<template>
  <!--
    Small titled card with a sage accent line (the "specialties / pillars" block).
    Body text is the default slot so editors type it inline under the block.
  -->
  <div>
    <div class="mb-3 h-px w-8 bg-sage" />
    <h3 v-if="$slots.title || title" class="mb-2 font-serif text-base italic text-dark [&>p]:m-0">
      <slot name="title">{{ title }}</slot>
    </h3>
    <div class="font-sans text-[0.75rem] leading-relaxed text-charcoal/55 [&>p]:m-0 [&>p]:mb-2 [&>p:last-child]:mb-0">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>
