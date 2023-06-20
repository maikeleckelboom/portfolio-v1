import { Config } from 'tailwindcss'
import { materialPreset } from './src/modules/theme/lib/material-preset'

export default {
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
    disableColorOpacityUtilitiesByDefault: true,
    relativeContentPathsByDefault: true
  },
  content: [
    './src/components/**/*.{vue,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js,ts}'
  ],
  presets: [materialPreset]
} satisfies Config
