export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {viewTransition: true},

  srcDir: 'src',

  modules: [
    'nuxt-icon',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
    '@nuxtjs/google-fonts',
    '@/modules/theme/module.ts'
  ],

  tailwindcss: {
    configPath: 'tailwind.config',
    cssPath: '@/assets/css/tailwind.css',
    exposeConfig: true,
    viewer: false,
  },

  googleFonts: {
    preload: true,
    prefetch: true,
    families: {
      'Open+Sans': true
    }
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  image: {
    domains: ['localhost', 'maikeleckelboom.nl']
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
    registerType: 'autoUpdate',
    manifest: {
      name: 'Maikel Portfolio',
      short_name: 'Maikel Portfolio',
      theme_color: '#9dd6ee',
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
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/'
    },
    client: {
      installPrompt: true
    }
  },

})
