import tailwindcss from '@tailwindcss/vite'
import { normalizeStudioCompatibleBody } from './utils/studio-body-normalizer.js'
import { assertPageIdentity } from './utils/page-identity-guard.js'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  // Auto-import all components; mark app/components/content/* as GLOBAL so the
  // ::content-* MDC blocks resolve to <Content*> components inside markdown.
  components: [
    '~/components',
    { path: '~/components/content', global: true, pathPrefix: false },
  ],

  hooks: {
    'content:file:afterParse'(ctx) {
      if (ctx.file.extension !== '.md') return
      if (!ctx.content?.body) return

      // Nuxt Studio compares GitHub markdown with the deployed document tree.
      // Nuxt Content keeps a single paragraph wrapper in custom component slots,
      // while Studio auto-unwraps that same slot content before comparing.
      // This normalization is REQUIRED to keep that comparison aligned, and the
      // `check:studio-conflicts` step verifies it leaves every page matching its
      // raw GitHub markdown — so it can never silently start producing false
      // Studio "version differs" conflicts.
      ctx.content.body = normalizeStudioCompatibleBody(ctx.content.body)

      // Fail the build if a page file's content no longer matches the page its
      // location maps to (e.g. a Studio draft clobbered one page with another's
      // content). Strict in production/CI builds — the deploy fails and the last
      // good build stays live; only a warning in dev so editing is never bricked.
      assertPageIdentity(ctx, { strict: process.env.NODE_ENV === 'production' || !!process.env.CI })
    },
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
    dev: process.env.NODE_ENV !== 'production',
    // @ts-ignore - nuxt-studio requires repository info for production builds.
    // TODO: set these to hc-fineline's actual GitHub repository before deploying
    // Studio in production (dev editing works without it).
    repository: {
      provider: 'github',
      owner: 'TODO-github-owner',
      repo: 'hc-fineline',
      branch: 'main',
    },
    editor: {
      // Explicitly list content components so they appear in the slash (/) command
      // on all devices including iPad (no hover required to discover them).
      // Keep this in sync with the Content* components actually used across
      // content/*.md — `npm run check:content` warns if a used component is
      // missing here (editors then can't re-insert it from the "/" menu).
      components: {
        include: [
          // Page intro / hero
          'ContentHero',
          'ContentIntro',
          // Generic layout primitives
          'ContentSection',
          'ContentCard',
          'ContentStep',
          'ContentTextImage',
          'ContentDivider',
          // Calls to action
          'ContentCtaCards',
          'ContentCtaCard',
          'ContentWhatsappCta',
          // Galleries & testimonials
          'ContentGallerySection',
          'ContentTestimonials',
          // Practical info / contact
          'ContentPracticalInfo',
          // Care & FAQ
          'ContentCareSection',
          'ContentFaqSection',
        ],
      },
    },
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
});
