<script setup>
const { body: images } = await queryCollection("testimonials").first();
</script>

<template>
  <div class="my-4" id="testimonials">
    <h2 class="text-center text-2xl md:text-5xl uppercase">
      {{ $t("testimonials-title") }}
    </h2>
    <div class="pt-5 lg:pt-10 px-4" id="home">
      <masonry-wall
        :items="images"
        :column-width="150"
        :gap="4"
        :min-columns="2"
        :max-columns="3"
      >
        <template #default="{ item: image }">
          <div>
            <NuxtImg
              class="h-auto max-w-full"
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
