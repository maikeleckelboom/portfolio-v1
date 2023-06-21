import { Config } from 'tailwindcss'
import { materialPreset } from './lib/material-preset'

export default {
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
    disableColorOpacityUtilitiesByDefault: true,
    relativeContentPathsByDefault: true
  },
  presets: [materialPreset],
  content: [
    './src/components/**/*.{vue,ts}',
    './src/layouts/**/*.vue',
    './src/pages/**/*.vue',
    './src/plugins/**/*.{js,ts}'
  ]
} satisfies Config
