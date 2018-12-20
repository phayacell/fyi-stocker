const pkg = require('./package')

module.exports = {
  mode: 'spa',

  router: {
    middleware: 'authenticated'
  },

  // Headers of the page
  head: {
    title: 'FYI Stocker｜投稿蓄積',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon-180x180.png'
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  // Customize the progress-bar color
  loading: { color: '#fff' },

  // Global CSS
  css: ['~/assets/style/app.styl'],

  // Plugins to load before mounting the App
  plugins: ['@/plugins/vuetify'],

  // Nuxt.js modules
  modules: ['@nuxtjs/dotenv', '@nuxtjs/pwa'],

  // Build configuration
  build: {
    // You can extend webpack config here
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  // transition
  transition: {
    name: 'slide-y-transition',
    mode: 'out-in'
  },

  // PWA
  manifest: {
    name: 'FYI Stocker',
    short_name: 'FYI Stocker',
    lang: 'ja',
    background_color: '#fff',
    theme_color: '#009688'
  },
  workbox: {
    dev: true // 開発環境でもPWA
  }
}
