import Debounce from '@/common/class/Debounce';

export default class Throttle extends Debounce {
    constructor(timeout) {
        super();
        this.timer = null;
        this.timeout = timeout;
    }

    do(callback) {
        if (this.timer === null) {
            this.timer = setTimeout(() => {
                callback && callback();
                this._clearTimer();
            }, this.timeout);
        }
    }

}
