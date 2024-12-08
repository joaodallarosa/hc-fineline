<script setup>
const NUMBER_OF_PHOTOS = 19;
let items = [];

for (let i = 1; i <= NUMBER_OF_PHOTOS; i++) {
  items = [
    ...items,
    {
      img: useAssets(`testimonial_${i}.jpg`),
    },
  ];
}
</script>

<template>
  <div class="my-10" id="testimonials">
    <h2 class="text-center text-2xl md:text-5xl uppercase">
      {{ $t("testimonials-title") }}
    </h2>
    <div class="pt-5 lg:pt-10 px-8" id="home">
      <masonry-wall
        :items="items"
        :column-width="150"
        :gap="10"
        :min-columns="2"
        :max-columns="3"
      >
        <template #default="{ item }">
          <div>
            <img
              class="h-auto max-w-full rounded-lg"
              v-lazy="item.img"
              alt="Tattoo Photo"
            />
          </div>
        </template>
      </masonry-wall>
    </div>
  </div>
</template>