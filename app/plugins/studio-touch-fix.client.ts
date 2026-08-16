/**
 * Nuxt Studio — Touch device & UX fixes.
 *
 * 1. TOUCH CSS (shadow root injection)
 *    The Studio editor renders inside a <nuxt-studio> custom element with an open
 *    Shadow DOM. Its component overlay buttons use Tailwind's group-hover utilities
 *    (opacity-0 by default, opacity-100 on hover), which never trigger on touch
 *    devices like iPads. This plugin injects CSS into the shadow root to:
 *    a) Make overlays permanently visible when the device has no fine pointer / hover.
 *    b) Fix media-picker pagination on iPad: `touch-action: manipulation` prevents
 *       iOS from treating button taps as scroll-start gestures.
 *
 * 2. SCROLL POSITION PRESERVATION
 *    When Studio triggers a content refresh in dev mode it may cause a full page
 *    reload, resetting scroll to the top. This plugin saves the scroll position
 *    to sessionStorage before the reload and restores it on the next page boot,
 *    but only if Studio was active and the reload happened within the last 5 seconds
 *    on the same path.
 */

const SCROLL_KEY = 'nuxt-studio-scroll-restore'

export default defineNuxtPlugin((nuxtApp) => {
  // ── 1. Touch CSS ────────────────────────────────────────────────────────────

  const TOUCH_CSS = `
    /* Studio layer normalization.
       The page-level <nuxt-studio> z-index keeps Studio above the site. Inside
       the shadow root, avoid negative layers so iPad Safari does not paint the
       sidebar behind the preview, then lift Studio overlays above that sidebar.
    */
    :host {
      --studio-layer-sidebar: 0;
      --studio-layer-floating: 100;
      --studio-layer-modal: 1000;
    }

    .fixed.top-0.bottom-0.left-0.border-r.border-default.flex.flex-col.max-w-full.bg-default {
      z-index: var(--studio-layer-sidebar) !important;
    }

    [data-reka-popper-content-wrapper],
    [data-reka-select-content],
    [data-reka-dropdown-menu-content],
    [data-reka-popover-content],
    [role="listbox"],
    [role="menu"] {
      z-index: var(--studio-layer-floating) !important;
    }

    [data-slot="overlay"].fixed.inset-0,
    [role="dialog"],
    .z-1000,
    .z-\\[1000\\] {
      z-index: var(--studio-layer-modal) !important;
    }

    /* ── Media picker layout fix (all devices) ─────────────────────────────
       The outer container (wY = "flex h-96 flex-col") has no overflow clip,
       so the image grid (PY = "grid flex-1 content-start grid-cols-3 …")
       bleeds past the 384px boundary and visually overlaps the pagination
       that sits as a sibling below it in the modal body flex column.
       Fix: clip wY and make PY scrollable within its constrained space. */
    .h-96.flex-col {
      overflow: hidden;
    }
    .content-start.grid-cols-3 {
      overflow-y: auto;
      min-height: 0;
    }

    @media (hover: none), (pointer: coarse) {
      /* Make group-hover overlays (Edit Props buttons) permanently visible */
      .group-hover\\:opacity-100 { opacity: 1 !important; }
      .group-hover\\:visible     { visibility: visible !important; }
      .group-hover\\:block       { display: block !important; }

      /* Fix media-picker pagination on iPad:
         touch-action: manipulation prevents iOS from treating a tap as a
         potential scroll gesture and removes the 300ms double-tap delay. */
      button, [role="button"] {
        touch-action: manipulation;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        cursor: pointer;
      }
    }
  `

  const injectIntoShadowRoot = (el: Element, attempts = 0) => {
    const shadowRoot = (el as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot
    if (!shadowRoot) {
      if (attempts < 20) {
        requestAnimationFrame(() => injectIntoShadowRoot(el, attempts + 1))
      }
      return
    }

    const existingStyle = shadowRoot.querySelector<HTMLStyleElement>('[data-studio-touch-fix]')
    if (existingStyle) {
      existingStyle.textContent = TOUCH_CSS
    }
    else {
      const style = document.createElement('style')
      style.setAttribute('data-studio-touch-fix', '')
      style.textContent = TOUCH_CSS
      shadowRoot.appendChild(style)
    }
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof Element && node.tagName.toLowerCase() === 'nuxt-studio') {
          injectIntoShadowRoot(node)
          observer.disconnect()
          return
        }
      }
    }
  })

  // In case <nuxt-studio> is already in the DOM before the plugin runs.
  const existing = document.querySelector('nuxt-studio')
  if (existing) {
    injectIntoShadowRoot(existing)
  }
  else {
    observer.observe(document.body, { childList: true, subtree: true })
  }

  // ── 2. Scroll position preservation ────────────────────────────────────────

  // Restore scroll position saved by a previous Studio-triggered reload.
  const saved = sessionStorage.getItem(SCROLL_KEY)
  if (saved) {
    try {
      const { scrollY, timestamp, path } = JSON.parse(saved) as {
        scrollY: number
        timestamp: number
        path: string
      }
      const isRecent = Date.now() - timestamp < 5_000
      const isSamePath = path === window.location.pathname

      if (isRecent && isSamePath) {
        // Wait for the page to finish rendering before restoring scroll.
        nuxtApp.hook('page:finish', () => {
          window.scrollTo({ top: scrollY, behavior: 'instant' })
        })
      }
    }
    catch {
      // Malformed entry — ignore.
    }
    finally {
      sessionStorage.removeItem(SCROLL_KEY)
    }
  }

  // Save scroll position before any reload that happens while Studio is active.
  window.addEventListener('beforeunload', () => {
    if (!document.querySelector('nuxt-studio')) return

    sessionStorage.setItem(SCROLL_KEY, JSON.stringify({
      scrollY: window.scrollY,
      timestamp: Date.now(),
      path: window.location.pathname,
    }))
  })
})
