export function useSeoPage(page: Ref<Record<string, any> | null | undefined>) {
  const requestUrl = useRequestURL()

  const seo = computed(() => (page.value as Record<string, any>)?.seo ?? {})
  const fallbackImage = computed(() => (page.value as Record<string, any>)?.images?.[0]?.src ?? '/favicon.svg')
  const canonicalUrl = computed(() => `${requestUrl.origin}${requestUrl.pathname}`)
  const socialImageUrl = computed(() => new URL(seo.value.ogImage ?? fallbackImage.value, requestUrl.origin).toString())

  useSeoMeta({
    title: () => seo.value.title ?? page.value?.title ?? '',
    description: () => seo.value.description ?? '',
    ogTitle: () => seo.value.ogTitle ?? seo.value.title ?? page.value?.title ?? '',
    ogDescription: () => seo.value.ogDescription ?? seo.value.description ?? '',
    ogImage: () => socialImageUrl.value,
    ogType: 'website',
    ogUrl: () => canonicalUrl.value,
    twitterCard: 'summary_large_image',
    twitterTitle: () => seo.value.twitterTitle ?? seo.value.ogTitle ?? seo.value.title ?? '',
    twitterDescription: () => seo.value.twitterDescription ?? seo.value.ogDescription ?? seo.value.description ?? '',
    twitterImage: () => socialImageUrl.value,
  })

  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }],
  })
}
