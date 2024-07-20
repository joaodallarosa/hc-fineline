<template>
  <div class="text-center font-sans font-thin">
    <NuxtPage />
    <CookieControl :locale="$i18n.locale">
      <template #modal>
        <h2 class="font-bold">{{ $t("consent-title") }}</h2>
        <p>{{ $t("consent-description") }}</p>
      </template>
    </CookieControl>
  </div>
</template>

<script setup lang="js">
import { onMounted } from "vue";

const onConsentGranted = () => {
  const updateObj =  {
    ...(cookiesEnabledIds.value?.includes("analytics") && {
      analytics_storage: 'granted'
    }),
    ...(cookiesEnabledIds.value?.includes("marketing") && {
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      ad_storage: 'granted',
    })
  }
  gtag('consent', 'update', updateObj);
  if (cookiesEnabledIds.value?.includes("analytics")) fbq('consent', 'grant')
}

const onConsentDenied = () => {
  const updateObj =  {
    ...(!cookiesEnabledIds.value?.includes("analytics") && {
      analytics_storage: 'denied'
    }),
    ...(!cookiesEnabledIds.value?.includes("marketings") && {
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      ad_storage: 'denied',
    })
  }
  gtag('consent', 'update', updateObj);
  if (cookiesEnabledIds.value?.includes("analytics")) fbq('consent', 'revoke')
}

const {
  cookiesEnabled,
  cookiesEnabledIds,
  isConsentGiven,
  isModalActive,
  moduleOptions,
} = useCookieControl();

onMounted(() => {
  if (cookiesEnabledIds.value?.length){
    onConsentGranted()
  } 
})

watch(
  () => cookiesEnabledIds.value,
  (current, previous) => {
    if (
      !previous?.includes("analytics") &&
      current?.includes("analytics")
    ) {
      onConsentGranted()
    } 
    if (
      previous?.includes("analytics") &&
      !current?.includes("analytics")
      ) {
      onConsentDenied()
    }
    if (
      !previous?.includes("marketing") &&
      current?.includes("marketing")
    ) {
      onConsentGranted()
    } 
    if (
      previous?.includes("marketing") &&
      !current?.includes("marketing")
      ) {
      onConsentDenied()
    }
  },
  { deep: true }
);

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
      innerHTML: `window.dataLayer = window.dataLayer || [];
                  function gtag() { dataLayer.push(arguments); }
                  gtag('consent', 'default', {
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied',
                    'ad_storage': 'denied',
                    'analytics_storage': 'denied',
                    'wait_for_update': 500,
                  });
                  gtag('js', new Date());
                  gtag('config', 'AW-11226818775');`,
    },
    {
      async: true,
      src: "https://www.googletagmanager.com/gtag/js?id=AW-11226818775",
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
  fbq('consent', 'revoke');
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

.cookieControl__ModalContent {
  overflow: hidden;
}

.cookieControl__ModalContent h2 {
  margin: 0;
}

.cookieControl__ModalButtons {
  justify-content: space-between;
}

.cookieControl__ModalButtons > button:nth-child(1) {
  background: transparent;
  color: black;
  text-decoration: underline;
}

@media screen and (max-width: 768px) {
  .cookieControl__ModalContent {
    max-height: fit-content;
    top: auto;
  }
}
</style>
