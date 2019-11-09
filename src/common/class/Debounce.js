export default class Throttle {
    constructor() {
        this.timer = null;
    }

    do(callback, timeout) {
        this._clearTimer();
        this.timer = setTimeout(() => {
            callback && callback();
        }, timeout);
    }

    _clearTimer() {
        if (this.timer !== null) {
            clearTimeout(this.timer);
        }
        this.timer = null;
    }
}
