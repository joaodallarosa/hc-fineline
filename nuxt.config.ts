import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.png', type: 'image/png' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap',
        },
      ],
    },
  },

  modules: [
    '@nuxt/content',
    'nuxt-studio',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@dargmuesli/nuxt-cookie-control',
  ],

  // ─── i18n ───
  i18n: {
    locales: [
      { code: 'fr', name: 'Français', language: 'fr-FR' },
      { code: 'en', name: 'English', language: 'en-GB' },
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
  },

  // ─── Nuxt Studio ───
  studio: {
    dev: true,
  },

  // ─── Cookie consent ───
  cookieControl: {
    barPosition: 'bottom-full',
    closeModalOnClickOutside: true,
    colors: {
      barBackground: '#F5F0E8',
      barTextColor: '#1A1A1A',
      barButtonColor: '#1F3B2F',
      barButtonHoverColor: '#152A21',
      modalBackground: '#F5F0E8',
      modalTextColor: '#1A1A1A',
      modalButtonBackground: '#1F3B2F',
      modalButtonHoverColor: '#152A21',
      controlButtonBackground: '#1F3B2F',
      controlButtonHoverBackground: '#152A21',
      checkboxActiveBackground: '#1F3B2F',
      focusRingColor: '#4A7C59',
    },
    cookies: {
      necessary: [
        {
          id: 'necessary',
          name: { fr: 'Essentiels', en: 'Essential' },
          description: {
            fr: 'Cookies nécessaires au fonctionnement du site (langue, consentement).',
            en: 'Cookies necessary for the site to function (language, consent).',
          },
          targetCookieIds: ['i18n_redirected', 'ncc_c', 'ncc_e'],
        },
      ],
      optional: [
        {
          id: 'analytics',
          name: { fr: 'Analytiques', en: 'Analytics' },
          description: {
            fr: 'Ces cookies nous aident à comprendre comment les visiteurs utilisent le site.',
            en: 'These cookies help us understand how visitors use the site.',
          },
          targetCookieIds: ['_ga', '_gid'],
        },
      ],
    },
    locales: ['fr', 'en'],
  },

  // ─── Rendering ───
  routeRules: {
    '/**': { prerender: true },
    '/_studio/**': { prerender: false },
    '/api/**': { prerender: false },
  },

  nitro: {
    preset: process.env.VERCEL ? 'vercel' : undefined,
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      failOnError: false,
    },
  },
  compatibilityDate: "2025-04-13",
});
