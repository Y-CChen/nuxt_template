export default function ({ app }, inject) {
  let logger = process.$logger;
  if (!logger) {
    const { isDev } = app.context.env;
    logger = isDev
      ? console
      : Object.fromEntries(Object.keys(console).map((key) => [key, () => {}]));
    logger.info('client logger initialized');
    process.$logger = logger;
    const loggerErrorFunc = process.$logger?.error;
    const logError = (...args) => {
      const error = args?.[0];
      if (error?.isAxiosError) {
        return;
      }
      loggerErrorFunc(...args);
    };
    process.$logger.error = logError;
  }
  inject('logger', logger);
}
