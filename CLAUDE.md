# CLAUDE.md

Guidance for AI agents (and humans) working in this repository. Read this first.
For deeper dives, see [`docs/`](./docs/README.md).

## What this is

**hc-fineline** — Helena de Carvalho, a bilingual (French default / English) marketing
site for a fineline & botanical tattoo artist in Paris. The site is **content-first**:
nearly all copy and imagery live as Markdown/YAML in `content/` and are edited by a
non-technical editor through the **Nuxt Studio** visual CMS. The Vue/Nuxt code is a thin
rendering layer over that content.

> **Mental model:** to change wording or images you edit `content/`, not `.vue` files.
> Page content is authored as **`::content-*` component blocks in the markdown body**
> (inserted from the Studio "/" menu, each with its own data fields) — **not** as one big
> frontmatter blob. Frontmatter holds only `pageKey` + `seo`.

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Nuxt 4** + Vue 3 (`<script setup>`, TS) | `app/` is the source root |
| Styling | **Tailwind CSS v4** | CSS-first config in `app/assets/css/main.css` |
| Content | **Nuxt Content v3** | Collections + Zod schemas in `content.config.ts` |
| CMS | **Nuxt Studio** | Edits `content/`, commits to GitHub from the browser |
| i18n | **@nuxtjs/i18n v10** | FR default (no prefix), EN under `/en`, `strategy: prefix_except_default` |
| Hosting | **Vercel** | Static prerender; `/api/**` + `/_studio/**` excluded |

Package manager: **npm**. UI labels (nav/footer/section labels) come from the `navigation`
and `siteSettings` content collections, not i18n JSON files.

## Commands

```bash
npm run dev                    # Dev server (http://localhost:3000, studio at /_studio)
npm run build                  # Production build (runs the content guards via build hooks)
npm run generate               # Static generation

npm run validate:content       # pageKey identity check (no build needed)
npm run check:content          # Content* refs exist + registered + FR/EN parity
npm run check:studio-conflicts # AFTER a build: detects Studio content/GitHub divergence
```

## How a page works (the core pattern)

1. A route file like [`app/pages/about.vue`](app/pages/about.vue) calls
   `useLocaleContent('aboutPage')` and renders `<ContentRenderer :value="page" />`.
2. [`useLocaleContent`](app/composables/useLocaleContent.ts) maps the locale to a content
   path (`/about` → FR `content/about.md`, EN `content/en/about.md`), queries that
   collection, and calls `useSeoPage()`.
3. The markdown **body** is a sequence of `::content-*` blocks → those map to the global
   `Content*` components in [`app/components/content/`](app/components/content/), which
   compose the presentational `Sections*` components in `app/components/sections/`.

So: **route → collection → markdown body → `Content*` block → `Sections*` component.**

The editable building blocks (registered in `studio.editor.components.include`):
`ContentHero`, `ContentIntro`, `ContentSection` (+ `ContentCard` / `ContentStep` children),
`ContentTextImage`, `ContentDivider`, `ContentCtaCards` (+ `ContentCtaCard`),
`ContentWhatsappCta`, `ContentGallerySection`, `ContentTestimonials`,
`ContentPracticalInfo`, `ContentCareSection`, `ContentFaqSection`.

## Critical invariants — break these and you cause regressions

1. **Every page markdown file carries a `pageKey`** (a `z.literal`/`z.enum` in
   `content.config.ts`), cross-checked by [`utils/page-identity-guard.js`](utils/page-identity-guard.js).
   The build **throws in production/CI** if a file's `pageKey` doesn't match the page its
   location maps to (protects against a Studio draft clobbering one page with another's
   content). Never remove a `pageKey`; never copy one page's body over another.
2. **Every page needs a FR and an EN file** (`content/x.md` + `content/en/x.md`).
   `npm run check:content` warns on gaps.
3. **`Content*` components used in markdown must exist and be registered.** `::content-foo`
   → `app/components/content/ContentFoo.vue`, and the component name must be in
   `studio.editor.components.include` in `nuxt.config.ts`. `npm run check:content` **fails**
   on a missing component and **warns** on registry drift. (Use the `add-content-component` skill.)
4. **Don't touch the Studio body normalizer lightly.** [`utils/studio-body-normalizer.js`](utils/studio-body-normalizer.js)
   keeps Nuxt Content's parsed body aligned with how Studio compares drafts against GitHub.
   `npm run check:studio-conflicts` (post-build) fails if they diverge — preventing false
   "version differs" conflicts in the editor.
5. **All routes are prerendered** except `/api/**` and `/_studio/**`. Keep page data
   fetchable at build time.

## Conventions

- **Vue:** `<script setup lang="ts">`, `defineProps<{...}>()`. `Content*` components are
  global (auto-imported in markdown); `Sections*` are referenced as `Sections*` in templates.
- **`Content*` wrap `Sections*`** — keep the presentational markup in `Sections*` and let
  `Content*` adapt props/slots from the markdown. Don't duplicate styling.
- **Content copy lives in `content/`**, not in `.vue` files. UI chrome labels live in the
  `navigation` / `siteSettings` collections.
- **SEO** is set automatically by `useSeoPage` from page frontmatter `seo:`.

## Danger zone — do NOT

- ❌ **Do not put page copy back into frontmatter or `.vue` files.** It belongs in the
  markdown body as `::content-*` blocks.
- ❌ **Do not generate/scaffold content with scripts** — edit `content/` directly.
- ❌ **Do not commit secrets.** Runtime secrets are env vars.
- ❌ **Do not bump native deps casually** (`better-sqlite3`, `sharp`). Within-major JS
  updates are fine if `build` passes.

## When you finish a change

For content edits: `npm run validate:content && npm run check:content`. For code/config:
add a `npm run build` and `npm run check:studio-conflicts`. See the `verify-changes` skill.
