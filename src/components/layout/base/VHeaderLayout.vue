<template>
    <a-layout-header class="v-header">
        <div class="v-logo" @click="goIndex">
            <img src="@/assets/logo.png" alt="">
        </div>
        <div class="v-menu">
            <a-menu @click="onMenuClick"
                    theme="dark"
                    mode="horizontal"
                    :defaultSelectedKeys="defaultSelectedKeys"
                    :style="{ lineHeight: '64px' }">
                <a-menu-item key="Register">
                    <a-icon type="plus"/>
                    注册
                </a-menu-item>
                <a-menu-item key="Login">
                    <a-icon type="login"></a-icon>
                    登陆
                </a-menu-item>
            </a-menu>
        </div>
    </a-layout-header>
</template>

<script>
    export default {
        name: 'VHeaderLayout',
        data() {
            return {
                defaultSelectedKeys: []
            };
        },
        created() {
            this.defaultSelectedKeys = [this.$route.name];
        },
        methods: {
            goIndex() {
                this.$router.replace({name: 'Index'});
            },
            onMenuClick({key}) {
                this.$router.push({name: key});
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
                width: 60px;
            }
        }

        .v-menu {
            text-align: right;
            flex: 1;
            background-color: #fd2fff;
        }
    }
</style>