<template>
    <a-layout class="v-index">
        <v-header-layout class="md-header"/>
        <index-particle :particles-num="150"/>
        <a-button class="v-btn" type="primary" shape="round" icon="plus" size="large" v-if="!loginStatus"
                  @click="$router.push({name: 'Register'})">Join
        </a-button>
    </a-layout>
</template>

<script>
    import VHeaderLayout from '@/components/layout/base/VHeaderLayout';
    import IndexParticle from '@/components/widget/IndexParticle';
    import {mapGetters} from 'vuex';

    export default {
        components: {IndexParticle, VHeaderLayout},
        computed: {
            ...mapGetters({loginStatus: 'loginStatus'})
        },
    };
</script>

<style scoped lang="scss">
    .v-index {
        height: 100%;
        position: relative;

        .md-header {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            z-index: 20;
        }

        .ant-row {
        }

        .v-btn {
            position: absolute;
            left: calc(50% - 50px);
            bottom: 20%;
            z-index: 20;
        }
    }
</style>
