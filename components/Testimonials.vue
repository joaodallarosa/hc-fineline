<script setup>
const { data: images } = await useFetch("/api/testimonials-images");
console.log('fetched data:', images.value)
</script>

<template>
  <div class="my-10" id="testimonials">
    <h2 class="text-center text-2xl md:text-5xl uppercase">
      {{ $t("testimonials-title") }}
    </h2>
    <div class="pt-5 lg:pt-10 px-8" id="home">
      <masonry-wall
        :items="images"
        :column-width="150"
        :gap="10"
        :min-columns="2"
        :max-columns="3"
      >
        <template #default="{ item: image }">
          <div>
            <NuxtImg
              class="h-auto max-w-full rounded-lg"
              :src="image"
              alt="Tattoo Photo"
              loading="lazy"
            />
          </div>
        </template>
      </masonry-wall>
    </div>
  </div>
</template>
