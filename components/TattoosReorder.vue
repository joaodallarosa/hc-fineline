<template>
  <div class="pt-32 lg:pt-30 px-8" id="home">
    <button @click="saveToJson">Export to JSON</button>
    <draggable
      v-model="images"
      item-key="id"
      tag="transition-group"
      :component-data="{
        tag: 'ul',
        name: !drag ? 'flip-list' : null,
        type: 'transition',
        class: `grid grid-cols-6 gap-4`,
      }"
      group="items"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element }">
        <li class="list-group-item">
          <div class="bg-white rounded shadow-md">
            <img
              class="w-full h-[400px] object-cover mb-2"
              v-lazy="element.src"
              alt="Tattoo Photo"
            />
          </div>
        </li>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { filename } from "pathe/utils";
import draggable from "vuedraggable";

const glob = import.meta.glob("~/assets/img/minified/*.jpg", { eager: true });
let images = ref(
  Object.entries(glob).map(([value, module], index) => {
    return {
      order: index,
      src: `/_nuxt/${value}`,
    };
  })
);

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost",
  };
});

let show = ref(false);
let modalImage = new URL(`./assets/images/tattoos/1.jpg`, import.meta.url).href;

function openModal(src: string) {
  modalImage = src;
  show.value = true;
}

function closeModal() {
  show.value = false;
}

function saveToJson() {
  console.log("BEFORE:", images.value);
  console.log("EXPORTED:", JSON.stringify(images.value));
}
</script>

<style>
body {
  background: #f2e8d6;
  font-family: Geosans;
}

.masonry-item {
  min-height: 100px;
}

.confirm-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.confirm-modal-content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
}
.confirm-modal-content > * + * {
  margin: 0.5rem 0;
}
.confirm-modal-content h1 {
  font-size: 1.375rem;
}
.confirm-modal-content button {
  margin: 0.25rem 0 0 auto;
  padding: 0 8px;
  border: 1px solid;
  border-radius: 0.5rem;
}
.dark .confirm-modal-content {
  background: #000;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: red;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>