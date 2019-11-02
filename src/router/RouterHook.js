import router from '@/router';
import store from '@/store';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

let timer = null;

NProgress.configure({showSpinner: false});

router.beforeEach((to, from, next) => {
    NProgress.start();
    clearTimer();

    if (store.getters.loginStatus === true) {
        if (['Login', 'Register'].indexOf(to.name) !== -1) {
            NProgress.done();
            return next({name: 'Base'});
        }
        let now = parseInt(new Date().getTime() / 1000 + '');
        if (store.getters.expiresIn < now) {
            if (to.name !== 'Base') {
                NProgress.done();
                return next({name: 'Base'});
            }
        }
    }
    return next();
});

router.afterEach(() => {
    if (store.getters.loginStatus === true) {
        let now = parseInt(new Date().getTime() / 1000 + '');
        if (store.getters.expiresIn < now) {
            store.dispatch('logout');
        } else {
            setRefreshToken();
        }
    }
    NProgress.done();
});

function setRefreshToken() {
    let now = parseInt(new Date().getTime() / 1000 + '');
    let timeout = store.getters.expiresIn - now - 60 * 60;
    if (timeout <= 0 || isNaN(timeout) || !timeout) {
        timeout = 0;
    } else {
        timeout *= 1000;
    }

    timer = setTimeout(() => {
        store.dispatch('refreshToken').then();
        clearTimer();
    }, timeout);
}

function clearTimer() {
    if (timer !== null) {
        clearTimeout(timer);
    }
    timer = null;
}
