export default defineNuxtConfig({
  experimental: { viewTransition: true },

  css: ['~/assets/css/tailwind.css'],

  modules: [
    'nuxt-icon',
    '@vite-pwa/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
    '@nuxtjs/google-fonts',
    '~/modules/theme/module.ts'
  ],

  postcss: {
    plugins: {
      'postcss-import': {},
      'postcss-nested': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  googleFonts: {
    preload: true,
    families: {
      'Open+Sans': true
    }
  },

  appConfig: {
    theme: {
      options: {
        dark: true
      }
    }
  },

  icon: {
    size: '24px'
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  image: {
    domains: ['localhost', 'maikeleckelboom.nl', 'maikel.tech'],
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          width: 60,
          height: 60
        }
      },
      picture: {
        modifiers: {
          format: 'webp',
          width: 360
        }
      }
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: ''
  },

  pinia: {
    autoImports: ['defineStore', 'storeToRefs']
  },

  imports: {
    dirs: ['stores']
  },

  pwa: {
    workbox: {
      navigateFallback: '/'
    },
    client: {
      installPrompt: true
    },
    registerType: 'autoUpdate',
    manifest: {
      name: 'Maikel Portfolio',
      short_name: 'Maikel Portfolio',
      theme_color: '#19191d',
      icons: [
        {
          src: '/assets/icon/icon-72-72.png',
          sizes: '72x72',
          type: 'image/png'
        },
        {
          src: '/assets/icon/icon-96-96.png',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          src: '/assets/icon/icon-144-144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: '/assets/icon/icon-192-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/assets/icon/icon-512-512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/assets/icon/icon-512-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  }
})
