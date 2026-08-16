# Architecture

## The rendering pipeline

```
route (app/pages/*.vue)
  → useLocaleContent('<collection>')        # locale → content path, queries the collection
  → <ContentRenderer :value="page" />        # renders the markdown body
  → ::content-* blocks                        # app/components/content/Content*.vue (global)
  → Sections* components                      # app/components/sections/* (presentational)
```

Every page route is a thin wrapper — it does not read individual fields. Example
([`app/pages/about.vue`](../app/pages/about.vue)):

```vue
<template>
  <div :data-content-id="page?.id">
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>
<script setup lang="ts">
const { page } = useLocaleContent('aboutPage')
</script>
```

## Route → collection → file map

| Route | Collection | French file | English file |
|---|---|---|---|
| `/` | homepage | `content/index.md` | `content/en/index.md` |
| `/gallery` | galleryPage | `content/gallery.md` | `content/en/gallery.md` |
| `/about` | aboutPage | `content/about.md` | `content/en/about.md` |
| `/process` | processPage | `content/process.md` | `content/en/process.md` |
| `/care` | carePage | `content/care.md` | `content/en/care.md` |
| `/contact` | contactPage | `content/contact.md` | `content/en/contact.md` |
| `/book-online` | bookOnlinePage | `content/book-online.md` | `content/en/book-online.md` |
| `/cookie-policy` … | legal | `content/cookie-policy.md` … | `content/en/cookie-policy.md` … |

Non-page data: `navigation` (UI labels), `siteSettings` (global info) — consumed by
`TheHeader`/`TheFooter` and composables; `tattoos.json` / `testimonials.json` — image lists
fetched by `ContentGallerySection`/`ContentTestimonials`.

## Directory map

```
app/
  pages/                  # thin route wrappers — useLocaleContent() + <ContentRenderer>
  components/
    content/              # Content* — GLOBAL, the ::content-* building blocks editors insert
    sections/             # presentational primitives composed by content/ components
    layout/               # TheHeader / TheFooter
  composables/            # useLocaleContent, useSeoPage, useSettings, useNavContent
content/                  # FR content (default). Pages = .md, data = .json. en/ mirror.
content.config.ts         # Nuxt Content collections + Zod schemas (the content contract)
nuxt.config.ts            # modules, i18n, Studio (editor.components.include), build hooks
utils/                    # build-time guards (page-identity, studio-body-normalizer)
scripts/                  # CI checks: validate-content, check-content, check-studio-conflicts
docs/                     # this documentation
.claude/skills/           # project-specific Claude skills
```

## The Content* vocabulary

`Content*` components are thin wrappers that adapt markdown props/slots onto the existing
`Sections*` presentational components (so the visual design is unchanged from before the
content was moved into the body). The set:

| Block | Wraps / role |
|---|---|
| `ContentHero` | `SectionsSectionHero` — page hero |
| `ContentIntro` | page-lead heading + intro prose |
| `ContentSection` | `SectionsSectionLabel` + responsive grid for `ContentCard`/`ContentStep` children |
| `ContentCard` | a single accent-line card (specialties) |
| `ContentStep` | a numbered step (plain or circle badge) |
| `ContentTextImage` | two-column text + image |
| `ContentDivider` | `SectionsSectionDivider` hairline |
| `ContentCtaCards` + `ContentCtaCard` | `SectionsCtaBlock`-style CTA card grid |
| `ContentWhatsappCta` | the sage WhatsApp booking button |
| `ContentGallerySection` | `SectionsImageGallery` — inline `images` or `source: tattoos` |
| `ContentTestimonials` | testimonials image wall (fetches `testimonials.json`) |
| `ContentPracticalInfo` | `SectionsPracticalInfo` — address/hours/contact/map |
| `ContentCareSection` | `SectionsCareSteps` — aftercare steps/avoid/normal/whenToContact |
| `ContentFaqSection` | `SectionsFaqAccordion` — title + `items` |

All are registered in `studio.editor.components.include` (`nuxt.config.ts`).
