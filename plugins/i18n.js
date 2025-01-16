// import { localeChanged } from 'vee-validate';

export default function ({ app }) {
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
      vuetify.framework.lang.current =
        i18n.getLocaleCookie() || i18n.defaultLocale;
      // localeChanged();
    });
  };

  switchLocale(i18n.getLocaleCookie());

  app.i18n.$availableLocales = availableLocales;

  app.i18n.$switchLocale = switchLocale;
}
