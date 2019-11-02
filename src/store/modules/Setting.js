let setting = {
    tableSize: 'small',
    tableActionBtnSize: 'small',
    tableShowActionBtnText: false
};

export default {
    state: {
        theme: 'dark',
        setting
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
        setting: s => {
            if (s.setting) {
                return s.setting;
            } else {
                return setting;
            }
        }
    }
};
