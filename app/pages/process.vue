<template>
  <div :data-content-id="page?.id">
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>

<script setup lang="ts">
const { page } = useLocaleContent('processPage')
</script>
