<template>
    <a-menu :theme="_theme" class="md-user-header-menu" mode="horizontal" :selectable="false">
        <slot/>
        <a-dropdown :trigger="['click']" v-if="loginStatus">
            <div class="md-link">
                <div class="submenu-title-wrapper md-link">
                    <a-avatar :size="32" :src="userInfo.avatar"/>
                    {{userInfo.username}}
                </div>
            </div>
            <a-menu slot="overlay">
                <a-menu-item-group title="SYSTEM" class="md-list">
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
                <a-menu-item-group title="OPTION" class="md-list">
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
            </a-menu>
        </a-dropdown>
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

<style lang="scss">
    .md-list {
        min-width: 150px;
        .ant-dropdown-menu-item-group-list {
            list-style: none;
            padding: 0;

            .anticon {
                margin-right: 8px;
            }
            > .ant-dropdown-menu-submenu-vertical {
                padding: 0;
            }

            > li {
                padding: 10px;
            }
        }
    }
</style>
