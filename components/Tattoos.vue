<template>
  <div
    class="tattoos pt-[200px] md:pt-[150px] lg:pt-32 px-8 relative"
    id="home"
  >
    <masonry-wall
      :items="displayedImages"
      :column-width="250"
      :ssr-columns="gridColumns"
      :gap="20"
      :min-columns="1"
      :max-columns="2"
    >
      <template #default="{ item, index }">
        <div
          class="bg-[#f2dad6] rounded-lg relative flex items-center justify-center"
          :style="{ 'padding-top': '76%' }"
          @click="openModal(item.src)"
        >
          <img
            v-if="index <= 3"
            class="absolute inset-0 w-full h-full object-cover rounded-lg"
            :src="item.src"
            alt="Tattoo Photo"
          />
          <img
            v-else
            class="absolute inset-0 w-full h-full object-cover rounded-lg"
            v-lazy="{ src: item.src }"
            alt="Tattoo Photo"
          />
        </div>
      </template>
    </masonry-wall>
    <div v-if="!loadedMore" class="flex items-center justify-center w-full">
      <button
        class="px-8 py-2 mt-8 bg-transparent text-black text-lg font-sans border border-black font-normal"
        @click="loadMoreTattoos"
      >
        {{ $t("tattoos-load-more") }}
      </button>
    </div>

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
import { ref, onMounted, onBeforeMount, reactive } from "vue";
import { VueFinalModal } from "vue-final-modal";

const { isMobile, isDesktop, isTablet } = useDevice();

let gridColumns = 1;
if (!isMobile) {
  gridColumns = 2;
}

let loadedTattoos = ref(false);
let show = ref(false);
let loadedMore = ref(false);
let modalImage = new URL(`./assets/images/tattoos/1.jpg`, import.meta.url).href;

const teste = await queryContent("/tattoo-grid").findOne();
const images = teste.body.map((item) => {
  return { src: useAssets(item.src) };
});
let displayedImages = ref(images.slice(0, 6));

function openModal(src: string) {
  modalImage = src;
  show.value = true;
}

function closeModal() {
  show.value = false;
}

function loadMoreTattoos() {
  displayedImages.value = images;
  loadedMore = true;
}
</script>

<style>
.tattoos {
  z-index: 0;
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
</style>
