<template>
    <div class="md-main-layout-breadcrumb" v-theme="_theme">
        <a-breadcrumb>
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>Home</a-breadcrumb-item>
        </a-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: 'MainLayoutBreadcrumb'
    };
</script>

<style scoped lang="scss">
    .md-main-layout-breadcrumb {
        padding: 16px 32px;
        border-bottom: 1px solid #e8e8e8;
        border-top: 1px solid #e3e3e3;
    }
</style>
