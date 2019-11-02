export const merge = (into, from) => {
    return Object.assign({}, into, from);
};

export default class VuexLocalSync {
    constructor(options) {
        this.subscriber = (store) => (handler) => store.subscribe(handler);
        this.key = options.key || 'vuex';
        this.storage = options.storage || window.localStorage;
        this.reducer = options.reducer != null ? options.reducer : ((state) => state);
        this.restoreState = options.restoreState != null ? options.restoreState : ((key, storage) => {
            const value = (storage).getItem(key);
            if (typeof value == 'string') {
                return JSON.parse(value) || {};
            } else {
                return (value || {});
            }
        });
        this.saveState = options.saveState != null ? options.saveState : ((key, state, storage) => {
            (storage).setItem(key, JSON.stringify(state));
        });
        this.plugin = (store) => {
            const savedState = this.restoreState(this.key, this.storage);

            let newState = merge(store.state, savedState || {});
            try {
                store.commit('setToken', newState.User.token);
            } catch (e) {
            }
            store.replaceState(newState);
            store.subscribe(() => {
                this.saveState(this.key, store.state, this.storage);
            });
        };
    }
}
