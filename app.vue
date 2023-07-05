<template>
  <div class="text-center font-sans font-thin">
    <Menu />

    <div class="pt-32 lg:pt-30 px-8" id="home">
      <masonry-wall
        :items="items"
        :column-width="150"
        :gap="10"
        :min-columns="2"
        :max-columns="4"
      >
        <template #default="{ item }">
          <!-- <div
            v-if="item.type === CardType.Image"
            @click="openModal(item.img)"
            class="min-h-[300px]"
          >
            <nuxt-img
              fit="cover"
              preload
              class="h-auto max-w-full rounded-lg"
              :src="item.img"
              alt=""
              loading="lazy"
            />
          </div> -->

          <div
            v-if="item.type === CardType.Image"
            class=""
            @click="openModal(item.img)"
          >
            <img
              class="h-auto max-w-full rounded-lg"
              v-lazy="item.img"
              alt="Tattoo Photo"
            />
          </div>

          <div
            class="h-[150px] lg:h-[300px] max-w-full border border-black rounded-lg flex items-center justify-center text-xl lg:text-3xl font-sans font-thin"
            v-if="item.type === CardType.Text"
          >
            {{ item.text }}
          </div>
        </template>
      </masonry-wall>
    </div>

    <About />

    <Studio />

    <Testimonials />

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

for (let i = 1; i <= NUMBER_OF_PHOTOS; i++) {
  items = [
    ...items,
    {
      img: useAssets(`minified/${i}.jpg`),
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
        img: useAssets("/flashes/1.png"),
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
        img: useAssets("/flashes/2.png"),
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
  title: "Helena de Carvalho | Fineline Tattoo",
  htmlAttrs: {
    lang: "en",
  },
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
