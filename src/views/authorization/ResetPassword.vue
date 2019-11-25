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
                            <h2 class="text-center">Reset Password</h2>
                            <h4 class="text-center tx-s">请在下面设置{{user.email || '你'}}的新密码</h4>
                            <user-reset-password-form v-model="form" @submit="reset"/>
                        </a-spin>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import VHeaderLayout from '@/components/layout/base/VHeaderLayout';
    import user from '@/common/apis/user';
    import {Utils} from '@/common/Utils';
    import UserResetPasswordForm from '@/components/form/UserResetPasswordForm';

    export default {
        components: {UserResetPasswordForm, VHeaderLayout},
        data() {
            return {
                background: require('@/assets/images/background/login.jpg'),
                spinning: false,
                form: {
                    token: undefined,
                    password: undefined,
                    password_confirmation: undefined
                },
                user: {}
            };
        },
        created() {
            this.form.token = this.$route.query.token;
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                this.spinning = true;
                user.forgotPasswordInfo(this.form.token).then(res => {
                    Utils.responseHandler(res, false, true).then(({data}) => {
                        this.user = data;
                        console.info(data);
                    }).catch(() => {
                        this.spinning = true;
                    });
                }).finally(() => this.spinning = false);
            },
            reset() {
                this.spinning = true;
                user.resetPassword(this.form).then(res => {
                    this.$utils.responseHandler(res, true, true, '密码修改成功').then(() => {
                        this.$router.replace({name: 'Login'});
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
