---
name: edit-site-content
description: Safely edit or add page content for the hc-fineline (Helena de Carvalho) site. Use when changing page copy/images or adding a page. Encodes the pageKey, FR/EN parity, and component-block authoring model that otherwise silently break pages.
---

# Edit site content (hc-fineline)

This site is content-first: page copy and imagery live in `content/`, not in `.vue` files.
Page content is authored as **`::content-*` component blocks in the markdown body** —
frontmatter holds only `pageKey` + `seo`. Follow these rules so edits don't trip the
build/CI guards or break the Nuxt Studio editor.

## Route → file map

| Route | Collection | Files |
|---|---|---|
| `/` | homepage | `content/index.md`, `content/en/index.md` |
| `/gallery` | galleryPage | `content/gallery.md`, `content/en/gallery.md` |
| `/about` | aboutPage | `content/about.md`, `content/en/about.md` |
| `/process` | processPage | `content/process.md`, `content/en/process.md` |
| `/care` | carePage | `content/care.md`, `content/en/care.md` |
| `/contact` | contactPage | `content/contact.md`, `content/en/contact.md` |
| `/book-online` | bookOnlinePage | `content/book-online.md`, `content/en/book-online.md` |
| legal | legal | `content/{cookie-policy,privacy-policy,terms-and-conditions}.md` (+ `en/`) |

UI labels (nav, footer, section labels) and global info live in `content/navigation.md`
and `content/settings.md`; the gallery + testimonials image lists live in
`content/tattoos.json` and `content/testimonials.json`.

## Editing existing page copy or images

1. Open both `content/<page>.md` (French) **and** `content/en/<page>.md` (English).
   **Edit both locales** unless the change is genuinely locale-specific.
2. Edit the text inside the relevant `::content-*` block (prose is the block's body; short
   fields like titles/labels are YAML props in the `---` block or `{}` inline attrs).
3. **Never change or remove the `pageKey:` frontmatter field**, and never paste one page's
   body into another file (the build throws in CI if `pageKey` doesn't match the file).
4. Images live under `public/` — reference them by absolute path (`/img/foo.jpeg`).
5. Verify: `npm run validate:content && npm run check:content`.

## Authoring blocks (the component vocabulary)

Insert blocks from the Studio "/" menu, or write them directly. Outer block `::name`,
nested child `:::name`, inline/void `:name{...}`. Props go in a `---` YAML block; prose is
the body; `#title` is a named slot. Available blocks:

- `::content-hero` — page hero (eyebrow, titleLines[], titleEmphasis, subcopy, cornerText, ctas[], media)
- `::content-intro` — page-lead heading + intro prose (align, width, heading, spacing, bodyTone)
- `::content-section` (+ `:::content-card` / `:::content-step` children) — labelled grid / step list
- `::content-text-image` — two-column text + image (sectionLabel, title, image, ctaLabel/ctaHref)
- `::content-gallery-section` — image grid; `source: tattoos` for the full portfolio, or inline `images`
- `::content-testimonials` — testimonials wall (pulls `testimonials.json`)
- `::content-cta-cards` (+ `:::content-cta-card`) — CTA card grid
- `::content-whatsapp-cta` — WhatsApp booking button (whatsapp, message, label, size, width, spacing)
- `::content-practical-info` — address / hours / contact / map
- `::content-care-section` — aftercare steps / avoid / normal / whenToContact (+ intro prose body)
- `::content-faq-section` — title + `items` (question/answer accordion)
- `:content-divider` — hairline separator

See an existing page (e.g. `content/index.md`) for real examples, and
[`docs/architecture.md`](../../../docs/architecture.md) for the full map.

## Adding a new page

1. Create `content/<page>.md` **and** `content/en/<page>.md`, each with a unique `pageKey`.
2. Add a collection in `content.config.ts` with `pageKey: z.literal('<page>')`.
3. Register the `pageKey` in [`utils/page-identity-guard.js`](../../../utils/page-identity-guard.js)
   (`PAGE_COLLECTION_KEYS`) and in `scripts/validate-content.mjs` (`STEM_TO_COLLECTION`).
4. Add a thin route file `app/pages/<page>.vue` using `useLocaleContent('<collection>')`
   (copy `app/pages/about.vue`).
5. Add the collection name to the `PageCollection` union + `collectionRoutes` in
   [`app/composables/useLocaleContent.ts`](../../../app/composables/useLocaleContent.ts).
6. Verify with the `verify-changes` skill (tier B — this is a code change).

## Do not

- ❌ Put page copy in frontmatter or `.vue` files — it belongs in the markdown body as blocks.
- ❌ Generate/scaffold content with a script — edit files directly.
- ❌ Modify `utils/studio-body-normalizer.js` without re-running `check:studio-conflicts`
  after a build (see `docs/nuxt-studio-cms.md`).
