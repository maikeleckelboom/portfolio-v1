import type { Ref } from 'vue'
import type { CustomHexColor } from '~/modules/theme/types/theme'
import {
  argbFromHex,
  hexFromArgb,
  Theme,
  themeFromSourceColor
} from '@material/material-color-utilities'
import { argbCustomColors } from '~/modules/theme/runtime/utils/customColors'
import { propertiesFromTheme } from '~/modules/theme/runtime/package'

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
      argbCustomColors(runtime.value.customColors as CustomHexColor[])
    )

  const getThemeFromKeyColors = () =>
    themeFromKeyColors(
      runtime.value.colors,
      argbCustomColors(runtime.value.customColors as CustomHexColor[])
    )

  const theme = ref(getThemeFromSourceColor()) as Ref<Theme>
  const colorMode = useColorMode()

  const { trigger, ignoreUpdates } = watchTriggerable(
    () => [
      runtime.value.colors.secondary,
      runtime.value.colors.tertiary,
      runtime.value.colors.neutral,
      runtime.value.colors.neutralVariant,
      runtime.value.colors.error
    ],
    () => {
      theme.value = getThemeFromKeyColors()
    }
  )

  watch(
    () => runtime.value.colors.primary,
    () => {
      theme.value = getThemeFromSourceColor()
      ignoreUpdates(() => {
        runtime.value.colors = {
          ...runtime.value.colors,
          secondary: hexFromArgb(theme.value.palettes.secondary.tone(50)),
          tertiary: hexFromArgb(theme.value.palettes.tertiary.tone(50)),
          neutral: hexFromArgb(theme.value.palettes.neutral.tone(50)),
          neutralVariant: hexFromArgb(
            theme.value.palettes.neutralVariant.tone(50)
          ),
          error: hexFromArgb(theme.value.palettes.error.tone(50))
        }
      })
    }
  )

  watch(
    () => runtime.value.customColors,
    () => {
      theme.value = getThemeFromSourceColor()
    },
    { deep: true }
  )

  const getProperties = () =>
    propertiesFromTheme(theme.value, {
      dark:
        colorMode?.value === 'dark' ||
        (process.server && runtime.value.options.dark),
      tones: runtime.value.options.tones
    })

  // const themeProperties = ref<Record<string, string>>(getProperties())

  const properties = computed(() =>
    propertiesFromTheme(theme.value, {
      dark:
        colorMode?.value === 'dark' ||
        (process.server && runtime.value.options.dark),
      tones: runtime.value.options.tones
    })
  )

  useHead(
    computed(() => ({
      style: [
        {
          id: 'material-color-properties',
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

  const keyColors = computed({
    get: () => runtime.value.colors,
    set: (value) => (runtime.value.colors = value)
  })

  return {
    provide: {
      theme,
      keyColors,
      sourceColor,
      customColors,
      getProperties
    }
  }
})
