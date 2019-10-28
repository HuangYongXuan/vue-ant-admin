import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Base from './modules/_base'

let routes = [...Base];

export default new VueRouter({
    routes,
    model: 'hash',
    base: '/'
})