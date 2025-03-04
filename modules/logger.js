import winston from 'winston';

export default function logger() {
  this.nuxt.hook('listen', () => {
    const logger = winston.createLogger({
      level: 'info',
      transports: [new winston.transports.Console()],
    });
    logger.info('server logger initialized');
    process.$logger = logger;
  });

  // profiler
  // this.nuxt.hook('vue-renderer:context', () => {
  //   process.$logger.info('vue-renderer:context');
  //   const now = Date.now();
  //   process.$profiler = (message) => {
  //     process.$logger.info(`[profiler] ${Date.now() - now}ms ${message}`);
  //   };
  // });
  // this.nuxt.hook('render:routeDone', () => {
  //   process.$profiler('render:routeDone');
  // });
}
