<template>
    <a-layout-header class="v-header" :theme="theme">
        <div class="v-logo" @click="goIndex">
            <img src="@/assets/logo.png" alt="">
        </div>
        <a-menu @click="onMenuClick" class="v-menu"
                :theme="theme"
                mode="horizontal"
                :defaultSelectedKeys="defaultSelectedKeys"
                :style="{ lineHeight: '64px' }">
            <a-menu-item key="Register" v-if="!loginStatus">
                <a-icon type="plus"/>
                注册
            </a-menu-item>
            <a-menu-item key="Login" v-if="!loginStatus">
                <a-icon type="login"></a-icon>
                登陆
            </a-menu-item>
            <a-sub-menu v-if="loginStatus">
                    <span slot="title" class="submenu-title-wrapper">
                        <a-spin :spinning="spinning">
                            <a-avatar :size="32" :src="userInfo.avatar"/> {{userInfo.username}}
                        </a-spin>
                    </span>
                <a-menu-item-group title="SYSTEM">
                    <a-menu-item key="Welcome"><a-icon type="gateway" /> 管理后台</a-menu-item>
                    <a-menu-item key="profile"><a-icon type="profile" /> 个人资料</a-menu-item>
                </a-menu-item-group>
                <a-menu-item-group title="OPTION">
                    <a-menu-item key="notification"><a-icon type="notification" /> 通知</a-menu-item>
                    <a-menu-item key="logout"><a-icon type="logout"/> 登出</a-menu-item>
                </a-menu-item-group>
            </a-sub-menu>
        </a-menu>
    </a-layout-header>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'VHeaderLayout',
        props: {
            theme: {
                type: String,
                default: 'dark'
            }
        },
        data() {
            return {
                spinning: false,
                defaultSelectedKeys: []
            };
        },
        created() {
            this.defaultSelectedKeys = [this.$route.name];
        },
        computed: {
            ...mapGetters(['loginStatus', 'userInfo'])
        },
        methods: {
            goIndex() {
                this.$router.replace({name: 'Index'});
            },
            onMenuClick({key}) {
                switch (key) {
                    case 'profile': break;
                    case 'notification': break;
                    case 'logout': this.logout(); break;
                    default: this.$router.push({name: key});
                }
            },
            logout () {
                this.spinning = true;
                this.$store.dispatch('logout').then(() => {
                    this.$router.replace({name: 'Base'});
                })
            }
        }
    };
</script>

<style scoped lang="scss">
    .v-header {
        display: flex;

        .v-logo {
            flex: 0 0 100px;
            margin-right: 10px;
            text-align: center;
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
