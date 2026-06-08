<template>
  <div class="space-y-12">
    <!-- Numbered care steps -->
    <div v-if="steps?.length" class="space-y-8">
      <div
        v-for="(step, i) in steps"
        :key="i"
        class="flex gap-5 sm:gap-8"
      >
        <div class="flex-none">
          <div class="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 font-sans text-[0.6875rem] font-medium text-sage">
            {{ String(i + 1).padStart(2, '0') }}
          </div>
        </div>
        <div class="flex-1 pt-1">
          <h3 class="mb-1 font-serif text-base italic text-dark sm:text-lg">{{ step.title }}</h3>
          <p class="font-sans text-[0.8125rem] leading-relaxed text-charcoal/60">{{ step.body }}</p>
        </div>
      </div>
    </div>

    <!-- Avoid list -->
    <div v-if="avoid?.length" class="rounded-sm border border-charcoal/8 p-6 sm:p-8">
      <h3 class="mb-4 font-serif text-base italic text-dark">{{ nav?.care?.avoidLabel ?? 'À éviter' }}</h3>
      <ul class="space-y-2">
        <li
          v-for="(item, i) in avoid"
          :key="i"
          class="flex items-start gap-3 font-sans text-[0.8125rem] leading-relaxed text-charcoal/60"
        >
          <span class="mt-1.5 flex-none h-1 w-1 rounded-full bg-sage/50" aria-hidden="true" />
          {{ item }}
        </li>
      </ul>
    </div>

    <!-- Normal reactions -->
    <div v-if="normal?.length">
      <h3 class="mb-4 font-serif text-base italic text-dark">{{ nav?.care?.normalLabel ?? 'C\'est normal' }}</h3>
      <ul class="space-y-2">
        <li
          v-for="(item, i) in normal"
          :key="i"
          class="flex items-start gap-3 font-sans text-[0.8125rem] leading-relaxed text-charcoal/60"
        >
          <span class="mt-1.5 flex-none h-1 w-1 rounded-full bg-sage/40" aria-hidden="true" />
          {{ item }}
        </li>
      </ul>
    </div>

    <!-- When to contact -->
    <div v-if="whenToContact?.length" class="rounded-sm bg-sage/5 p-6 sm:p-8">
      <h3 class="mb-4 font-serif text-base italic text-sage">{{ nav?.care?.whenToContactLabel ?? 'Quand nous contacter' }}</h3>
      <ul class="space-y-2">
        <li
          v-for="(item, i) in whenToContact"
          :key="i"
          class="flex items-start gap-3 font-sans text-[0.8125rem] leading-relaxed text-charcoal/60"
        >
          <span class="mt-1.5 flex-none h-1 w-1 rounded-full bg-sage" aria-hidden="true" />
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const { nav } = useNavContent()
defineProps<{
  steps?: Array<{ title: string; body: string }>
  avoid?: string[]
  normal?: string[]
  whenToContact?: string[]
}>()
</script>
