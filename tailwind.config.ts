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
  // theme: {
  //   extend: {
  //     minWidth: {
  //       'd-screen': '100dvw',
  //       'd-screen-1/2': '50dvw'
  //     },
  //     maxWidth: {
  //       'd-screen': '100dvw',
  //       'd-screen-1/2': '50dvw'
  //     },
  //     width: {
  //       'd-screen': '100dvw'
  //     },
  //     height: {
  //       'd-screen': '100dvh'
  //     }
  //   }
  // }
} satisfies Config
