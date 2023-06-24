import { Config } from 'tailwindcss'
import { materialPreset } from './modules/theme/lib/material-preset'

export default {
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
    disableColorOpacityUtilitiesByDefault: true,
    relativeContentPathsByDefault: true
  },
  presets: [materialPreset],
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}'
  ]
} satisfies Config
