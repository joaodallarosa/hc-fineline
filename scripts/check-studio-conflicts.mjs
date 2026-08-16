/**
 * Post-build Nuxt Studio conflict sweep.
 *
 * Studio compares the raw GitHub markdown against the deployed document tree to
 * decide whether an editor's draft is in sync. If our build-time body parsing
 * diverges from how Studio regenerates the body (see utils/studio-body-normalizer.js),
 * every page falsely reports "version differs" in the editor. This sweep loads the
 * built content tree and asserts each page still matches its raw markdown, using
 * Studio's own comparison util — so a regression in the normalizer fails the deploy
 * instead of confusing editors.
 *
 * Run AFTER `npm run build`:  npm run check:studio-conflicts
 */
import Database from 'better-sqlite3'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { collections } from '../.nuxt/content/preview.mjs'
import { isDocumentMatchingContent } from '../node_modules/nuxt-studio/dist/module/runtime/utils/document/compare.js'

const dumpPath = resolve('.nuxt/content/sql_dump.txt')

if (!existsSync(dumpPath)) {
  console.error('Missing .nuxt/content/sql_dump.txt. Run `npm run build` before checking Studio conflicts.')
  process.exit(1)
}

const db = new Database(':memory:')
db.exec(readFileSync(dumpPath, 'utf8'))

function hydrateRow(row, collection) {
  const hydrated = { ...row }

  for (const [field, fieldType] of Object.entries(collection.fields || {})) {
    const value = hydrated[field]

    if (fieldType !== 'json' || typeof value !== 'string') {
      continue
    }

    hydrated[field] = JSON.parse(value)
  }

  return hydrated
}

let checked = 0
const conflicts = []

for (const collection of Object.values(collections)) {
  if (collection.type !== 'page') {
    continue
  }

  const rows = db.prepare(`SELECT * FROM ${collection.tableName}`).all()

  for (const row of rows) {
    const hydrated = hydrateRow(row, collection)
    const filePath = resolve('content', `${hydrated.stem}.${hydrated.extension}`)
    const rawContent = readFileSync(filePath, 'utf8')
    const matches = await isDocumentMatchingContent(rawContent, hydrated)

    checked += 1

    if (!matches) {
      conflicts.push(`- content/${hydrated.stem}.${hydrated.extension}`)
    }
  }
}

if (conflicts.length > 0) {
  console.error(`Nuxt Studio conflict sweep failed for ${conflicts.length} page file(s):\n${conflicts.join('\n')}`)
  process.exit(1)
}

console.log(`Nuxt Studio conflict sweep passed for ${checked} page file(s).`)
