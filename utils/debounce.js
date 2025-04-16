import { Timeout } from '~/utils/timeout';

export class Debounce {
  timeout = null;
  afterCallbackPromise = null;

  async start({ callback, ms, args } = {}) {
    await this.afterCallbackPromise;
    this.timeout.start({
      callback: async () => {
        let afterCallbackResolve = null;
        this.afterCallbackPromise = new Promise((resolve) => {
          afterCallbackResolve = resolve;
        });
        await (callback ?? this.timeout.callback)(
          ...(args ?? this.timeout.args ?? []),
        );
        this.stop();
        afterCallbackResolve();
      },
      ms,
    });
  }

  stop() {
    this.timeout.stop();
  }

  isStarted() {
    return !!this.timeout.timeoutId;
  }

  constructor({ callback, ms, args }) {
    this.timeout = new Timeout({ callback, ms, args });
    this.afterCallbackPromise = null;
  }
}
