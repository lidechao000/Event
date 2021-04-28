export class Event {
  constructor() {
    this.list = {};
  }
  on(event, fn) {
    this.list = {
      ...this.list,
      [event]: [
        ...(this.list[event] || []),
        fn
      ]
    };
    return this;
  }
  once(event, fn) {
    function on() {
      this.off(event, on);
      fn.apply(this, arguments)
    }
    this.on(event, on);
    return this;
  }
  off(event, fn) {
    const fns = this.list[event];
    if (!fns || !fns.length) return false;
    if (!fn) {
      this.list[event] = [];
      return this;
    }
    this.list[event] = fns.filter(cb => cb !== fn);
    return this;
  }
  emit() {
    const [event, ...args] = arguments;
    const fns = this.list[event];
    if (!fns || !fns.length) {
      return false;
    }
    fns.forEach(fn => fn(arguments));
    return this;
  }
};
