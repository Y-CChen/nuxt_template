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
      customProperties: true,
    },
  };
}
