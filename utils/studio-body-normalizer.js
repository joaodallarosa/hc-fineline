// Keeps Nuxt Content's parsed markdown body aligned with how Nuxt Studio
// regenerates that body from the raw markdown, so the editor never reports a
// false "version differs" conflict. The `check:studio-conflicts` CI step
// verifies on every deploy that this leaves every page matching its raw GitHub
// markdown — so changes here are guarded.
//
// WHAT STUDIO DOES (the behaviour we mirror): inside a custom MDC component,
// Studio unwraps a slot's single wrapping `<p>` paragraph, lifting its inline
// children up. This happens for BOTH:
//   • the default slot — the component's direct children, e.g.
//       ['my-card', {}, ['p', {}, 'Hi']]            → ['my-card', {}, 'Hi']
//   • each named slot — content under `#title` / `#description`, parsed as a
//     `['template', { 'v-slot:title': '' }, …]` node, e.g.
//       ['template', { 'v-slot:title': '' }, ['p', {}, 'Hi']]
//                                                   → ['template', { 'v-slot:title': '' }, 'Hi']
// Only a SINGLE paragraph is unwrapped; multi-paragraph slots keep their `<p>`s.
// Named-slot templates and the default slot are unwrapped independently, so a
// component with `#title` + body text round-trips correctly.

function isParagraphNode(node) {
  return Array.isArray(node) && node[0] === 'p' && node.length >= 2 && typeof node[1] === 'object' && !Array.isArray(node[1])
}

function isCustomComponentNode(tag) {
  return typeof tag === 'string' && tag.includes('-') && tag !== 'p'
}

// A `#name` named-slot is parsed as a `<template v-slot:name>` node.
function isTemplateSlotNode(node) {
  return Array.isArray(node)
    && node[0] === 'template'
    && typeof node[1] === 'object'
    && node[1] !== null
    && !Array.isArray(node[1])
    && Object.keys(node[1]).some(key => key.startsWith('v-slot'))
}

// If `children` is exactly one paragraph, return that paragraph's inline children
// (unwrapped); otherwise return `children` unchanged.
function unwrapSingleParagraph(children) {
  if (children.length === 1 && isParagraphNode(children[0])) {
    const [, , ...paragraphChildren] = children[0]
    return paragraphChildren
  }
  return children
}

function normalizeNode(node) {
  if (typeof node === 'string' || node == null) {
    return node
  }

  if (!Array.isArray(node)) {
    return node
  }

  const [tag, props, ...children] = node
  const normalizedChildren = children.map(child => normalizeNode(child))

  // Named-slot template: unwrap its single wrapping paragraph.
  if (isTemplateSlotNode(node)) {
    return [tag, props, ...unwrapSingleParagraph(normalizedChildren)]
  }

  // Custom component: unwrap the default slot's single paragraph in place,
  // leaving any named-slot template nodes (already normalized above) untouched.
  if (isCustomComponentNode(tag)) {
    const defaultChildren = normalizedChildren.filter(child => !isTemplateSlotNode(child))

    if (defaultChildren.length === 1 && isParagraphNode(defaultChildren[0])) {
      const paragraph = defaultChildren[0]
      const [, , ...paragraphChildren] = paragraph
      const rebuilt = normalizedChildren.flatMap(child =>
        child === paragraph ? paragraphChildren : [child]
      )
      return [tag, props, ...rebuilt]
    }
  }

  return [tag, props, ...normalizedChildren]
}

export function normalizeStudioCompatibleBody(body) {
  if (!body || body.type !== 'minimark' || !Array.isArray(body.value)) {
    return body
  }

  return {
    ...body,
    value: body.value.map(node => normalizeNode(node)),
  }
}
