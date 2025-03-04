import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import Vue from 'vue';

dayjs.extend(localizedFormat);

export default function ({ app }) {
  const observableDayjs = Vue.observable({
    defaultDateFormat: 'YYYY-MM-DD',
    defaultTimeFormat: 'HH:mm:ss',
    format(date, format) {
      return dayjs(date).format(format);
    },
    toISOString(date) {
      return dayjs(date).toISOString();
    },
    localeChanged() {
      this.format = this.format.bind(this);
    },
  });
  const { i18n, vuetify } = app;

  const availableLocales = (filterCurrent) => {
    const locales = i18n.locales;
    if (filterCurrent) {
      return locales.filter(({ code }) => code !== i18n.locale);
    }
    return locales;
  };

  const switchLocale = (code) => {
    i18n.setLocale(code).finally(() => {
      const locale = i18n.getLocaleCookie() || i18n.defaultLocale;
      vuetify.framework.lang.current = locale;
      dayjs.locale(locale);
      observableDayjs.localeChanged();
    });
  };

  switchLocale(i18n.getLocaleCookie());

  app.i18n.$availableLocales = availableLocales;

  app.i18n.$switchLocale = switchLocale;

  app.i18n.$dayjs = observableDayjs;
}
