<template>
    <div class="v-register">
        <v-header-layout/>
        <a-row>
            <a-col :span="12" :style="{backgroundImage: 'url('+ background +')'}" class="background" :xs="0" :sm="0"
                   :md="12"></a-col>
            <a-col :span="12" :xs="24" :md="12">
                <a-row>
                    <a-col :xs="0" :lg="2"></a-col>
                    <a-col :xs="24" :lg="20" :xl="16" :xxl="14" class="md-login-col">
                        <a-spin :spinning="spinning">
                            <h2 class="text-center">Forgot Password?</h2>
                            <h4 class="text-center tx-s">DEnter the email address you used when you joined and we’ll
                                send you instructions to reset your password.</h4>
                            <user-forgot-password-form v-model="form" @submit="sendEmail"/>
                        </a-spin>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import VHeaderLayout from '@/components/layout/base/VHeaderLayout';
    import UserForgotPasswordForm from '@/components/form/UserForgotPasswordForm';
    import user from '@/common/apis/user';

    export default {
        components: {UserForgotPasswordForm, VHeaderLayout},
        data() {
            return {
                background: require('@/assets/images/background/login.jpg'),
                spinning: false,
                form: {
                    email: undefined
                }
            };
        },
        methods: {
            sendEmail() {
                this.spinning = true;
                user.forgotPassword(this.form.email).then(res => {
                    this.$utils.responseHandler(res, true, true, '邮件已发送，请登陆邮箱查看！').then(() => {
                        this.$router.replace({name: 'Index'});
                    });
                }).finally(() => this.spinning = false);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "index.scss";

    .v-register {

        .tx-s {
            font-size: .75rem;
            margin-bottom: 1rem;
            line-height: 1.5rem;
        }
    }
</style>
