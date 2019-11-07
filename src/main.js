import 'babel-polyfill';
import Vue from 'vue';
import antd from 'ant-design-vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import VueBus from 'vue-bus/dist/vue-bus';
import Utils from '@/common/Utils';
import '@/common/VTheme';
import '@/assets/sass/app.scss';
import '@/router/RouterHook'

Vue.use(antd);
Vue.use(VueBus);

Vue.config.productionTip = false;
Vue.prototype.$utils = Utils;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
