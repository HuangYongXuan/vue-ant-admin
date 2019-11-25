<template>
    <div class="v-register">
        <v-header-layout/>

        <a-row>
            <a-col :span="12" :style="{backgroundImage: 'url('+ background +')'}" class="background" :xs="0" :sm="0"
                   :md="12"></a-col>
            <a-col :span="12" :xs="24" :md="12">
                <a-spin :spinning="spinning">
                    <a-row>
                        <a-col :xs="0" :lg="2"></a-col>
                        <a-col :xs="24" :lg="20" :xl="16" :xxl="14" class="md-login-col">
                            <h2 class="text-center">Create an Account</h2>
                            <h4 class="text-center">Discovering and connecting with creative talent around the globe.</h4>
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
                            <user-register-form v-model="form" @submit="onRegister"/>
                            <br/>
                            <p class="text-center md-t">
                                Don't have an account yet?
                                <a @click="$router.push({name: 'Login'})">Login</a>
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
    import UserRegisterForm from '@/components/form/UserRegisterForm';
    import user from '@/common/apis/user';
    export default {
        name: 'Register',
        components: {UserRegisterForm, VHeaderLayout},
        data () {
            return {
                spinning: false,
                background: require('@/assets/images/background/register.jpg'),
                form: {
                    email: undefined,
                    username: undefined,
                    password: undefined,
                    password_confirmation: undefined,
                    avatar: undefined
                }
            }
        },
        methods: {
            onRegister () {
                let params = Object.assign({}, this.form);
                delete params.password_confirmation;
                user.create(params).then(res => {
                    this.$utils.responseHandler(res, true).then(({data}) => {
                        this.$router.push({name: 'Index'})
                    })
                }).finally(() => {

                })
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "index";
</style>
