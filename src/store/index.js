import Vue from 'vue';
import Vuex from 'vuex';
import User from '@/store/modules/User';
import VuexLocalSync from '@/store/plugins/VuexStorage';

Vue.use(Vuex);

let VueLocalSyncPlugin = new VuexLocalSync({
    key: 'store',
    storage: window.localStorage
});

let modules = {
    User
};

export default new Vuex.Store({
    modules,
    plugins: [VueLocalSyncPlugin.plugin]
});