import Vue from 'vue';
import VueRouter from 'vue-router';
// hack router push callback
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
};
Vue.use(VueRouter);

import Base from './modules/_base';
import _backstage from '@/router/modules/_backstage';

let routes = [...Base, ..._backstage];

/**
 * 创建路由
 * @returns {VueRouter}
 */
const createRouter = () => new VueRouter({
    routes,
    model: 'history',
    base: '/',
    scrollBehavior: () => ({y: 0})
});

const router = createRouter();

/**
 * 重置路由
 */
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}

export default router;
