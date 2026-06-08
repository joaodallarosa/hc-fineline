export function useSettings() {
  const { locale } = useI18n()
  const localePath = useLocalePath()

  const settingsPath = computed(() => localePath('/settings'))
  const cacheKey = computed(() => `site-settings-${locale.value}`)

  const { data: settings } = useAsyncData(cacheKey.value, () =>
    queryCollection('siteSettings')
      .where('path', '=', settingsPath.value)
      .first()
  )

  return { settings }
}
