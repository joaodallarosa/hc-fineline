type PageCollection =
  | 'homepage'
  | 'galleryPage'
  | 'aboutPage'
  | 'processPage'
  | 'carePage'
  | 'contactPage'
  | 'bookOnlinePage'
  | 'legal'

const collectionRoutes: Record<Exclude<PageCollection, 'legal'>, string> = {
  homepage: '/',
  galleryPage: '/gallery',
  aboutPage: '/about',
  processPage: '/process',
  carePage: '/care',
  contactPage: '/contact',
  bookOnlinePage: '/book-online',
}

export function useLocaleContent(collection: PageCollection, slug?: string) {
  const { locale } = useI18n()
  const localePath = useLocalePath()

  const baseRoute = slug
    ? `/${slug}`
    : (collectionRoutes as Record<string, string>)[collection] ?? '/'

  const cacheKey = `${collection}-${slug ?? 'page'}-${locale.value}-v1`

  const contentPath = computed(() => localePath(baseRoute))

  const { data: page } = useAsyncData(cacheKey, async () => {
    return await queryCollection(collection)
      .where('path', '=', contentPath.value)
      .first()
  })

  useSeoPage(page as Ref<Record<string, any> | null | undefined>)

  return { page, locale, localePath }
}
