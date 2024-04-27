<template>
  <div class="text-center font-sans font-thin">
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
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
