<template>
    <a-layout class="md-layout">
        <main-menu-sider :collapsed="collapsed"/>
        <a-layout>
            <main-header :md-active.sync="collapsed"/>
            <a-layout-content>
                <router-view/>
            </a-layout-content>
            <a-layout-footer>Footer</a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
    import MainHeader from '@/components/layout/backstage/MainHeader';
    import MainMenuSider from '@/components/layout/backstage/MainMenuSider';
    export default {
        name: 'MainLayout',
        components: {MainMenuSider, MainHeader},
        data () {
            return {
                collapsed: false
            }
        }
    };
</script>

<style scoped lang="scss">
    .md-layout {
        min-height: 100%;
    }
</style>
