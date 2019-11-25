<template>
    <div class="md-login">
        <v-header-layout/>
        <a-row>
            <a-col :span="12" :style="{backgroundImage: 'url('+ background +')'}" class="background" :xs="0" :sm="0"
                   :md="12"></a-col>
            <a-col :span="12" :xs="24" :md="12">
                <a-spin :spinning="spinning">
                    <a-row>
                        <a-col :xs="0" :lg="2"></a-col>
                        <a-col :xs="24" :lg="20" :xl="16" :xxl="14" class="md-login-col">
                            <h2 class="text-center">Login to Continue</h2>
                            <h4 class="text-center">Welcome back, sign in with your Material account</h4>
                            <a-button size="large" block class="md-login-wechat">
                                <a-icon type="wechat"/>
                                LOGIN WITH WECHAT
                            </a-button>
                            <p></p>
                            <a-button size="large" block class="md-login-weibo">
                                <a-icon type="weibo-square"/>
                                LOGIN WITH WEIBO
                            </a-button>
                            <p class="md-or">OR</p>
                            <user-login-form v-model="form" @submit="onLogin"/>
                            <br/>
                            <p class="text-center md-t">
                                Don't have an account yet?
                                <a @click="$router.push({name: 'Register'})">Sign up</a>
                            </p>
                            <p class="text-center">Forgot your username or password? <a>Reset password</a> </p>
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
    .md-login {
        height: 100%;

        .ant-row {
            height: calc(100% - 64px);

            .background {
                height: 100%;
                background-position: center;
            }
        }
    }

    .md-login-col {
        padding-top: 50px;
        padding-left: 10px;
        padding-right: 10px;

        h2 {
            font-size: 2.125rem;
            margin-bottom: 1.5rem;
        }

        h4 {
            font-size: 1.25rem;
            font-weight: 300;
            margin-bottom: 1.5rem;
        }
    }

    .md-login-wechat {
        background-color: #335397;
        color: white;
    }

    .md-login-weibo {
        background-color: #00c7f7;
        color: white;
    }

    .md-or {
        margin: 20px 0;
        position: relative;
        text-align: center;

        &:before,
        &:after {
            content: ' ';
            position: absolute;
            height: 1px;
            top: 10px;
            width: calc(50% - 20px);
            background-color: #dcdcdc;
        }

        &:after {
            left: 0;
        }

        &:before {
            right: 0;
        }
    }
    .md-t {
        margin: 0;
        padding-bottom: 5px;
    }
</style>
