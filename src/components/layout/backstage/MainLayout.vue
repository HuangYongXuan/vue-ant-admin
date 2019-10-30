<template>
    <a-layout class="md-layout">
        <v-menu-sider collapsed/>
        <a-layout>
            <v-header-layout model="sider" theme="light"/>
            <a-layout-content>
                <router-view/>
            </a-layout-content>
            <a-layout-footer>Footer</a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
    import VHeaderLayout from '@/components/layout/base/VHeaderLayout';
    import VMenuSider from '@/components/layout/base/VMenuSider';

    export default {
        name: 'MainLayout',
        components: {VMenuSider, VHeaderLayout}
    };
</script>

<style scoped lang="scss">
    .md-layout {
        min-height: 100%;
    }
</style>
