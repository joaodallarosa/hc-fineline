import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// ─── Shared sub-schemas ───
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

const heroSchema = z.object({
  eyebrow: z.string().optional(),
  titleLines: z.array(z.string()).optional(),
  titleEmphasis: z.string().optional(),
  subcopy: z.string().optional(),
  cornerText: z.string().optional(),
  ctas: z.array(z.object({
    label: z.string(),
    href: z.string(),
  })).optional(),
  media: z.object({
    type: z.enum(['image', 'video']).optional(),
    src: z.string().editor({ input: 'media' }).optional(),
    alt: z.string().optional(),
  }).optional(),
})

const pillarSchema = z.object({
  title: z.string(),
  body: z.string(),
  icon: z.string().optional(),
})

const imageSchema = z.object({
  src: z.string().editor({ input: 'media' }),
})

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
})

const practicalInfoSchema = z.object({
  address: z.string().optional(),
  hours: z.string().optional(),
  whatsapp: z.string().optional(),
  instagram: z.string().optional(),
  mapEmbed: z.string().optional(),
})

const careSchema = z.object({
  intro: z.string().editor({ input: 'textarea' }).optional(),
  steps: z.array(z.object({ title: z.string(), body: z.string().editor({ input: 'textarea' }) })).optional(),
  avoid: z.array(z.string()).optional(),
  normal: z.array(z.string()).optional(),
  whenToContact: z.string().editor({ input: 'textarea' }).optional(),
})

export default defineContentConfig({
  collections: {

    // ─── Homepage ───
    homepage: defineCollection({
      type: 'page',
      source: '{index,en/index}.md',
      schema: z.object({
        seo: seoSchema.optional(),
        hero: heroSchema.optional(),
        works: z.object({
          sectionLabel: z.string().optional(),
          sectionLabelAccent: z.string().optional(),
          title: z.string().optional(),
          ctaLabel: z.string().optional(),
        }).optional(),
        about: z.object({
          sectionLabel: z.string().optional(),
          sectionLabelAccent: z.string().optional(),
          title: z.string().optional(),
          body: z.string().editor({ input: 'textarea' }).optional(),
          ctaLabel: z.string().optional(),
          ctaHref: z.string().optional(),
          image: z.string().editor({ input: 'media' }).optional(),
        }).optional(),
        testimonials: z.object({
          sectionLabel: z.string().optional(),
          sectionLabelAccent: z.string().optional(),
          title: z.string().optional(),
          altText: z.string().optional(),
        }).optional(),
        secondaryCta: z.object({
          cards: z.array(z.object({
            title: z.string(),
            description: z.string(),
            href: z.string(),
            label: z.string(),
          })).optional(),
        }).optional(),
        practicalInfo: practicalInfoSchema.optional(),
        images: z.array(imageSchema).optional(),
        studioImages: z.array(imageSchema).optional(),
      }),
    }),

    // ─── Gallery page ───
    galleryPage: defineCollection({
      type: 'page',
      source: '{gallery,en/gallery}.md',
      schema: z.object({
        seo: seoSchema.optional(),
        hero: heroSchema.optional(),
        intro: z.object({
          title: z.string().optional(),
          body: z.string().editor({ input: 'textarea' }).optional(),
        }).optional(),
        images: z.array(imageSchema).optional(),
      }),
    }),

    // ─── About page ───
    aboutPage: defineCollection({
      type: 'page',
      source: '{about,en/about}.md',
      schema: z.object({
        seo: seoSchema.optional(),
        hero: heroSchema.optional(),
        bio: z.object({
          title: z.string().optional(),
          body: z.string().editor({ input: 'textarea' }).optional(),
          image: z.string().editor({ input: 'media' }).optional(),
        }).optional(),
        specialties: z.array(pillarSchema).optional(),
        studioImages: z.array(imageSchema).optional(),
      }),
    }),

    // ─── Process / FAQ page ───
    processPage: defineCollection({
      type: 'page',
      source: '{process,en/process}.md',
      schema: z.object({
        seo: seoSchema.optional(),
        hero: heroSchema.optional(),
        intro: z.object({
          title: z.string().optional(),
          body: z.string().editor({ input: 'textarea' }).optional(),
        }).optional(),
        faqTitle: z.string().optional(),
        steps: z.array(z.object({
          title: z.string(),
          body: z.string(),
        })).optional(),
        faq: z.array(faqSchema).optional(),
      }),
    }),

    // ─── Care page ───
    carePage: defineCollection({
      type: 'page',
      source: '{care,en/care}.md',
      schema: z.object({
        seo: seoSchema.optional(),
        hero: heroSchema.optional(),
        tattooCare: careSchema.optional(),
      }),
    }),

    // ─── Contact page ───
    contactPage: defineCollection({
      type: 'page',
      source: '{contact,en/contact}.md',
      schema: z.object({
        seo: seoSchema.optional(),
        intro: z.object({
          title: z.string().optional(),
          body: z.string().editor({ input: 'textarea' }).optional(),
        }).optional(),
        practicalInfo: practicalInfoSchema.optional(),
        ctaLabel: z.string().optional(),
      }),
    }),

    // ─── Book Online page ───
    bookOnlinePage: defineCollection({
      type: 'page',
      source: '{book-online,en/book-online}.md',
      schema: z.object({
        seo: seoSchema.optional(),
        title: z.string().optional(),
        subtitle: z.string().optional(),
        ctaLabel: z.string().optional(),
        steps: z.array(z.object({
          title: z.string(),
          body: z.string(),
        })).optional(),
        whatsapp: z.string().optional(),
        whatsappMessage: z.string().optional(),
        secondaryCta: z.object({
          cards: z.array(z.object({
            title: z.string(),
            description: z.string(),
            href: z.string(),
            label: z.string(),
          })).optional(),
        }).optional(),
      }),
    }),

    // ─── Legal pages ───
    legal: defineCollection({
      type: 'page',
      source: '{cookie-policy,privacy-policy,terms-and-conditions,en/cookie-policy,en/privacy-policy,en/terms-and-conditions}.md',
      schema: z.object({
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

