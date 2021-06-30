import webpack from 'webpack';

export default {
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'crossorigin'
      },
      {
        rel: 'preload',
        href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
        as: 'style'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
        media: 'print',
        onload: 'this.media=\'all\''
      }
    ],
    script: []
  },
  loading: { color: '#fff' },
  router: {
    middleware: ['checkout'],
    scrollBehavior (_to, _from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    }
  },
  buildModules: [
    // to core
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    // to core soon
    '@nuxtjs/pwa',
    ['@vue-storefront/nuxt', {
      coreDevelopment: true,
      useRawSource: {
        dev: [
          '@vue-storefront/commercetools',
          '@vue-storefront/core'
        ],
        prod: [
          '@vue-storefront/commercetools',
          '@vue-storefront/core'
        ]
      }
    }],
    ['@vue-storefront/nuxt-theme'],
    ['@vue-storefront/commercetools/nuxt', {
      api: {
        uri: 'https://api.europe-west1.gcp.commercetools.com/demo-store-3/graphql',
        authHost: 'https://auth.europe-west1.gcp.commercetools.com',
        projectKey: 'demo-store-3',
        clientId: 'wfnYCqseGOZoLzBqOw4_cfZ4',
        clientSecret: 'PeByUF_f5RpMXP7Vb4RYoJPOY75K6moY',
        scopes: [
          'view_products:demo-store-3',
          'manage_my_profile:demo-store-3',
          'view_shopping_lists:demo-store-3',
          'view_states:demo-store-3',
          'view_project_settings:demo-store-3',
          'view_stores:demo-store-3',
          'view_orders:demo-store-3',
          'view_discount_codes:demo-store-3',
          'view_shipping_methods:demo-store-3',
          'view_order_edits:demo-store-3',
          'introspect_oauth_tokens:demo-store-3',
          'manage_my_orders:demo-store-3',
          'view_tax_categories:demo-store-3',
          'view_cart_discounts:demo-store-3',
          'view_types:demo-store-3',
          'view_payments:demo-store-3',
          'create_anonymous_token:demo-store-3',
          'manage_my_payments:demo-store-3',
          'view_categories:demo-store-3',
          'view_messages:demo-store-3',
          'manage_my_shopping_lists:demo-store-3',
          'view_customer_groups:demo-store-3',
          'view_customers:demo-store-3'
        ]
      },
      i18n: {
        useNuxtI18nConfig: true
      }
    }]
  ],
  modules: [
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    // Doc: https://github.com/storyblok/storyblok-nuxt
    [
      'storyblok-nuxt',
      {
        accessToken: 'g8UkqYs6SyoqHkY6RCudkwtt',
        cacheProvider: 'memory'
      }
    ],
  ],
  plugins: ['~/plugins/cms'],
  i18n: {
    currency: 'USD',
    country: 'US',
    countries: [
      { name: 'US',
        label: 'United States' },
      { name: 'AT',
        label: 'Austria' },
      { name: 'DE',
        label: 'Germany' },
      { name: 'NL',
        label: 'Netherlands' }
    ],
    currencies: [
      { name: 'EUR',
        label: 'Euro' },
      { name: 'USD',
        label: 'Dollar' }
    ],
    locales: [
      {
        code: 'en',
        label: 'English',
        file: 'en.js',
        iso: 'en'
      },
      {
        code: 'de',
        label: 'German',
        file: 'de.js',
        iso: 'de'
      }
    ],
    defaultLocale: 'en',
    lazy: true,
    seo: true,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en',
      numberFormats: {
        en: {
          currency: {
            style: 'currency', currency: 'USD', currencyDisplay: 'symbol'
          }
        },
        de: {
          currency: {
            style: 'currency', currency: 'EUR', currencyDisplay: 'symbol'
          }
        }
      }
    },
    detectBrowserLanguage: {
      cookieKey: 'vsf-locale'
    }
  },
  styleResources: {
    scss: [require.resolve('@storefront-ui/shared/styles/_helpers.scss', { paths: [process.cwd()] })]
  },
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ]
  }
};
