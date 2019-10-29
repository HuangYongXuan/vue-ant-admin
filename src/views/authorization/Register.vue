<template>
    <div class="v-register">
        <v-header-layout/>
        <a-row>
            <a-col :xxl="9" :xs="0" :sm="4" :xl="8" :lg="8"/>
            <a-col :xxl="6" :xs="24" :sm="16" :xl="8" :lg="8">
                <user-register-form v-model="form"></user-register-form>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import VHeaderLayout from '@/components/layout/base/VHeaderLayout';
    import UserRegisterForm from '@/components/form/UserRegisterForm';
    export default {
        name: 'Register',
        components: {UserRegisterForm, VHeaderLayout},
        data () {
            return {
                form: {
                    email: undefined,
                    username: undefined,
                    password: undefined,
                    passwordConfirm: undefined,
                    avatar: undefined
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .v-register {

    }
</style>