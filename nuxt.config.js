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
        uri: 'https://api.europe-west1.gcp.commercetools.com/vsf-demo/graphql',
        authHost: 'https://auth.europe-west1.gcp.commercetools.com',
        projectKey: 'vsf-demo',
        clientId: 'OcT-IwFuMjS5byN50RBPBdPz',
        clientSecret: 'fANkvc525kWYgt6MpDBDLl1So7vWkCsD',
        scopes: [
          'view_products:vsf-demo',
          'manage_my_profile:vsf-demo',
          'view_shopping_lists:vsf-demo',
          'view_states:vsf-demo',
          'view_project_settings:vsf-demo',
          'view_stores:vsf-demo',
          'view_orders:vsf-demo',
          'view_discount_codes:vsf-demo',
          'view_shipping_methods:vsf-demo',
          'view_order_edits:vsf-demo',
          'introspect_oauth_tokens:vsf-demo',
          'manage_my_orders:vsf-demo',
          'view_tax_categories:vsf-demo',
          'view_cart_discounts:vsf-demo',
          'view_types:vsf-demo',
          'view_payments:vsf-demo',
          'create_anonymous_token:vsf-demo',
          'manage_my_payments:vsf-demo',
          'view_categories:vsf-demo',
          'view_messages:vsf-demo',
          'manage_my_shopping_lists:vsf-demo',
          'view_customer_groups:vsf-demo',
          'view_customers:vsf-demo'
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
