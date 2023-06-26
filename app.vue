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
          <!-- <NuxtLink :to="switchLocalePath('en')">English</NuxtLink> -->
          <!-- <NuxtLink :to="switchLocalePath('fr')">Français</NuxtLink> -->
          <!-- {{ $t('chat') }} -->

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
              <span
                class="mt-2 lg:mt-0 lg:ml-1 text-base lg:text-xl font-sans font-thin"
                >@carvalho_helena</span
              >
            </a>

            <a
              target="_blank"
              href="https://wa.me/message/OXUF5MYCLX3QH1"
              class="px-4 py-2 bg-black text-white text-lg font-bold items-center justify-center fixed lg:static top-[80vh] flex right-8"
            >
              <svg
                class="mr-2"
                fill="#fff"
                height="16px"
                width="16px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 308 308"
                xml:space="preserve"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <g id="XMLID_468_">
                    <path
                      id="XMLID_469_"
                      d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"
                    ></path>
                    <path
                      id="XMLID_470_"
                      d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"
                    ></path>
                  </g>
                </g>
              </svg>
              Book your Tattoo
            </a>
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
          <div
            v-if="item.type === CardType.Image"
            @click="openModal(item.img)"
            class="min-h-[300px]"
          >
            <nuxt-img
              fit="cover"
              preload
              class="h-auto max-w-full rounded-lg"
              :src="item.img"
              loading="lazy"
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
  <img
    height="1"
    width="1"
    style="display: none"
    src="https://www.facebook.com/tr?id=1306111036657039&ev=PageView&noscript=1"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { VueFinalModal } from "vue-final-modal";

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
let show = ref(false);
let modalImage = new URL(`./assets/images/tattoos/1.jpg`, import.meta.url).href;

// const switchLocalePath = useSwitchLocalePath();

for (let i = 1; i <= NUMBER_OF_PHOTOS; i++) {
  items = [
    ...items,
    {
      img: new URL(`./assets/images/minified/${i}.jpg`, import.meta.url).href,
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

useHead({
  meta: [
    {
      name: "description",
      content:
        "Brazillian Tattoo Artist based in Paris. Focused on fineline, delicate tattoos.",
    },
  ],
  title: "HC Fineline Tattoo",
  script: [
    {
      async: true,
      src: "https://www.googletagmanager.com/gtag/js?id=AW-11226818775",
    },
    {
      innerHTML: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-11226818775');`,
    },
    {
      innerHTML: `!function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1306111036657039');
  fbq('track', 'PageView');`,
    },
  ],
  link: [
    {
      rel: "icon",
      href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧡</text></svg>",
    },
  ],
});

function openModal(img: string) {
  modalImage = img;
  show.value = true;
}

function closeModal() {
  show.value = false;
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
</style>
