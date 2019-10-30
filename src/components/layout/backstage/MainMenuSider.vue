<template>
    <a-layout-sider class="md-main-menu-sider" :width="menuWidth" :collapsible="collapsible" :trigger="null"
                    v-model="show" :theme="_theme" breakpoint="xl" v-if="width > 576">
        <main-menu-sider-content/>
    </a-layout-sider>
    <a-drawer class="md-main-menu-sider" v-else :mask="true" :closable="false" :visible.sync="show" :theme="_theme"
              placement="left" @close="onClose" :width="menuWidth" :wrap-class-name="'v-theme-' + _theme">
        <main-menu-sider-content/>
    </a-drawer>
</template>

<script>
    import MdActive from '@/components/mixins/MdActive';
    import MainMenuSiderContent from '@/components/layout/backstage/MainMenuSiderContent';

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
                menuWidth: 256
            };
        },
        created() {
            this.width = window.innerWidth;
            window.addEventListener('resize', this.resize);
        },
        methods: {
            resize() {
                this.width = window.innerWidth;
            },
            onClose() {
                this.show = false;
            }
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.resize);
        }
    };
</script>

<style scoped lang="scss">
    .md-main-menu-sider {
       &.ant-layout-sider {
            border-right: 1px solid #e3e3e3;
       }
    }
</style>
