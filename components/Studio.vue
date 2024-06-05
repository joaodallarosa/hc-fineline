<template>  
  <section
     id="studio" class="container mx-auto flex flex-col items-center justify-center my-10 md:my-20 px-10"
  >
    <h2 class="text-center text-2xl md:text-5xl uppercase">
      {{ $t("studio-title") }}
    </h2>
    <p class="text-center mt-5 text-lg">
      <a
        href="https://goo.gl/maps/KqjacKx7tV7oE29s5"
        target="_blank"
        class="underline"
        >{{ $t("studio-address") }}</a
      >
    </p>
    <p class="text-center mt-5 text-lg">
      {{ $t("studio-description") }}
    </p>

    <div class="container flex flex-col justify-center p-4 mx-auto">
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2">
        <img
          class="object-cover w-full dark:bg-gray-500 aspect-square"
          :src="useAssets('studio/studio_1.jpg')"
        />
        <img
          class="object-cover w-full dark:bg-gray-500 aspect-square"
          :src="useAssets('studio/studio_2.jpg')"
        />
        <img
          class="object-cover w-full dark:bg-gray-500 aspect-square"
          :src="useAssets('studio/studio_3.jpg')"
        />
        <img
          class="object-cover w-full dark:bg-gray-500 aspect-square"
          :src="useAssets('studio/studio_4.jpg')"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// import { ref, computed } from "vue";
// import { filename } from "pathe/utils";
// import draggable from "vuedraggable";

// const glob = import.meta.glob("~/assets/img/studio/*.jpg", { eager: true });
// const imageFiles = Object.entries(glob).map(([value, module], index) => {
//   return {
//     src: useAssets(value),
//   };
// });
// console.log("Studio image files", imageFiles);
// const images = ref(imageFiles);
// const imagesConfig = await queryContent("/tattoo-grid").findOne();
// const images = ref([
//   ...imageFiles.filter(
//     (fileItem) =>
//       !imagesConfig.body.some((configItem) => configItem.src === fileItem.src)
//   ),
// ]);
</script>
