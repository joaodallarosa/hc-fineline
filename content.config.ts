import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// ─── Shared sub-schemas ───
// Page bodies are now authored as ::content-* component blocks (see
// app/components/content/*). Page frontmatter therefore only carries the page
// identity (`pageKey`) + SEO meta; the per-section data lives in each block's
// props (typed by that component's defineProps), not here.
const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().editor({ input: 'media' }).optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().editor({ input: 'media' }).optional(),
  robots: z.string().optional(),
})

export default defineContentConfig({
  collections: {

    // ─── Homepage ───
    homepage: defineCollection({
      type: 'page',
      source: '{index,en/index}.md',
      schema: z.object({
        // Identity stamp — see the page-clobber guard in nuxt.config.ts.
        pageKey: z.literal('home'),
        seo: seoSchema.optional(),
      }),
    }),

    // ─── Gallery page ───
    galleryPage: defineCollection({
      type: 'page',
      source: '{gallery,en/gallery}.md',
      schema: z.object({
        pageKey: z.literal('gallery'),
        seo: seoSchema.optional(),
      }),
    }),

    // ─── About page ───
    aboutPage: defineCollection({
      type: 'page',
      source: '{about,en/about}.md',
      schema: z.object({
        pageKey: z.literal('about'),
        seo: seoSchema.optional(),
      }),
    }),

    // ─── Process / FAQ page ───
    processPage: defineCollection({
      type: 'page',
      source: '{process,en/process}.md',
      schema: z.object({
        pageKey: z.literal('process'),
        seo: seoSchema.optional(),
      }),
    }),

    // ─── Care page ───
    carePage: defineCollection({
      type: 'page',
      source: '{care,en/care}.md',
      schema: z.object({
        pageKey: z.literal('care'),
        seo: seoSchema.optional(),
      }),
    }),

    // ─── Contact page ───
    contactPage: defineCollection({
      type: 'page',
      source: '{contact,en/contact}.md',
      schema: z.object({
        pageKey: z.literal('contact'),
        seo: seoSchema.optional(),
      }),
    }),

    // ─── Book Online page ───
    bookOnlinePage: defineCollection({
      type: 'page',
      source: '{book-online,en/book-online}.md',
      schema: z.object({
        pageKey: z.literal('book-online'),
        seo: seoSchema.optional(),
      }),
    }),

    // ─── Legal pages ───
    legal: defineCollection({
      type: 'page',
      source: '{cookie-policy,privacy-policy,terms-and-conditions,en/cookie-policy,en/privacy-policy,en/terms-and-conditions}.md',
      schema: z.object({
        pageKey: z.enum(['cookie-policy', 'privacy-policy', 'terms-and-conditions']),
        seo: seoSchema.optional(),
        title: z.string().optional(),
        lastUpdated: z.string().optional(),
      }),
    }),

    // ─── Navigation / UI strings ───
    navigation: defineCollection({
      type: 'page',
      source: '{navigation,en/navigation}.md',
      schema: z.object({
        nav: z.object({
          gallery: z.string().optional(),
          about: z.string().optional(),
          process: z.string().optional(),
          care: z.string().optional(),
          contact: z.string().optional(),
          bookOnline: z.string().optional(),
        }).optional(),
        footer: z.object({
          byAppointment: z.string().optional(),
          rights: z.string().optional(),
          terms: z.string().optional(),
          privacy: z.string().optional(),
          cookies: z.string().optional(),
        }).optional(),
        practicalInfo: z.object({
          addressLabel: z.string().optional(),
          hoursLabel: z.string().optional(),
          contactLabel: z.string().optional(),
        }).optional(),
        care: z.object({
          avoidLabel: z.string().optional(),
          normalLabel: z.string().optional(),
          whenToContactLabel: z.string().optional(),
        }).optional(),
      }),
    }),

    // ─── Global site settings ───
    siteSettings: defineCollection({
      type: 'page',
      source: '{settings,en/settings}.md',
      schema: z.object({
        studioName: z.string().optional(),
        studioAddress: z.string().optional(),
        studioHours: z.string().optional(),
        whatsappUrl: z.string().optional(),
        instagramUrl: z.string().optional(),
        mapEmbed: z.string().optional(),
      }),
    }),

    // ─── Tattoo images data ───
    tattoos: defineCollection({
      type: 'data',
      source: 'tattoos.json',
      schema: z.array(z.object({
        order: z.number(),
        src: z.string().editor({ input: 'media' }),
      })),
    }),

    // ─── Testimonial images data ───
    testimonials: defineCollection({
      type: 'data',
      source: 'testimonials.json',
      schema: z.object({
        body: z.array(z.string().editor({ input: 'media' })),
      }),
    }),
  },
})
