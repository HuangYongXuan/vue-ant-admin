<template>
    <a-menu :theme="_theme" class="md-user-header-menu" mode="horizontal" :default-selected-keys="defaultSelectedKeys">
        <slot name="first"/>
        <a-sub-menu v-if="loginStatus">
            <span slot="title" class="submenu-title-wrapper">
                <a-avatar :size="32" :src="userInfo.avatar"/> {{userInfo.username}}
            </span>
            <a-menu-item-group title="SYSTEM">
                <slot name="system"/>
                <a-menu-item key="Welcome" @click="$router.push({name: 'Welcome'})">
                    <a-icon type="gateway"/>
                    管理后台
                </a-menu-item>
                <a-menu-item key="Profile" @click="$router.push({name: 'Profile'})">
                    <a-icon type="profile"/>
                    个人资料
                </a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group title="OPTION">
                <slot name="option"/>
                <a-menu-item key="Setting" @click="$router.push({name: 'Setting'})">
                    <a-icon type="setting"/>
                    设置
                </a-menu-item>
                <a-menu-item key="logout" @click="logout">
                    <a-icon type="logout"/>
                    登出
                </a-menu-item>
            </a-menu-item-group>
        </a-sub-menu>
        <slot name="end"/>
    </a-menu>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'UserHeaderMenu',
        data() {
            return {
                defaultSelectedKeys: []
            };
        },
        created() {
            this.defaultSelectedKeys = [this.$route.name];
        },
        computed: {
            ...mapGetters({loginStatus: 'loginStatus', userInfo: 'userInfo'})
        },
        watch: {
            $route() {
                this.$nextTick(() => {
                    this.defaultSelectedKeys = [this.$route.name];
                });
            }
        },
        methods: {
            logout() {
                this.$store.dispatch('logout').then().finally(() => {
                    this.$router.replace({name: 'Base'});
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    .md-user-header-menu {
        flex: 0;
        display: inline-block;
        line-height: 64px;
    }
</style>
