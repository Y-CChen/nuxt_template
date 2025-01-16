import en from 'vuetify/lib/locale/en';
import zhHant from 'vuetify/lib/locale/zh-Hant';
import config from '~/.config';
import locales from '~/locales/locales';

const { defaultLocale } = config;

export default function (context) {
  return {
    lang: {
      current: defaultLocale,
      locales: {
        [locales.en.code]: en,
        [locales.zhTw.code]: zhHant,
      },
    },
    theme: {
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          primary: {
            lighten5: '#f1f0f7',
            lighten4: '#e5e3f1',
            lighten3: '#d2cce6',
            lighten2: '#b9afd6',
            lighten1: '#9e8ec4',
            base: '#9079b6',
            darken1: '#7b61a0',
            darken2: '#665186',
            darken3: '#54446e',
            darken4: '#362b4a',
          },
          secondary: {
            lighten5: '#f2f9f8',
            lighten4: '#ddf0ef',
            lighten3: '#bee3e3',
            lighten2: '#92cdce',
            lighten1: '#67b5b7',
            base: '#429498',
            darken1: '#3a7b80',
            darken2: '#34646a',
            darken3: '#315359',
            darken4: '#2c484d',
          },
        },
      },
    },
  };
}
