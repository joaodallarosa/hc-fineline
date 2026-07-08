<template>
  <!--
    Practical-info block (address / hours / contact / map). Thin wrapper over
    SectionsPracticalInfo; the column labels come from the navigation collection.
  -->
  <SectionsPracticalInfo
    :address="address"
    :hours="hours"
    :whatsapp="whatsapp"
    :instagram="instagram"
    :map-embed="mapEmbed"
  />
</template>

<script setup lang="ts">
defineProps<{
  address?: string
  hours?: string
  whatsapp?: string
  instagram?: string
  mapEmbed?: string
}>()
</script>
