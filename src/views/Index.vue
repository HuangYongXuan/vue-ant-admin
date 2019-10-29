<template>
    <a-layout class="v-index">
        <v-header-layout/>
        <a-row>
            <a-col :span="24">
                <index-particle/>
                <a-button class="v-btn" type="primary" shape="round" icon="plus" size="large"
                          @click="$router.push({name: 'Register'})">Join
                </a-button>
            </a-col>
        </a-row>
    </a-layout>
</template>

<script>
    import VHeaderLayout from '@/components/layout/base/VHeaderLayout';
    import IndexParticle from '@/components/widget/IndexParticle';

    export default {
        components: {IndexParticle, VHeaderLayout}
    };
</script>

<style scoped lang="scss">
    .v-index {
        height: 100%;
        position: absolute;

        .ant-row {
            height: 100%;

            div {
                height: 100%;
            }
        }

        .v-btn {
            position: absolute;
            left: calc(50% - 50px);
            bottom: 20%;
            z-index: 20;
        }
    }
</style>