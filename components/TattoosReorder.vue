<script setup lang="ts">
import { ref, computed } from "vue";
import { filename } from "pathe/utils";
import draggable from "vuedraggable";

const { data: imagesInFolder } = await useFetch("/api/tattoos");
const imageFiles = imagesInFolder.value.map((value, index) => {
  return {
    order: index,
    src: value,
  };
});
const { body: tattoos } = await queryCollection("tattoos").first();
const images = ref([
  ...tattoos,
  ...imageFiles.filter(
    (fileItem) => !tattoos.some((configItem) => configItem.src === fileItem.src)
  ),
]);
const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost",
  };
});
function saveToJson() {
  console.log("EXPORTED:", JSON.stringify(images.value));
}
function cleanJson() {
  images.value = images.value.filter((item) =>
    imageFiles.some((fileItem) => fileItem.src === item.src)
  );
  saveToJson();
}
</script>
<template>
  <div class="pt-32 lg:pt-30 px-8" id="home">
    <ClientOnly>
      <button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-4"
        @click="saveToJson"
      >
        Export to JSON
      </button>
      <button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-4"
        @click="cleanJson"
      >
        Clean JSON
      </button>
      <draggable
        v-model="images"
        tag="transition-group"
        :component-data="{
          tag: 'ul',
          name: 'flip-list',
          type: 'transition',
          class: `grid grid-cols-6 gap-4 mt-8`,
        }"
        group="items"
        v-bind="dragOptions"
      >
        <template #item="{ element, index }">
          <li class="list-group-item">
            <div class="bg-white rounded shadow-md">
              <NuxtImg
                class="w-full h-[200px] object-cover mb-2"
                :src="element.src"
                alt="Tattoo Photo"
              />
            </div>
          </li>
        </template>
      </draggable>
    </ClientOnly>
  </div>
</template>
