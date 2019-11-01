<template>
    <div>
        <v-header-layout/>
        <a-row>
            <a-col :xxl="9" :xs="0" :sm="4" :xl="8" :lg="8"/>
            <a-col :xxl="6" :xs="24" :sm="16" :xl="8" :lg="8">
                <a-spin :spinning="spinning">
                    <user-login-form v-model="form" @submit="onLogin" class="v-form"/>
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
                }
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
                    this.$router.replace({name: 'Base'})
                }).finally(() => this.spinning = false);
            }
        }
    };
</script>

<style scoped>

</style>
