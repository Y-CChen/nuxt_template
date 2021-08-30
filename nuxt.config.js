import colors from 'vuetify/es5/util/colors';
import config from './.config.js';
import i18n from './locales/i18n';

const isDev = process.env.NODE_ENV === 'development';
const baseUrl = isDev ? config.development.prefix : config.production.prefix;
const backendUrl = isDev
  ? config.development.backendUrl
  : config.production.backendUrl;
const proxy = {};
if (isDev) {
  proxy[config.development.backendUrl] = {
    target: `${config.development.backendProxyTargetUrl}`,
    pathRewrite: { [`^${config.development.backendUrl}`]: '' },
  };
}

export default {
  env: {
    baseUrl,
    backendUrl,
  },

  router: {
    base: baseUrl,
  },

  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - nuxt_template',
    title: 'nuxt_template',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${baseUrl}/favicon.ico` },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // https://github.com/nuxt-community/proxy-module
    '@nuxtjs/proxy',
    // https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://i18n.nuxtjs.org
    'nuxt-i18n',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: isDev,
  },

  proxy,

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
  },

  // Vuetify module configuration (https://i18n.nuxtjs.org/options-reference)
  i18n,

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
};
