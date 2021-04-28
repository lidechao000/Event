export class Event {
  constructor() {
    this.events = {};
  }
  on(event, fn) {
    (this.events[event] || (this.events[event] = [])).push(fn);
    return this;
  }
  once(event, fn) {
    const on = () => {
      this.off(event, on);
      fn.apply(this, arguments);
    }
    on.fn = fn;
    this.on(event, on);
    return this;
  }
  off(event, fn) {
    const fns = this.events[event];
    if (!fns || !fns.length) return false;
    if (!fn) {
      this.events[event] = [];
      return this;
    }
    this.events[event] = fns.filter(cb => cb !== fn && cb.fn !== fn);
    return this;
  }
  emit() {
    const [event, ...args] = arguments;
    const fns = this.events[event];
    if (!fns || !fns.length) {
      return false;
    }
    fns.forEach(fn => fn(args));
    return this;
  }
};
