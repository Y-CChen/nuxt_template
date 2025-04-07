import config from './.config';
import locales from './locales/locales';
import { makePublicPath } from './utils/make-path';

const isDev = process.env.NODE_ENV === 'development';
const { apis, auths, defaultLocale, fakeApisMiddleware, routerBase } = config;

export default {
  env: {
    isDev,
  },

  publicRuntimeConfig: {
    apis,
    routerBase,
  },

  privateRuntimeConfig: {},

  telemetry: false,

  serverMiddleware: [...fakeApisMiddleware],

  router: {
    base: routerBase,
    middleware: [
      // DANGER: beware of order
      'auth',
    ],
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate(titleChunk) {
      const prefix = titleChunk ? `${titleChunk} - ` : '';
      return `${prefix}${this.$t('nuxt-template')}`;
    },
    htmlAttrs: {},
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/svg',
        href: makePublicPath(routerBase, '/logo.svg'),
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // DANGER: beware of order
    { src: '~/plugins/logger.server.js', mode: 'server' },
    { src: '~/plugins/logger.client.js', mode: 'client' },
    { src: '~/plugins/router.js' },
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/validate.js' },
    { src: '~/plugins/ui.client.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '~/modules/logger',
    // https://auth.nuxtjs.org
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://i18n.nuxtjs.org
    '@nuxtjs/i18n',
  ],

  // Auth module configuration: https://auth.nuxtjs.org/api/options
  auth: {
    cookie: {
      options: {
        secure: !isDev,
      },
    },
    fullPathRedirect: true,
    localStorage: false,
    plugins: ['~/plugins/auth.js'],
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/',
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: `${apis.mainUrl}/auth/login`, method: 'POST' },
          user: { url: `${apis.mainUrl}/auth/user`, method: 'GET' },
          refresh: { url: `${apis.mainUrl}/auth/refresh`, method: 'POST' },
          logout: false,
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          maxAge: auths.local.maxAgeRefreshToken,
        },
        scheme: '~/auth-schemes/local.js',
        token: {
          maxAge: auths.local.maxAgeAccessToken,
          property: 'accessToken',
        },
        user: { autoFetch: true, property: 'user' },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Vuetify module configuration: https://i18n.nuxtjs.org/options-reference
  i18n: {
    defaultLocale,
    detectBrowserLanguage: {
      cookieSecure: true,
    },
    langDir: './locales',
    lazy: true,
    locales: Object.values(locales),
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: defaultLocale,
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      icons: 'mdi',
    },
    optionsPath: './vuetify.config.js',
    treeShake: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
          },
          utils: {
            test: /[\\/]utils[\\/]/,
          },
        },
      },
    },
  },
};
