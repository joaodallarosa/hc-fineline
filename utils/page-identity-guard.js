/**
 * Page-identity guard.
 *
 * WHY THIS EXISTS
 * ----------------------------------------------------------------------------
 * Nuxt Studio commits the WHOLE markdown file from a browser draft (there is no
 * field-level merge). A stale or mis-associated draft can therefore replace one
 * page's file with another page's content — e.g. a Studio commit overwriting
 * `content/about.md` with the gallery page body, so `/about` silently renders
 * the gallery page.
 *
 * Every page-type markdown file carries a `pageKey` stamp (declared as a literal
 * in content.config.ts). This guard cross-checks that stamp against the page the
 * file's location actually maps to. If they disagree, a page has been clobbered
 * with another page's content. In a production/CI build we THROW so the build
 * fails and the bad content never deploys (Vercel keeps the last good build); in
 * dev we only warn so a transient editing state never bricks the editor.
 *
 * This is shared by the `content:file:afterParse` build hook (nuxt.config.ts)
 * and the standalone CI check (scripts/validate-content.mjs).
 */

// Single-file page collections → their expected pageKey.
export const PAGE_COLLECTION_KEYS = {
  homepage: 'home',
  galleryPage: 'gallery',
  aboutPage: 'about',
  processPage: 'process',
  carePage: 'care',
  contactPage: 'contact',
  bookOnlinePage: 'book-online',
}

// The `legal` collection holds several pages; the pageKey must equal the file stem.
export const LEGAL_KEYS = ['cookie-policy', 'privacy-policy', 'terms-and-conditions']

function fileStem(fileId) {
  return String(fileId || '')
    .replace(/\\/g, '/')
    .split('/')
    .pop()
    .replace(/\.md$/i, '')
}

/**
 * Returns an error message string when the file's pageKey does not match the
 * page its location maps to, or null when the file is fine / not a guarded page.
 *
 * @param {string} collectionName - e.g. 'aboutPage', 'legal'
 * @param {string} fileId - source file id/path (e.g. 'content/en/about.md')
 * @param {unknown} pageKey - the parsed frontmatter `pageKey` value
 */
export function checkPageIdentity(collectionName, fileId, pageKey) {
  if (collectionName && Object.prototype.hasOwnProperty.call(PAGE_COLLECTION_KEYS, collectionName)) {
    const expected = PAGE_COLLECTION_KEYS[collectionName]
    if (pageKey !== expected) {
      return `${fileId}: collection '${collectionName}' expects pageKey '${expected}' but found '${pageKey ?? 'undefined'}'. `
        + `A Studio draft most likely overwrote this page with another page's content. Restore the correct content.`
    }
    return null
  }

  if (collectionName === 'legal') {
    const stem = fileStem(fileId)
    if (!LEGAL_KEYS.includes(pageKey) || pageKey !== stem) {
      return `${fileId}: legal page expects pageKey '${stem}' but found '${pageKey ?? 'undefined'}'. `
        + `A Studio draft most likely overwrote this page with another page's content.`
    }
    return null
  }

  // Not a guarded page collection (data collections, navigation, siteSettings, etc.).
  return null
}

/**
 * Build-hook entry point. Throws in strict (production/CI) builds, warns in dev.
 *
 * @param {{ collection?: { name?: string }, file?: { id?: string }, content?: Record<string, unknown> }} ctx
 * @param {{ strict?: boolean }} [opts]
 */
export function assertPageIdentity(ctx, opts = {}) {
  const message = checkPageIdentity(ctx?.collection?.name, ctx?.file?.id, ctx?.content?.pageKey)
  if (!message) return

  if (opts.strict) {
    throw new Error(`[page-identity-guard] ${message}`)
  }
  console.warn(`[page-identity-guard] ${message}`)
}
