<template>
    <md-form :model="data" :rules="rules" @submit="onSubmit">
        <md-form-item label="密码" prop="password_confirmation">
            <a-input v-model="data.password_confirmation" type="password" autocomplete="new-password" placeholder="请输入密码" size="large"/>
        </md-form-item>
        <md-form-item label="确认密码" prop="password">
            <a-input v-model="data.password" type="password" autocomplete="new-password"  placeholder="请确认密码" size="large"/>
        </md-form-item>
        <a-button type="primary" html-type="submit" size="large" block>重置密码</a-button>
    </md-form>
</template>

<script>
    import MdMVVMObject from '@/components/mixins/MdMVVMObject';
    import MdForm from '@/components/widget/form/MdForm';
    import MdFormItem from '@/components/widget/form/MdFormItem';

    export default {
        name: 'UserResetPasswordForm',
        components: {MdFormItem, MdForm},
        mixins: [MdMVVMObject],
        data() {
            return {
                rules: {
                    password: ['required', 'string', 'max:32', 'min:6', 'confirmed'],
                    password_confirmation: ['required']
                }
            };
        }
    };
</script>

<style scoped lang="scss">
    .md-form-item {
        width: 100%;
    }
</style>
