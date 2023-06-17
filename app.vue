<template>
  <div class="text-center h-screen font-geosans">
    <!-- New Hero Section -->
    <div class="w-full fixed px-8">
      <nav class="relative z-10">
        <div
          class="relative z-10 mx-auto w-full xl:px-0 flex justify-between items-center py-4"
        >
          <div>
            <a
              href="https://www.instagram.com/carvalho_helena/"
              class="flex items-center p-4 bg-black rounded-lg"
            >
              <img
                src="@/assets/images/logo.png"
                class="h-16 lg:h-24"
                alt="Flowbite Logo"
                style="filter: brightness(0) invert(1)"
              />
            </a>
          </div>
          <div class="flex items-center text-white text-lg font-bold">
            <a
              class="text-black flex flex-col lg:flex-row justify-center items-center lg:mr-10"
              href="https://www.instagram.com/carvalho_helena/"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
              <span class="mt-2 lg:mt-0 lg:ml-1 text-base lg:text-xl font-sans font-thin"
                >@carvalho_helena</span
              >
            </a>

            <button
              class="px-6 py-3 bg-black text-white text-lg font-bold items-center justify-center fixed lg:static top-[80vh] flex right-8"
            >
              Make an Appointment
              <svg
                class="ml-4"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M9.129 5.24952L5.106 1.22652L6.1665 0.166016L12 5.99952L6.1665 11.833L5.106 10.7725L9.129 6.74952H0V5.24952H9.129Z"
                  fill="white"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>

    <div class="pt-32 lg:pt-40 px-8">
      <masonry-wall
        :items="items"
        :column-width="150"
        :gap="10"
        :min-columns="2"
        :max-columns="4"
      >
        <template #default="{ item }">
          <div v-if="item.type === CardType.Image">
            <img
              class="h-auto max-w-full rounded-lg"
              v-lazy="item.img"
              alt=""
            />
          </div>

          <div
            class="h-[150px] lg:h-[300px] max-w-full border border-black rounded-lg flex items-center justify-center text-xl lg:text-3xl"
            v-if="item.type === CardType.Text"
          >
            {{ item.text }}
          </div>
        </template>
      </masonry-wall>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
if (process.client) {
  onMounted(() => {
    console.log(window.innerWidth, window.innerHeight);
  });
}
const NUMBER_OF_PHOTOS = 15;

enum CardType {
  Text,
  Image,
}

let items: any[] = [];

for (let i = 1; i <= NUMBER_OF_PHOTOS; i++) {
  items = [
    ...items,
    {
      img: new URL(`./assets/images/tattoos/${i}.jpg`, import.meta.url).href,
      type: CardType.Image,
    },
  ];

  if (i === 2) {
    items = [
      ...items,
      {
        text: "tattoo artist",
        type: CardType.Text,
      },
    ];
  }

  if (i === 3) {
    items = [
      ...items,
      {
        text: "brazillian",
        type: CardType.Text,
      },
    ];
    items = [
      ...items,
      {
        img: new URL(`./assets/images/flashes/1.png`, import.meta.url).href,
        type: CardType.Image,
      },
    ];
  }

  if (i === 3) {
    items = [
      ...items,
      {
        text: "fineline",
        type: CardType.Text,
      },
    ];
  }

  if (i === 11) {
    items = [
      ...items,
      {
        img: new URL(`./assets/images/flashes/2.png`, import.meta.url).href,
        type: CardType.Image,
      },
    ];
  }
}

const description = ref("HC Tattoo - Tag");
useHead({
  meta: [{ name: "description", content: description }],
});
</script>

<style>
body {
  background: #f2e8d6;
  font-family: Geosans;
}

.masonry-item {
  min-height: 100px;
}
</style>
