# hc-fineline docs

Per-system documentation for the Helena de Carvalho site. Start with the root
[`CLAUDE.md`](../CLAUDE.md) for the mental model and invariants, then:

- [`architecture.md`](./architecture.md) — route → collection → markdown → component map,
  the `Content*` vocabulary, and where everything lives.
- [`content-system.md`](./content-system.md) — collections, schemas, the bilingual model,
  and how content is authored as `::content-*` blocks.
- [`nuxt-studio-cms.md`](./nuxt-studio-cms.md) — the Studio editor, component registration,
  the body normalizer, and the build/CI guards.

Project-specific Claude skills live in [`.claude/skills/`](../.claude/skills/):
`edit-site-content`, `add-content-component`, `verify-changes`.
