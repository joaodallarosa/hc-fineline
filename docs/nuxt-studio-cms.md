# Nuxt Studio CMS

The site is edited through [Nuxt Studio](https://nuxt.studio): the editor opens the repo in
the browser, edits `content/`, and commits to GitHub. The Vue code renders that content.

## How the editor sees the page

Page content is a stack of `::content-*` blocks in the markdown body. In Studio the editor:

1. Clicks "/" to open the insert menu — it lists every component in
   `studio.editor.components.include` (`nuxt.config.ts`). Listing them explicitly makes them
   discoverable on all devices including iPad (no hover needed).
2. Inserts a block (e.g. *Hero*, *Section*, *Gallery section*) and fills its fields — short
   fields are form inputs (driven by the component's `defineProps` and the Zod `editor()`
   hints), prose is typed inline, images use the media picker.
3. Reorders / nests blocks visually.

This is the same authoring model as the reference tattoo-studio project: **data lives in
components**, not in one big "Page Settings" frontmatter object.

## Component registration

`::content-foo` → `app/components/content/ContentFoo.vue` (auto-imported globally via the
`components` config). To make it insertable from the "/" menu, add `'ContentFoo'` to
`studio.editor.components.include`. `npm run check:content` warns if a component used in
content is not registered. (See the `add-content-component` skill.)

## The body normalizer (and why it matters)

Nuxt Content keeps a single wrapping `<p>` inside custom-component slots, while Studio
auto-unwraps that same paragraph before comparing a GitHub draft against the deployed
document tree. If they diverge, Studio falsely reports "version differs" on every page.

[`utils/studio-body-normalizer.js`](../utils/studio-body-normalizer.js) mirrors Studio's
unwrapping in the `content:file:afterParse` build hook so the two always agree. **Treat it
as load-bearing** — after any change to it (or to slot usage in `Content*` components), run:

```bash
npm run build
npm run check:studio-conflicts   # loads the built tree; asserts each page round-trips
```

`check:studio-conflicts` compares each built page against its raw markdown using Studio's
own comparison util, so a regression fails the build instead of confusing the editor.

## The page-clobber guard

Studio commits whole files; a stale draft can overwrite one page with another's body. Every
page carries a `pageKey` stamp; [`utils/page-identity-guard.js`](../utils/page-identity-guard.js)
(build hook + `npm run validate:content`) throws in production/CI if a file's `pageKey`
doesn't match the page its location maps to.

## Production setup

`studio.repository` in `nuxt.config.ts` must point at the site's GitHub repo
(owner/repo/branch) for production Studio — set this before going live. `studio.dev` is on
in non-production so editing works locally at `/_studio`. Images are committed to GitHub
from the browser at publish time.
