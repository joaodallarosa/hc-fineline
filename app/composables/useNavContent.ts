export function useNavContent() {
  const { locale } = useI18n()
  const localePath = useLocalePath()

  const navPath = computed(() => localePath('/navigation'))
  const cacheKey = computed(() => `navigation-${locale.value}`)

  const { data: nav } = useAsyncData(cacheKey.value, () =>
    queryCollection('navigation')
      .where('path', '=', navPath.value)
      .first()
  )

  return { nav }
}
