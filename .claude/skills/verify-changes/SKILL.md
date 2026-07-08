---
name: verify-changes
description: Run hc-fineline's regression-safe verification before committing or opening a PR. Use after editing content, components, or config to confirm nothing is broken. Picks the right checks based on what changed (content-only vs code/config).
---

# Verify changes (hc-fineline)

Pick the tier by what you changed, then run its checks. All are also enforced at build time.

## Tier A — content only (`content/**`, `public/**` images)

```bash
npm run validate:content   # every page's pageKey matches its location
npm run check:content      # ::content-* used → component exists + registered; FR/EN parity
```

These are fast and need no build. They catch the common content mistakes: a broken
`pageKey`, a typo'd `::content-*` block, an unregistered component, or a missing locale.

## Tier B — code or config (`app/**`, `nuxt.config.ts`, `content.config.ts`, `utils/**`, `scripts/**`, `package.json`)

```bash
npm run build                  # runs the content-identity + body-normalizer hooks
npm run check:studio-conflicts # AFTER the build: every page still matches its raw markdown
```

`build` throws if any `pageKey` is wrong (strict in production/CI). `check:studio-conflicts`
loads the built content tree and asserts each page round-trips, so a regression in
`utils/studio-body-normalizer.js` (which would cause false "version differs" conflicts in
the Studio editor) fails here instead of confusing the editor.

After a successful build you can spot-check the prerendered HTML under
`.output/public/**/index.html` to confirm the expected copy and images rendered.

## Notes

- If you cleared or suspect a stale content cache, delete `.data/` and `.nuxt/` before
  rebuilding — Nuxt Content caches parsed content there, and a stale cache reflects the old
  `content.config.ts` schema (e.g. a missing `pageKey` column).
- `check:studio-conflicts` requires a prior `npm run build` (it reads `.nuxt/content/`).
