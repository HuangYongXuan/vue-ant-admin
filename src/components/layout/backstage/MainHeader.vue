<template>
    <a-layout-header :theme="_theme" :style="{backgroundColor: _theme === 'dark' ? '#001529': '#ffffff'}">
        <a class="v-trigger" @click="()=> show = !show" :style="{color: _theme === 'dark' ? 'white': 'black'}">
            <a-icon
                    class="trigger"
                    :type="show ? 'menu-unfold' : 'menu-fold'"/>
        </a>
        <div class="v-user-wrapper">
            <a-menu :theme="_theme" mode="horizontal" :selectable="false">
                <a-menu-item>
                    <a-badge :count="19">
                        <a-icon type="bell"/>
                    </a-badge>
                </a-menu-item>
                <a-sub-menu>
                    <span slot="title">
                        <a-icon type="bg-colors"/> {{_theme}}
                    </span>
                    <a-menu-item-group>
                        <a-menu-item key="dark" @click.native="changeTheme('dark')">
                            <a-icon type="layout"/>
                            黑色主题
                        </a-menu-item>
                        <a-menu-item key="light" @click.native="changeTheme('light')">
                            <a-icon type="layout"/>
                            白色主题
                        </a-menu-item>
                    </a-menu-item-group>
                </a-sub-menu>
                <a-sub-menu>
                    <span slot="title" class="submenu-title-wrapper">
                        <a-spin :spinning="spinning">
                            <a-avatar :size="32" :src="userInfo.avatar"/> {{userInfo.username}}
                        </a-spin>
                    </span>
                    <a-menu-item-group title="SYSTEM">
                        <a-menu-item key="Welcome">
                            <a-icon type="gateway"/>
                            管理后台
                        </a-menu-item>
                        <a-menu-item key="profile">
                            <a-icon type="profile"/>
                            个人资料
                        </a-menu-item>
                    </a-menu-item-group>
                    <a-menu-item-group title="OPTION">
                        <a-menu-item key="notification">
                            <a-icon type="notification"/>
                            通知
                        </a-menu-item>
                        <a-menu-item key="logout">
                            <a-icon type="logout"/>
                            登出
                        </a-menu-item>
                    </a-menu-item-group>
                </a-sub-menu>
            </a-menu>
        </div>
    </a-layout-header>
</template>

<script>
    import MdActive from '@/components/mixins/MdActive';
    import {mapGetters} from 'vuex';

    export default {
        name: 'MainHeader',
        mixins: [MdActive],
        data() {
            return {
                spinning: false
            };
        },
        computed: {
            ...mapGetters({loginStatus: 'loginStatus', userInfo: 'userInfo'})
        },
        methods: {
            changeTheme(theme) {
                this.$store.dispatch('setTheme', theme);
            }
        }
    };
</script>

<style scoped lang="scss">
    .ant-layout-header {
        padding: 0;
        display: flex;

        .v-trigger {
            font-size: 20px;
            line-height: 64px;
            padding: 0 24px;
            cursor: pointer;
            -webkit-transition: color .3s;
            transition: color .3s;

            &:hover {
                background: rgba(0, 0, 0, .025);
            }
        }

        .ant-menu {
            flex: 1;
            text-align: right;
        }
    }

    .v-user-wrapper {
        flex: 1;
        text-align: right;
        padding-right: 10px;

        .ant-menu {
            height: 64px;
            line-height: 64px;
            border-bottom: none;

            .anticon {
                font-size: 20px;
            }
        }
    }
</style>
