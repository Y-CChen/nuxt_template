export const timeout = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export class Timeout {
  timeoutId = null;
  callback = null;
  ms = null;
  args = null;

  start({ callback, ms, args } = {}) {
    this.stop();
    this.timeoutId = setTimeout(() => {
      (callback ?? this.callback)(...(args ?? this.args ?? []));
    }, ms ?? this.ms);
  }

  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = null;
  }

  constructor({ callback, ms, args }) {
    this.callback = callback ?? null;
    this.ms = ms ?? null;
    this.args = args ?? null;
  }
}
