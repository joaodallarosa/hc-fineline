<template>
  <!--
    Aftercare block: optional intro prose (default slot) followed by the structured
    care guide (numbered steps, "to avoid", "what's normal", "when to contact us").
    Wraps SectionsCareSteps, whose list labels come from the navigation collection.
  -->
  <section class="px-5 py-16 sm:px-8 sm:py-24">
    <div class="mx-auto max-w-3xl">
      <div
        v-if="$slots.default"
        class="mb-12 font-sans text-[0.875rem] leading-relaxed text-charcoal/65 [&>p]:mb-4 [&>p:last-child]:mb-0"
      >
        <slot />
      </div>
      <SectionsCareSteps
        :steps="steps"
        :avoid="avoid"
        :normal="normal"
        :when-to-contact="whenToContact ? [whenToContact] : undefined"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  steps?: Array<{ title: string; body: string }>
  avoid?: string[]
  normal?: string[]
  whenToContact?: string
}>()
</script>
