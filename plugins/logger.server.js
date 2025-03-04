export default function (_ignore, inject) {
  const loggerErrorFunc = process.$logger?.error;
  const logError = (...args) => {
    const error = args?.[0];
    if (error?.isAxiosError) {
      args[0] = error.toJSON?.() || error;
    }
    loggerErrorFunc(...args);
  };
  process.$logger.error = logError;
  inject('logger', process.$logger);
}
