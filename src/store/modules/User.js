import userApi from '@/common/apis/user';
import Utils from '@/common/Utils';
import Request from '@/common/Request';


export default {
    state: {
        userInfo: {},
        loginStatus: false,
        token: undefined,
        expiresIn: undefined,
        roles: []
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setLoginStatus(state, status) {
            state.loginStatus = status;
        },
        setToken(s, t) {
            s.token = t;
            Request.defaults.headers['Authorization'] = 'Bearer ' + t || '';
        },
        setExpiresIn(s, e) {
            s.expiresIn = e;
        },
        setRoles(s, r) {
            s.roles = r;
        }
    },
    actions: {
        async login({commit}, data) {
            return await userApi.auth(data).then(async res => {
                return await Utils.responseHandler(res, true, true, '登陆成功').then(({data}) => {
                    commit('setToken', data.token);
                    commit('setExpiresIn', data.expiresAt);
                    commit('setLoginStatus', true);
                    return data;
                });
            });
        },
        async logout({commit}) {
            return await userApi.destroy().then(() => true).finally(() => {
                commit('setToken', undefined);
                commit('setExpiresIn', undefined);
                commit('setLoginStatus', false);
                return true;
            });
        },
        async getUserInfo({commit}) {
            return await userApi.profile(true).then(async res => {
                return await Utils.responseHandler(res, false, false).then(({data}) => {
                    commit('setRoles', data.roles || []);
                    delete data.roles;
                    commit('setUserInfo', data);
                    return data;
                });
            });
        },
        async refreshToken ({commit}) {
            return await userApi.tokenRefresh().then(async res => {
                return await Utils.responseHandler(res, false, false).then(({data}) => {
                    commit('setToken', data.token);
                    commit('setExpiresIn', data.expiresAt);
                    commit('setLoginStatus', true);
                    return data;
                })
            })
        }
    },
    getters: {
        userInfo: s => s.userInfo,
        loginStatus: s => s.loginStatus,
        token: s => s.token,
        expiresIn: s => s.expiresIn,
        roles: s => s.roles
    }
};
