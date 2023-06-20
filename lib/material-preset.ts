import type {Config} from 'tailwindcss'
import {materialPlugin} from './material-plugin'
import containerQueriesPlugin from '@tailwindcss/container-queries'
import scrollbarPlugin from 'tailwind-scrollbar'

export const materialPreset = {
  plugins: [
    scrollbarPlugin({nocompatible: true}),
    containerQueriesPlugin,
    materialPlugin
  ],
  content: []
} satisfies Config
