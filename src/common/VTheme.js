import Vue from 'vue';

Vue.directive('theme', {
    inserted(el, {value}) {
        el.className += ' ' + 'v-theme-' + value;
    },
    update(el, {value}) {
        el.className = el.className.replace('v-theme-dark', '').replace('v-theme-light', '');
        el.className += ' ' + 'v-theme-' + value;
    }
});
