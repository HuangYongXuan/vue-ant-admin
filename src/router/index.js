import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Base from './modules/_base'
import _backstage from '@/router/modules/_backstage';

let routes = [...Base, ..._backstage];

export default new VueRouter({
    routes,
    model: 'hash',
    base: '/'
})
