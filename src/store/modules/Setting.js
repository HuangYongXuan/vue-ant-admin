export default {
    state: {
        theme: 'dark',
        setting: {
            tableSize: 'small'
        }
    },
    mutations: {
        SET_THEME(state, theme) {
            state.theme = theme;
        }
    },
    actions: {
        setTheme({commit}, theme) {
            commit('SET_THEME', theme);
        }
    },
    getters: {
        theme: (s) => s.theme,
        setting: s => s.setting
    }
};
