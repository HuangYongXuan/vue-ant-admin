<template>
    <a-layout class="v-index">
        <v-header-layout/>
        <a-row>
            <a-col :span="18" class="a" :xs="0" :xxl="18" :xl="16" :lg="14" :md="12"></a-col>
            <a-col :span="6" class="b" :xs="24" :xxl="6" :xl="8" :lg="10" :md="12"></a-col>
        </a-row>
    </a-layout>
</template>

<script>
    import VHeaderLayout from '@/components/layout/base/VHeaderLayout';
    export default {
        components: {VHeaderLayout}
    };
</script>

<style scoped lang="scss">
    .v-index {
        height: 100%;
        .ant-row {
            height: 100%;
            div {
                height: 100%;
            }
        }
        .a {
            background-color: aqua;
        }
        .b {
            background-color: bisque;
        }
    }
</style>