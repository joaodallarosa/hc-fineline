<template>
  <div class="space-y-0 divide-y divide-charcoal/8">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="group"
    >
      <button
        type="button"
        class="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none"
        :aria-expanded="openIndex === i"
        @click="toggle(i)"
      >
        <span class="font-serif text-base italic text-dark group-hover:text-sage transition-colors sm:text-lg">
          {{ item.question }}
        </span>
        <span
          class="flex-none text-sage text-lg leading-none transition-transform duration-300"
          :class="openIndex === i ? 'rotate-45' : 'rotate-0'"
          aria-hidden="true"
        >+</span>
      </button>
      <div v-show="openIndex === i" class="pb-5">
        <p class="font-sans text-[0.8125rem] leading-relaxed text-charcoal/65">
          {{ item.answer }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: Array<{ question: string; answer: string }>
}>()

const openIndex = ref<number | null>(0)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>
