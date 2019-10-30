<template>
    <a-layout-header class="v-header" v-theme="_theme">
        <div class="v-logo" @click="goIndex">
            <img src="@/assets/logo.png" alt="">
        </div>
        <user-header-menu class="v-menu">
            <a-menu-item key="Register" @click="$router.push({name: 'Register'})">
                <a-icon type="plus"/>
                注册
            </a-menu-item>
            <a-menu-item key="Login" @click="$router.push({name: 'Login'})">
                <a-icon type="login"></a-icon>
                登陆
            </a-menu-item>
        </user-header-menu>
    </a-layout-header>
</template>

<script>
    import {mapGetters} from 'vuex';
    import UserHeaderMenu from '@/components/user/UserHeaderMenu';

    export default {
        name: 'VHeaderLayout',
        components: {UserHeaderMenu},
        data() {
            return {
                defaultSelectedKeys: []
            };
        },
        created() {
            this.defaultSelectedKeys = [this.$route.name];
        },
        computed: {
            ...mapGetters(['loginStatus'])
        },
        methods: {
            goIndex() {
                this.$router.replace({name: 'Index'});
            }
        }
    };
</script>

<style scoped lang="scss">
    .v-header {
        display: flex;
        padding: 0 10px;

        .v-logo {
            flex: 0 0 40px;
            margin-right: 10px;
            text-align: left;
            cursor: pointer;

            img {
                width: 40px;
            }
        }

        .v-menu {
            text-align: right;
            flex: 1;
        }
    }
</style>
