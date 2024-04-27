<template>
  <div class="pt-32 lg:pt-30 px-8" id="home">
    <masonry-wall
      :items="images"
      :column-width="150"
      :gap="10"
      :min-columns="2"
      :max-columns="4"
    >
      <template #default="{ item }">
        <div
          class="min-h-[700px] bg-cyan-500 rounded-lg"
          @click="openModal(item.src)"
        >
          <img
            class="h-auto max-w-full rounded-lg"
            v-lazy="item.src"
            alt="Tattoo Photo"
          />
        </div>
      </template>
    </masonry-wall>
    <VueFinalModal
      v-model="show"
      class="confirm-modal"
      content-class="bg-amber-50 rounded-lg"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade"
    >
      <div @click="closeModal">
        <img
          class="h-auto max-h-[90vh] max-w-full rounded-lg"
          v-lazy="modalImage"
          alt=""
        />
      </div>
      <slot />
    </VueFinalModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VueFinalModal } from "vue-final-modal";

let show = ref(false);
let modalImage = new URL(`./assets/images/tattoos/1.jpg`, import.meta.url).href;

const teste = await queryContent("/tattoo-grid").findOne();
const images = teste.body;

function openModal(src: string) {
  modalImage = src;
  show.value = true;
}

function closeModal() {
  show.value = false;
}
</script>

