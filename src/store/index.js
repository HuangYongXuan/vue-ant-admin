import Vue from 'vue';
import Vuex from 'vuex';
import User from '@/store/modules/User';
import VuexLocalSync from '@/store/plugins/VuexStorage';
import Setting from '@/store/modules/Setting';

Vue.use(Vuex);

let VueLocalSyncPlugin = new VuexLocalSync({
    key: 'store',
    storage: window.localStorage
});

let modules = {
    User,
    Setting
};

export default new Vuex.Store({
    modules,
    plugins: [VueLocalSyncPlugin.plugin]
});

Vue.mixin({
    filters: {
        imageSrc(v) {
            if (/^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i.test(v)) {
                return v;
            }
            return process.env.VUE_APP_STATIC_RESOURCE_URL + v;
        },
        formatterTimestamp(v) {
            if (typeof v === 'string') {
                return v.split('.')[0];
            }
            return '';
        }
    },
    computed: {
        ...Vuex.mapGetters({_theme: 'theme', _setting: 'setting'})
    },
    methods: {
        _getImageFullPath(url) {
            if (/^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i.test(url)) {
                return url;
            }
            return process.env.VUE_APP_STATIC_RESOURCE_URL + url;
        }
    }
});
