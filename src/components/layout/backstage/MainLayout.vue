<template>
    <a-layout class="md-layout">
        <main-menu-sider :md-active.sync="collapsed"/>
        <a-layout>
            <main-header :md-active.sync="collapsed"/>
            <a-layout-content>
                <main-layout-breadcrumb/>
                <div class="md-content">
                    <base-router-view/>
                </div>
            </a-layout-content>
            <a-layout-footer>Footer</a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
    import MainHeader from '@/components/layout/backstage/MainHeader';
    import MainMenuSider from '@/components/layout/backstage/MainMenuSider';
    import MainLayoutBreadcrumb from '@/components/layout/backstage/MainLayoutBreadcrumb';
    import BaseRouterView from '@/components/widget/BaseRouterView';
    export default {
        name: 'MainLayout',
        components: {BaseRouterView, MainLayoutBreadcrumb, MainMenuSider, MainHeader},
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

        .md-content {
            background-color: #eeeeee;
            min-height: 100%;
        }
    }
</style>
