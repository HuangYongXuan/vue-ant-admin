export const setting = {
    tableSize: 'small',             // 表格size
    tableActionBtnSize: 'small',    // 表格操作按钮大小
    tableShowActionBtnText: true,  // 是否显示表格操作按钮文字
    formDrawerWidth: 500,           // 表单抽屉宽度
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
