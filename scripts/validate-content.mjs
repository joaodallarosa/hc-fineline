#!/usr/bin/env node
/**
 * Standalone content-identity check (defense in depth for the build-time guard
 * in nuxt.config.ts). Scans every page markdown file under content/ and fails
 * if its `pageKey` stamp does not match the page its filename maps to — i.e. a
 * Studio draft clobbered one page with another page's content.
 *
 * Run locally or in CI:  npm run validate:content
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { checkPageIdentity } from '../utils/page-identity-guard.js'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const CONTENT_DIR = join(ROOT, 'content')

// Page filename stem → its content collection name.
const STEM_TO_COLLECTION = {
  index: 'homepage',
  gallery: 'galleryPage',
  about: 'aboutPage',
  process: 'processPage',
  care: 'carePage',
  contact: 'contactPage',
  'book-online': 'bookOnlinePage',
  'cookie-policy': 'legal',
  'privacy-policy': 'legal',
  'terms-and-conditions': 'legal',
}

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...walk(full))
    else if (entry.endsWith('.md')) out.push(full)
  }
  return out
}

function readPageKey(file) {
  const src = readFileSync(file, 'utf8')
  const fm = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!fm) return undefined
  const line = fm[1].split(/\r?\n/).find(l => /^pageKey\s*:/.test(l))
  if (!line) return undefined
  return line.replace(/^pageKey\s*:\s*/, '').replace(/['"]/g, '').trim()
}

const errors = []
for (const file of walk(CONTENT_DIR)) {
  const stem = basename(file, '.md')
  const collection = STEM_TO_COLLECTION[stem]
  if (!collection) continue // not a guarded page (data collections, navigation, settings, etc.)
  const rel = relative(ROOT, file).replace(/\\/g, '/')
  const message = checkPageIdentity(collection, rel, readPageKey(file))
  if (message) errors.push(message)
}

if (errors.length) {
  console.error('✗ Content identity check failed:\n')
  for (const e of errors) console.error('  - ' + e)
  console.error('\nA page file appears to hold another page\'s content. Restore the correct content before deploying.')
  process.exit(1)
}

console.log('✓ Content identity check passed — every page file matches its pageKey.')
