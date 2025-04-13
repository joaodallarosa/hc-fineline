import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/robots",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxt/content",
    "@nuxtjs/device",
    [
      "@dargmuesli/nuxt-cookie-control",
      {
        locales: ["en", "fr"],
        isAcceptNecessaryButtonEnabled: true,
        isModalForced: true,
        isControlButtonEnabled: true,
        isDashInDescriptionEnabled: true,
        cookies: {
          necessary: [],
          optional: [
            {
              description: {
                en: "Used for website analytics, don't identify you personally.",
                fr: "Nous aident à améliorer notre site web en collectant des données anonymes sur la façon dont vous l'utilisez.",
              },
              id: "analytics",
              isPreselected: false,
              name: {
                en: "Statistical Cookies",
                fr: "Cookies Statistiques",
              },
              targetCookieIds: ["analytics_storage"],
            },
            {
              description: {
                en: "Help us personalize your ad experience.",
                fr: "Vous permettent de voir des publicités ciblées en fonction de vos habitudes de navigation.",
              },
              id: "marketing",
              isPreselected: false,
              name: {
                en: "Marketing Cookies",
                fr: "Cookies Marketing",
              },
              targetCookieIds: [
                "ad_storage",
                "ad_user_data",
                "ad_personalization",
              ],
            },
          ],
        },
        colors: {
          checkboxInactiveBackground: "#a4a4a4",
        },
        localeTexts: {
          en: {
            cookiesOptional: "",
          },
          fr: {
            cookiesOptional: "",
          },
        },
      },
    ],
  ],

  i18n: {
    strategy: "prefix_except_default",
    vueI18n: "./i18n.config.ts",
  },

  ssr: false,

  nitro: {
    preset: "vercel",
  },

  css: ["@/assets/css/tailwind.css", "vue-final-modal/style.css"],
  compatibilityDate: "2025-04-13",
});