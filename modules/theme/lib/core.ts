import {
  Blend,
  CustomColor,
  DynamicScheme,
  Hct,
  MaterialDynamicColors,
  Scheme,
  SchemeTonalSpot,
  sourceColorFromImage,
  Theme,
  DynamicColor
} from '@material/material-color-utilities'

const tokens = [
  'primary',
  'onPrimary',
  'primaryContainer',
  'onPrimaryContainer',
  'inversePrimary',
  'inverseOnPrimary',
  'primaryFixed',
  'primaryFixedDim',
  'onPrimaryFixed',
  'onPrimaryFixedVariant',
  'secondary',
  'onSecondary',
  'secondaryContainer',
  'onSecondaryContainer',
  'secondaryFixed',
  'secondaryFixedDim',
  'onSecondaryFixed',
  'onSecondaryFixedVariant',
  'tertiary',
  'onTertiary',
  'tertiaryContainer',
  'onTertiaryContainer',
  'tertiaryFixed',
  'tertiaryFixedDim',
  'onTertiaryFixed',
  'onTertiaryFixedVariant',
  'error',
  'onError',
  'errorContainer',
  'onErrorContainer',
  'surfaceDim',
  'surface',
  'surfaceBright',
  'surfaceContainerLowest',
  'surfaceContainerLow',
  'surfaceContainer',
  'surfaceContainerHigh',
  'surfaceContainerHighest',
  'onSurface',
  'onSurfaceVariant',
  'outline',
  'outlineVariant',
  'inverseSurface',
  'inverseOnSurface',
  'surfaceVariant',
  'surfaceTintColor',
  'background',
  'onBackground',
  'shadow',
  'scrim'
] as const

/**
 * Generate custom color group from source and target color
 *
 * @param source Source color
 * @param color Custom color
 * @param contrastLevel Contrast level between -1.0 and 1.0
 * @return Custom color group
 *
 * @link https://m3.material.io/styles/color/the-color-system/color-roles
 */
export function customColor(
  source: number,
  color: CustomColor,
  contrastLevel = 0.0
) {
  let value = color.value
  const from = value
  if (color.blend) {
    value = Blend.harmonize(from, source)
  }
  const hct = Hct.fromInt(value)
  const lightScheme = new SchemeTonalSpot(hct, false, contrastLevel)
  const darkScheme = new SchemeTonalSpot(hct, true, contrastLevel)
  const getDynamicColor = (
    token: keyof typeof MaterialDynamicColors,
    scheme: DynamicScheme
  ) => (MaterialDynamicColors[token] as DynamicColor).getArgb(scheme)
  return {
    color,
    value,
    light: {
      color: getDynamicColor('primary', lightScheme),
      onColor: getDynamicColor('onPrimary', lightScheme),
      colorContainer: getDynamicColor('primaryContainer', lightScheme),
      onColorContainer: getDynamicColor('onPrimaryContainer', lightScheme)
    },
    dark: {
      color: getDynamicColor('primary', darkScheme),
      onColor: getDynamicColor('onPrimary', darkScheme),
      colorContainer: getDynamicColor('primaryContainer', darkScheme),
      onColorContainer: getDynamicColor('onPrimaryContainer', darkScheme)
    }
  }
}

/**
 * Generate a theme from a source color
 *
 * @param source Source color
 * @param customColors Array of custom colors
 * @param contrastLevel Contrast level between -1.0 and 1.0
 * @return Theme object
 */
export function themeFromSourceColor(
  source: number,
  contrastLevel: number = 0.0,
  customColors: CustomColor[] = []
): Theme {
  const hct = Hct.fromInt(source)
  const scheme = new SchemeTonalSpot(hct, false, contrastLevel)
  const darkScheme = new SchemeTonalSpot(hct, true, contrastLevel)
  const getDynamicColors = (scheme: DynamicScheme) =>
    Object.fromEntries(
      tokens.map((token) => [
        token,
        (
          MaterialDynamicColors[
            token as keyof typeof MaterialDynamicColors
          ] as DynamicColor
        ).getArgb(scheme)
      ])
    )
  return {
    source,
    schemes: {
      light: getDynamicColors(scheme) as Scheme & { [key: string]: number },
      dark: getDynamicColors(darkScheme) as Scheme & { [key: string]: number }
    },
    palettes: {
      primary: scheme.primaryPalette,
      secondary: scheme.secondaryPalette,
      tertiary: scheme.tertiaryPalette,
      neutral: scheme.neutralPalette,
      neutralVariant: scheme.neutralVariantPalette,
      error: scheme.errorPalette
    },
    customColors: customColors.map((c) => customColor(source, c, contrastLevel))
  }
}

/**
 * Generate a theme from an image source
 *
 * @param image Image element
 * @param variant Scheme variant, equal to scheme class name (SchemeMonochrome, SchemeNeutral, SchemeTonalSpot,...)
 * @param contrastLevel Contrast level between -1.0 and 1.0
 * @param customColors Array of custom colors
 * @return Theme object
 */
export async function themeFromImage(
  image: HTMLImageElement,
  contrastLevel = 0.0,
  customColors = []
) {
  const source = await sourceColorFromImage(image)
  return themeFromSourceColor(source, contrastLevel, customColors)
}
