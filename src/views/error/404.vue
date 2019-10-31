<template>
    <div class="md-404">
        <v-header-layout class="md-f"/>
        <div class="md-content">
            <a-empty description="你访问的地址不存在" :image="image">
                <a-button @click="$router.replace({name: 'Base'})" type="primary" shape="round" ghost>返回首页</a-button>
            </a-empty>
        </div>
    </div>
</template>

<script>
    import VHeaderLayout from '@/components/layout/base/VHeaderLayout';

    export default {
        components: {VHeaderLayout},
        data () {
            return {
                image: require('@/assets/icon/404.png')
            }
        }
    };
</script>

<style scoped lang="scss">
    .md-404 {
        display: flex;
        flex-direction: column;
        min-height: 100%;

        .v-header {
            flex: 0 0 64px;
        }

        .md-content {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
