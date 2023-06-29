import {
  addPlugin,
  addTemplate,
  createResolver,
  defineNuxtModule
} from 'nuxt/kit'
import { defu } from 'defu'
import { ModuleOptions } from '@nuxt/schema'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'toast',
    configKey: 'toast',
    version: '0.0.1',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    timeout: 5000
  },
  hooks: {
    'components:dirs'(dirs) {
      dirs.push({
        path: resolve('./runtime/components'),
        prefix: ''
      })
    },
    'imports:dirs'(dirs) {
      dirs.push(resolve('./runtime/composables'))
    }
  },
  setup: function (options, nuxt) {
    const moduleOptions = defu(nuxt.options.appConfig.toast ?? {}, options)
    // add option to support theme generation from image

    nuxt.options.appConfig.toast = moduleOptions
    nuxt.options.runtimeConfig.public.toast = moduleOptions
    addPlugin(resolve('./runtime/plugin'))

    // addTemplate({
    //   filename: 'toast.d.ts',
    //   getContents: () => {
    //     return `
    //     interface ThemeNitroRules { }
    //     export {}`
    //   }
    // })
    // nuxt.hooks.hook('prepare:types', ({ references }) => {
    //   references.push({ path: resolve(nuxt.options.buildDir, 'toast.d.ts') })
    // })
  }
})
