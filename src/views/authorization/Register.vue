<template>
    <div class="v-register">
        <v-header-layout/>
        <a-row>
            <a-col :span="12" :style="{backgroundImage: 'url('+ background +')'}" class="background" :xs="0" :sm="0"
                   :md="12"/>
            <a-col :span="12" :xs="24" :md="12">
                <a-spin :spinning="spinning">
                    <a-row>
                        <a-col :xs="0" :lg="2"/>
                        <a-col :xs="24" :lg="20" :xl="16" :xxl="14" class="md-login-col">
                            <h2 class="text-center">创建账户</h2>
                            <h4 class="text-center">通过账户来管理你的账户数据</h4>
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
                            <user-register-form v-model="form" @submit="onRegister"/>
                            <br/>
                            <p class="text-center md-t">
                                已经注册了账户？
                                <a @click="$router.push({name: 'Login'})">去登陆吧</a>
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
