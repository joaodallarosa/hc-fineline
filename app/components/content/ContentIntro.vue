<template>
  <!--
    Simple page-header block: an italic serif heading + optional intro paragraph.
    Used as the lead-in on /gallery, /contact and /book-online. The body is the
    default slot. `align`, `width`, `spacing` and `bodyTone` tune the few visual
    variants those pages use.
  -->
  <section class="px-5 sm:px-8" :class="spacing === 'normal' ? 'py-16 sm:py-24' : 'py-20 sm:py-28'">
    <div class="mx-auto" :class="[widthClass, align === 'center' ? 'text-center' : '']">
      <component
        :is="headingTag"
        v-if="$slots.title || title"
        class="font-serif italic text-dark [&>p]:m-0"
        :class="headingClass"
      >
        <slot name="title">{{ title }}</slot>
      </component>
      <div
        v-if="$slots.default"
        class="font-sans text-[0.875rem] leading-relaxed [&>p]:mb-4 [&>p:last-child]:mb-0"
        :class="[bodyTone === '60' ? 'text-charcoal/60' : 'text-charcoal/65', align === 'center' ? '' : 'max-w-xl']"
      >
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  align?: 'left' | 'center'
  width?: '3xl' | '7xl'
  bodyTone?: '60' | '65'
  spacing?: 'normal' | 'large'
  heading?: '1' | '2'
}>(), {
  align: 'left',
  width: '3xl',
  bodyTone: '65',
  spacing: 'large',
  heading: '1',
})

const widthClass = computed(() => (props.width === '7xl' ? 'max-w-7xl' : 'max-w-3xl'))
const headingTag = computed(() => (String(props.heading) === '2' ? 'h2' : 'h1'))
// h1 = page-lead size; h2 = smaller secondary heading (e.g. an intro after a hero).
const headingClass = computed(() =>
  String(props.heading) === '2'
    ? 'mb-5 text-3xl sm:text-4xl'
    : 'mb-4 text-4xl sm:text-5xl',
)
</script>
