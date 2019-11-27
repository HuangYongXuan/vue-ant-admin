<template>
    <div class="md-login">
        <v-header-layout/>
        <a-row>
            <a-col :span="12" :style="{backgroundImage: 'url('+ background +')'}" class="background" :xs="0" :sm="0"
                   :md="12"/>
            <a-col :span="12" :xs="24" :md="12">
                <a-spin :spinning="spinning">
                    <a-row>
                        <a-col :xs="0" :lg="2"/>
                        <a-col :xs="24" :lg="20" :xl="16" :xxl="14" class="md-login-col">
                            <h2 class="text-center">用户登陆</h2>
                            <h4 class="text-center">欢迎回来，使用您的帐户进行登录</h4>
                            <a-button size="large" block class="md-login-wechat">
                                <a-icon type="wechat"/>
                                通过微信登陆
                            </a-button>
                            <p/>
                            <a-button size="large" block class="md-login-weibo">
                                <a-icon type="weibo-square"/>
                                通过微博登陆
                            </a-button>
                            <p class="md-or">OR</p>
                            <user-login-form v-model="form" @submit="onLogin"/>
                            <br/>
                            <p class="text-center md-t">
                                你还没有账号吗?
                                <a @click="$router.push({name: 'Register'})">来注册吧</a>
                            </p>
                            <p class="text-center">
                                有账号但是忘记密码了?试试
                                <a @click="$router.push({name: 'ForgotPassword'})">重置密码</a>
                            </p>
                        </a-col>
                    </a-row>
                </a-spin>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import VHeaderLayout from '@/components/layout/base/VHeaderLayout';
    import UserLoginForm from '@/components/form/UserLoginForm';

    export default {
        components: {UserLoginForm, VHeaderLayout},
        data() {
            return {
                spinning: false,
                form: {
                    email: process.env.VUE_APP_DEV_LOGIN_USER,
                    password: process.env.VUE_APP_DEV_LOGIN_USER_PASSWORD
                },
                background: require('@/assets/images/background/login.jpg')
            };
        },
        methods: {
            onLogin() {
                this.spinning = true;
                this.$store.dispatch('login', this.form).then(res => {
                    this.getProfile();
                }).finally(() => this.spinning = false);
            },
            getProfile() {
                this.spinning = true;
                this.$store.dispatch('getUserInfo').then(() => {
                    this.$router.replace({name: 'Base'});
                }).finally(() => this.spinning = false);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "index";
</style>
