<template>
  <div class="text-center h-screen font-geosans">
    <!-- New Hero Section -->
    <div class="w-full fixed px-8">
      <nav class="lg:hidden relative z-50">
        <div class="flex py-2 justify-between items-center px-4">
          <div>
            <a
              href="https://flowbite.com/"
              class="flex items-center p-4 bg-black"
            >
              <img
                src="@/assets/images/logo.png"
                class="h-24"
                alt="Flowbite Logo"
                style="filter: brightness(0) invert(1)"
              />
            </a>
          </div>
          <div class="visible flex items-center">
            <ul
              id="list"
              class="hidden p-2 border-r bg-white absolute rounded top-0 left-0 right-0 shadow mt-24"
            >
              <li
                class="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none"
              >
                <a href="./home.html">
                  <span class="ml-2 font-bold">Home</span>
                </a>
              </li>
              <li
                class="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center"
              >
                <span class="ml-2 font-bold">About Us</span>
              </li>
              <li
                class="flex cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none"
              >
                <span class="ml-2 font-bold">Pricing</span>
              </li>
              <li
                class="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center"
              >
                <span class="ml-2 font-bold">Resources</span>
              </li>
              <li
                class="flex flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal pt-2 pb-4 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center"
              >
                <span class="ml-2 font-bold">Sign In</span>
              </li>
            </ul>
            <div class="xl:hidden">
              <svg
                id="open"
                @click="MenuHandler(true)"
                aria-haspopup="true"
                aria-label="Main Menu"
                xmlns="http://www.w3.org/2000/svg"
                class="show-m-menu icon icon-tabler icon-tabler-menu"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <line x1="4" y1="8" x2="20" y2="8"></line>
                <line x1="4" y1="16" x2="20" y2="16"></line>
              </svg>
              <div
                id="close"
                class="hidden close-m-menu"
                @click="MenuHandler(false)"
              >
                <svg
                  aria-label="Close"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav class="f-f-l relative z-10">
        <div
          class="relative z-10 mx-auto hidden w-full px-4 xl:px-0 lg:flex justify-between items-center py-4"
        >
          <div>
            <a
              href="https://flowbite.com/"
              class="flex items-center p-4 bg-black rounded-lg"
            >
              <img
                src="@/assets/images/logo.png"
                class="h-24"
                alt="Flowbite Logo"
                style="filter: brightness(0) invert(1)"
              />
            </a>
          </div>
          <div class="flex items-center text-white text-lg font-bold">
            <button
              class="px-6 py-3 bg-black text-white text-lg font-bold flex items-center justify-center"
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

    <div class="pt-40 px-8">
      <masonry-wall
        :items="items"
        :column-width="250"
        :gap="30"
        min-columns="1"
      >
        <template #default="{ item }">
          <div class="mh-[400px]">
            <img
              class="h-auto max-w-full rounded-lg"
              v-lazy="item.img"
              alt=""
            />
          </div>
        </template>
      </masonry-wall>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeMount } from "vue";
if (process.client) {
  onMounted(() => {
    console.log(window.innerWidth, window.innerHeight);
  });
}

const NUMBER_OF_PHOTOS = 15;

let items: any[] = [];

for (let i = 1; i <= NUMBER_OF_PHOTOS; i++) {
  items.push({
    img: new URL(`./assets/images/tattoos/${i}.jpg`, import.meta.url).href,
  });
}

const description = ref("HC Tattoo - Tag");
useHead({
  meta: [{ name: "description", content: description }],
});
</script>

<style>
body {
  background: #f2e8d6;
}

/* .masonry-item {
  border: 1px solid red;
  min-height: 300px;
} */
</style>
