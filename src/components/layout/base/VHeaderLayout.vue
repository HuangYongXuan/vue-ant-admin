<template>
    <a-layout-header class="v-header" v-theme="_theme">
        <user-header-menu class="v-menu">
            <a-menu-item class="v-logo">
                <div  @click="goIndex">
                    <img src="@/assets/logo.png" alt="">
                </div>
            </a-menu-item>
            <a-menu-item key="Register" @click="$router.push({name: 'Register'})" v-if="!loginStatus">
                <a-icon type="plus"/>
                注册
            </a-menu-item>
            <a-menu-item key="Login" @click="$router.push({name: 'Login'})" v-if="!loginStatus">
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
            ...mapGetters({loginStatus: 'loginStatus'})
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
        padding: 0;
        position: relative;

        .v-logo {
            position: absolute;
            left: 0;
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
