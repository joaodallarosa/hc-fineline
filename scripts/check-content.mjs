#!/usr/bin/env node
/**
 * Content-component & translation-parity check (companion to validate-content.mjs).
 *
 * WHY THIS EXISTS
 * ----------------------------------------------------------------------------
 * Pages are authored in Markdown that embeds custom MDC components written as
 * `::content-hero`, `::content-cta-cards`, … (the `Content*` components in
 * app/components/content/, registered globally). Three failure modes are easy
 * to introduce and invisible until a page renders blank in production:
 *
 *   1. A markdown file references `::content-foo` but no `ContentFoo.vue` exists
 *      (typo, renamed/removed component) → the block silently renders nothing.
 *   2. A new component works on the public site but is missing from
 *      `studio.editor.componentsIncludes` in nuxt.config.ts → content editors
 *      cannot insert it from the Studio "/" slash menu on iPad.
 *   3. A page exists in French but not English (or vice versa) → the missing
 *      locale silently falls back to bare i18n strings.
 *
 * This script makes (1) a hard build failure and (2)+(3) warnings, so genuine
 * breakage blocks a deploy while non-blocking gaps are surfaced loudly.
 *
 * Run locally or in CI:  npm run check:content
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, relative, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const CONTENT_DIR = join(ROOT, 'content')
const COMPONENTS_DIR = join(ROOT, 'app', 'components', 'content')
const NUXT_CONFIG = join(ROOT, 'nuxt.config.ts')

const rel = p => relative(ROOT, p).replace(/\\/g, '/')

/** Recursively collect files under `dir` matching `ext`. */
function walk(dir, ext) {
  const out = []
  if (!existsSync(dir)) return out
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...walk(full, ext))
    else if (entry.endsWith(ext)) out.push(full)
  }
  return out
}

/** `content-cta-cards` → `ContentCtaCards`. */
function toPascal(tag) {
  return tag.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
}

// ─── 1. Collect every `content-*` component referenced in markdown ───
// MDC block syntax `::content-hero` (optionally `{...}`) and inline span
// syntax `:content-foo[...]`. The closing `::` has no name so it is ignored.
const COMPONENT_RE = /(?:^|\s):{1,}(content-[a-z0-9-]+)/gm
const used = new Map() // tag → [files]
for (const file of walk(CONTENT_DIR, '.md')) {
  const src = readFileSync(file, 'utf8')
  for (const m of src.matchAll(COMPONENT_RE)) {
    const tag = m[1]
    if (!used.has(tag)) used.set(tag, [])
    used.get(tag).push(rel(file))
  }
}

// ─── 2. Which Content* components actually exist on disk ───
const existing = new Set(
  walk(COMPONENTS_DIR, '.vue').map(f => basename(f, '.vue')),
)

// ─── 3. Which components are exposed in the Studio slash menu ───
// Collect every quoted `Content*` name in nuxt.config.ts (the editor's
// `components.include` list). Robust to the exact studio config key/shape.
const configSrc = readFileSync(NUXT_CONFIG, 'utf8')
const includes = new Set(
  [...configSrc.matchAll(/['"](Content[A-Za-z0-9]+)['"]/g)].map(m => m[1]),
)

const errors = []
const warnings = []

for (const [tag, files] of used) {
  const component = toPascal(tag)
  if (!existing.has(component)) {
    errors.push(`${component} (::${tag}) is used in ${files.join(', ')} but app/components/content/${component}.vue does not exist.`)
    continue
  }
  if (includes.size && !includes.has(component)) {
    warnings.push(`${component} is used in content but not listed in studio.editor.componentsIncludes — editors cannot insert it from the Studio "/" menu.`)
  }
}

// ─── 4. French / English page parity ───
const frPages = new Set(walk(CONTENT_DIR, '.md')
  .filter(f => !rel(f).startsWith('content/en/'))
  .map(f => basename(f, '.md')))
const enDir = join(CONTENT_DIR, 'en')
const enPages = new Set(existsSync(enDir) ? readdirSync(enDir).filter(f => f.endsWith('.md')).map(f => basename(f, '.md')) : [])
for (const stem of frPages) {
  if (!enPages.has(stem)) warnings.push(`content/${stem}.md has no English counterpart at content/en/${stem}.md.`)
}
for (const stem of enPages) {
  if (!frPages.has(stem)) warnings.push(`content/en/${stem}.md has no French counterpart at content/${stem}.md.`)
}

// ─── Report ───
if (warnings.length) {
  console.warn('⚠ Content warnings:')
  for (const w of warnings) console.warn('  - ' + w)
  console.warn('')
}

if (errors.length) {
  console.error('✗ Content component check failed:\n')
  for (const e of errors) console.error('  - ' + e)
  console.error('\nA page references a component that does not exist; it would render blank. Fix the reference or add the component before deploying.')
  process.exit(1)
}

console.log(`✓ Content component check passed — ${used.size} content components referenced, all resolved.`)
