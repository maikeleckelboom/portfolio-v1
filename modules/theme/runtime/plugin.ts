import type { Ref } from 'vue'
import { argbFromHex, Theme } from '@material/material-color-utilities'
import { argbCustomColors } from '~/modules/theme/runtime/utils/customColors'
import { propertiesFromTheme } from '~/modules/theme/runtime/package'
import { themeFromSourceColor } from '~/modules/theme/lib/core'

export default defineNuxtPlugin((nuxtApp) => {
  const runtime = computed(() => {
    const {
      public: { theme }
    } = useRuntimeConfig()
    return theme
  })

  const getThemeFromSourceColor = () =>
    themeFromSourceColor(
      argbFromHex(runtime.value.colors.primary),
      0.0,
      argbCustomColors(runtime.value.customColors)
    )

  const theme = ref(getThemeFromSourceColor()) as Ref<Theme>

  watch(
    () => [runtime.value.colors.primary, runtime.value.customColors],
    () => {
      theme.value = getThemeFromSourceColor()
    },
    { deep: true }
  )

  const colorMode = useColorMode()

  const getProperties = () =>
    propertiesFromTheme(theme.value, {
      dark:
        colorMode?.value === 'dark' ||
        (process.server && runtime.value.options.dark),
      tones: runtime.value.options.tones
    })

  const properties = computed(getProperties)

  useHead(
    computed(() => ({
      style: [
        {
          id: 'color-properties',
          textContent: cssFromProperties(properties.value)
        }
      ]
    }))
  )

  const customColors = computed({
    get: () => runtime.value.customColors,
    set: (value) => (runtime.value.customColors = value)
  })

  const sourceColor = computed<string>({
    get: () => runtime.value.colors.primary,
    set: (value) => (runtime.value.colors.primary = value)
  })

  return {
    provide: {
      theme,
      sourceColor,
      customColors
    }
  }
})
