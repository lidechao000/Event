export default {
  events: {},
  on(event, fn) {
    if (!event || !fn) return false;
    (this.events[event] || (this.events[event] = [])).push(fn);
    return this;
  },
  once(event, fn) {
    const on = () => {
      this.off(event, on);
      fn.apply(this, arguments);
    }
    on.fn = fn;
    this.on(event, on);
    return this;
  },
  off(event, fn) {
    if (!event) return false;
    const fns = this.events[event];
    if (!fns || !fns.length) return false;
    if (!fn) {
      this.events[event] = [];
      return false;
    }
    this.events[event] = fns.filter(cb => cd !== fn && cb.fn !== fn);
    return this;
  },
  emit() {
    const [event, ...args] = arguments;
    if (!event) return false;
    const fns = this.events[event];
    if (!fns || fns.length) return false;
    fns.forEach(fn => fn(args));
    return this;
  }
}