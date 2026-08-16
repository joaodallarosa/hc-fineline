# Content system

## Collections (`content.config.ts`)

Page collections are validated by Zod. Since page content now lives in the markdown **body**
as `::content-*` blocks, page schemas are intentionally minimal — `pageKey` + `seo` (plus a
couple of preserved-but-not-yet-surfaced fields):

- `homepage` — `pageKey: 'home'`, `seo`, `studioImages` (preserved, not shown today)
- `galleryPage` — `pageKey: 'gallery'`, `seo`, `hero` + `images` (preserved; the visible grid
  comes from `tattoos.json` via `::content-gallery-section{source:tattoos}`)
- `aboutPage` / `processPage` / `carePage` / `contactPage` / `bookOnlinePage` — `pageKey` + `seo`
- `legal` — `pageKey: enum(cookie-policy|privacy-policy|terms-and-conditions)`, `seo`, `title`, `lastUpdated`
- `navigation` — UI labels (nav, footer, practicalInfo labels, care labels)
- `siteSettings` — studio name, address, hours, social URLs, map embed
- `tattoos` (data) — `[{ order, src }]` portfolio images
- `testimonials` (data) — `{ body: [src, …] }` testimonial screenshots

The per-section data (hero copy, steps, cards, etc.) is **not** in these schemas — it lives
in each `Content*` block's props, typed by that component's `defineProps`.

## Bilingual model

FR is the default locale (no path prefix); EN lives under `/en`
(`strategy: prefix_except_default`). Every page has a French file (`content/x.md`) and an
English mirror (`content/en/x.md`). `useLocaleContent` resolves the active locale to the
right file; `npm run check:content` warns if a locale counterpart is missing.

UI chrome (nav links, footer, section labels) is **not** in i18n JSON — it comes from the
`navigation` collection (`content/navigation.md` + `content/en/navigation.md`), read by
`useNavContent`.

## How content is authored

Frontmatter holds only `pageKey` + `seo`. The body is a sequence of `::content-*` blocks:

```markdown
---
pageKey: about
seo:
  title: À propos · Helena de Carvalho
---

::content-hero
---
eyebrow: Tatoueuse · Paris
titleLines:
  - Helena
  - de Carvalho
media:
  type: image
  src: /img/IMG-0328.jpeg
---
::

::content-text-image
---
title: Mon histoire
image: /img/IMG-0363.jpeg
---
Je viens du sud du Brésil…
::
```

- Props → YAML in the block's `---` header (or `{key="val"}` inline).
- Prose → the block's default slot (written as markdown).
- A named field → `#name` slot.
- Nested children use one extra colon (`:::content-card` inside `::content-section`).

Image picker fields use `z.string().editor({ input: 'media' })` in schemas so Studio shows
a media picker. Images live under `public/` and are referenced by absolute path.
