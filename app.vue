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
      type: "image/svg+xml",
      href: useAssets("/_nuxt/assets/img/favicon.svg"),
    },
    {
      rel: "icon",
      type: "image/png",
      href: useAssets("/_nuxt/assets/img/favicon.png"),
    },
  ],
});
</script>

<style>
body {
  background: #f2e8d6;
  font-family: Geosans;
}
</style>
