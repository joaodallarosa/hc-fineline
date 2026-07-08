<template>
  <!--
    Two-column grid of call-to-action cards. The cards are child <ContentCtaCard>
    components written inline, so each card's description is plain markdown.
  -->
  <section class="px-5 py-20 sm:px-8 sm:py-24">
    <div class="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
      <slot />
    </div>
  </section>
</template>
