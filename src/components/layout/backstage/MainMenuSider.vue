<template>
    <a-layout-sider class="md-main-menu-sider md-scroll-bar" :width="menuWidth" :collapsible="collapsible" :trigger="null"
                    v-model="show" :theme="_theme" breakpoint="xl" v-if="width > 576">
        <main-menu-sider-content :collapsed="show"/>
    </a-layout-sider>
    <a-drawer class="md-main-menu-sider md-scroll-bar" v-else :mask="true" :closable="false" :visible.sync="show" :theme="_theme"
              placement="left" @close="onClose" :width="menuWidth" :wrap-class-name="'v-theme-' + _theme">
        <main-menu-sider-content @change="show = false"/>
    </a-drawer>
</template>

<script>
    import MdActive from '@/components/mixins/MdActive';
    import MainMenuSiderContent from '@/components/layout/backstage/MainMenuSiderContent';
    import Debounce from '@/common/class/Debounce';

    export default {
        name: 'MainMenuSider',
        components: {MainMenuSiderContent},
        mixins: [MdActive],
        props: {
            collapsible: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {
                width: undefined,
                menuWidth: 256,
                debounce: new Debounce()
            };
        },
        created() {
            this.width = window.innerWidth;
            window.addEventListener('resize', this.resize);
        },
        methods: {
            resize() {
                this.debounce.do(() => {
                    this.width = window.innerWidth;
                }, 300);
            },
            onClose() {
                this.show = false;
            },
            showWatch() {
                this.$bus.emit('side-on-collapse', this.show);
            }
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.resize);
        }
    };
</script>

<style scoped lang="scss">
    .md-main-menu-sider {
        overflow-x: hidden;
        overflow-y: auto;
        height: 100vh;
        left: 0;

        &.ant-layout-sider {
            border-right: 1px solid #e3e3e3;
        }
    }
</style>
