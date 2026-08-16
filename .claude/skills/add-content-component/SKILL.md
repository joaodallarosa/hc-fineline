---
name: add-content-component
description: Create and register a new Content* markdown component for the hc-fineline site. Use when adding a new ::content-* block type that editors can insert from the Nuxt Studio "/" menu. Encodes the registration + slot conventions that keep Studio and the conflict guard working.
---

# Add a Content* markdown component (hc-fineline)

`::content-foo` in markdown maps to `app/components/content/ContentFoo.vue` (these are
auto-imported globally — see the `components` config in `nuxt.config.ts`).

## Steps

1. Create `app/components/content/ContentFoo.vue` with `<script setup lang="ts">` and
   `defineProps<{...}>()`. **Compose an existing `Sections*` component** where possible so
   the visual design stays consistent — most `Content*` are thin wrappers (e.g.
   [`ContentHero.vue`](../../../app/components/content/ContentHero.vue) wraps
   `SectionsSectionHero`).
2. Decide how editors pass data:
   - **Short fields** (titles, hrefs, flags) → `defineProps` (YAML in the block's `---`
     header, or `{key="val"}` inline attrs).
   - **Prose** → the default `<slot />`. Style slotted markdown with
     `[&>p]:mb-4 [&>p:last-child]:mb-0` (and `[&>p]:m-0` for single-paragraph slots) so a
     wrapping `<p>` doesn't add stray margins.
   - **A named field** → a named slot, read in markdown as `#name`.
   - **Lists with internal state** (gallery lightbox, single-open accordion) → keep the
     data as an **array prop** backed by the stateful `Sections*` component, rather than
     per-item child blocks (this preserves behaviour and avoids SSR ordering issues).
3. **Register the component** in `nuxt.config.ts` under
   `studio.editor.components.include` (add `'ContentFoo'`). This makes it insertable from
   the Studio "/" menu on all devices. `npm run check:content` warns if a used component
   is not registered.
4. Use it in content: `::content-foo` … `::` with props as `---`/`{}` YAML.
5. Verify: `npm run check:content` (fails if the component file is missing), then a
   `npm run build && npm run check:studio-conflicts` (the build proves the new slot shape
   round-trips through the Studio body normalizer without false conflicts).

## Nesting / syntax cheat-sheet

- Outer block: `::content-foo` … `::`
- Nested child block (one level deeper = one more colon): `:::content-bar` … `:::`
- Inline / void component: `:content-foo{prop="x"}` (no closing)
- Props: a `---` YAML block right after the opener, or `{key="val" k2="v2"}` inline
- Default slot: prose written after the props block
- Named slot: `#title` followed by its content

See `content/index.md` for live examples of all of these.
