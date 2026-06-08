import { defineEventHandler, getRequestHeader, readRawBody } from 'h3'
import { useStorage } from '#imports'

// Image extensions that will be optimized on upload.
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.avif'])

// Maximum dimension (width or height) for stored images.
const MAX_DIMENSION = 2400

/** Run sharp optimization on a raw image buffer. */
async function optimizeImage(input: Buffer, ext: string): Promise<Buffer> {
  // Lazy import: sharp is a native addon that must NOT be bundled by Rollup.
  // Importing here (inside an async function) keeps it out of the module
  // graph at startup and avoids server crashes on environments that haven't
  // resolved the native binary yet.
  const { default: sharp } = await import('sharp')
  const pipeline = sharp(input).resize(MAX_DIMENSION, MAX_DIMENSION, {
    fit: 'inside',
    withoutEnlargement: true,
  })
  if (ext === '.png') return pipeline.png({ compressionLevel: 9, effort: 10 }).toBuffer()
  if (ext === '.webp') return pipeline.webp({ quality: 82 }).toBuffer()
  if (ext === '.avif') return pipeline.avif({ quality: 68 }).toBuffer()
  // .jpg / .jpeg / .tiff → JPEG
  return pipeline.jpeg({ quality: 82 }).toBuffer()
}

/**
 * Nitro middleware for Nuxt Studio media uploads.
 *
 * The nuxt-studio module supports three upload code paths:
 *   1. application/octet-stream  → raw binary body
 *   2. text/plain                → UTF-8 text (non-image, pass through)
 *   3. anything else (JSON)      → { raw: "data:<mime>;base64,<data>" }
 *
 * We intercept paths 1 and 3 for image files and run them through sharp
 * before writing to storage — the original high-res bytes never hit disk.
 * Folder-creation stubs (JSON body without a `raw` field) are also handled
 * here to prevent the module from throwing on undefined.
 */
export default defineEventHandler(async (event) => {
  if (event.method !== 'PUT') return
  if (!event.path.startsWith('/__nuxt_studio/dev/public/')) return

  const contentType = getRequestHeader(event, 'content-type') || ''
  const filePath = decodeURIComponent(event.path.replace('/__nuxt_studio/dev/public/', ''))
  const ext = filePath.slice(filePath.lastIndexOf('.')).toLowerCase()
  const key = filePath.replace(/\//g, ':').replace(/^public-assets:/, '')
  const storage = useStorage('nuxt_studio_public_assets')

  // ── Path 1: raw binary upload (application/octet-stream) ────────────────
  if (contentType === 'application/octet-stream') {
    if (IMAGE_EXTENSIONS.has(ext)) {
      const rawBody = await readRawBody(event, false)
      if (!rawBody || !rawBody.length) return
      const optimized = await optimizeImage(rawBody as Buffer, ext)
      await storage.setItemRaw(key, optimized)
      return 'OK'
    }
    // Non-image binary (e.g. font, video) — let the module handle it
    return
  }

  // ── Path 2: plain text (SVG source, etc.) — let the module handle it ────
  if (contentType === 'text/plain') return

  // ── Path 3: JSON body ────────────────────────────────────────────────────
  const raw = await readRawBody(event, 'utf8')
  let json: Record<string, unknown> = {}
  try { json = JSON.parse(raw || '{}') } catch { /* empty body */ }

  if (json.raw && typeof json.raw === 'string' && json.raw !== '') {
    if (IMAGE_EXTENSIONS.has(ext)) {
      // data URI: "data:<mime>;base64,<data>"
      const base64 = (json.raw as string).split(';base64,')[1]
      const inputBuffer = Buffer.from(base64, 'base64')
      const optimized = await optimizeImage(inputBuffer, ext)
      await storage.setItemRaw(key, optimized)
      return 'OK'
    }
    // Non-image JSON upload — let the module handle it
    return
  }

  // No `raw` field → folder creation (.gitkeep stub). Write empty file.
  await storage.setItem(key, '')
  return 'OK'
})
